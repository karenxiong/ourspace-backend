const knex = require("knex")(require("../knexfile"));
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const { body, validationResult } = require("express-validator");
const { auth, requiredScopes } = require("express-oauth2-jwt-bearer");

exports.getAllPosts = (req, res) => {
  knex("posts")
    .select(
      "posts.id",
      "posts.title",
      "posts.image",
      "posts.user_id",
      "posts.timestamp",
      "posts.description",
      "posts.likes"
    )
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res
        .status(400)
        .json({ message: `There was an error getting posts`, error: err })
    );
};

exports.updatePost = [
  body("title").notEmpty(),
  body("image").notEmpty(),
  body("description").notEmpty(),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { id } = req.params;
    knex("posts")
      .update(req.body)
      .where({ id })
      .then(() => {
        res.status(200).send(`Post with id: ${id} has been updated`);
      })
      .catch((err) => {
        res.status(400).send(`Error updating post ${id}: ${err}`);
      });
  },
];

exports.getPostId = (req, res) => {
  knex
    .select(
      "posts.id",
      "posts.title",
      "posts.image",
      "posts.user_id",
      "posts.timestamp",
      "posts.description",
      "posts.likes"
    )
    .from("posts")
    .where("posts.id", req.params.id)
    .then((data) => {
      if (data.length === 0) {
        res.status(404).send("Post not found");
      } else {
        res.status(200).json(data[0]);
      }
    })
    .catch((err) => {
      res.status(500).send("Error getting post information: " + err);
    });
};

exports.deletePost = (req, res) => {
  const { id } = req.params;
  knex("posts")
    .where({ id })
    .del()
    .then((rowsAffected) => {
      if (rowsAffected === 0) {
        res.status(404).send("Post not found");
      } else {
        res.status(204).send();
      }
    })
    .catch((err) => {
      res.status(500).send(`Error deleting post ${id}: ${err}`);
    });
};

const UPLOAD_PATH = "public/data/uploads/";
exports.UPLOAD_PATH = UPLOAD_PATH;

// POST/CREATE new post
exports.newPost = async (req, res) => {
  console.log("req.body:", req.body);
  console.log("req.file:", req.file);
  const uuid = crypto.randomUUID();
  const newID = uuid;
  const { title, user_id, description } = req.body;

  if (!title) {
    return res
      .status(400)
      .send({ message: "Please make sure to provide a title" });
  }

  if (!req.file) {
    return res
      .status(400)
      .send({ message: "Please make sure to provide an image" });
  }

  if (!user_id) {
    return res.status(400).send({ message: "Please make sure to login" });
  }
  const filePath = `${UPLOAD_PATH}/${req.file.filename}`;
  // const filePath = req.file
  //   ? path.join(
  //       __dirname,
  //       "..",
  //       "resources",
  //       "static",
  //       "assets",
  //       "uploads",
  //       req.file.filename
  //     )
  //   : null;

  // Save the post details to the database
  try {
    await knex("posts").insert({
      id: newID,
      title,
      image: filePath,
      user_id,
      description,
    });
    const newPost = await knex("posts").where({ id: newID }).first();
    const newPostURL = `/posts/${newID}`;
    res.status(201).location(newPostURL).json({ post: newPost });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal server error." });
  }
};

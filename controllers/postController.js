const knex = require("knex")(require("../knexfile"));
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const { body, validationResult } = require("express-validator");
const { auth, requiredScopes } = require("express-oauth2-jwt-bearer");

exports.getAllPosts = (req, res) => {
  const currentUserId = req.params.id;

  knex("posts")
    .leftJoin("likes", "posts.id", "=", "likes.post_id")
    .select({
      id: "posts.id",
      title: "posts.title",
      image: "posts.image",
      user_id: "posts.user_id",
      user_nickname: "posts.user_nickname",
      timestamp: "posts.timestamp",
      description: "posts.description",
      current_user_liked: knex.raw("JSON_ARRAYAGG(likes.user_id)"),
    })
    .count("likes.id", { as: "like_count" })
    .groupBy("posts.id")
    .then((data) => {
      const cleanData = data.map((post) => ({
        ...post,
        current_user_liked: currentUserId
          ? JSON.parse(post.current_user_liked).includes(currentUserId)
          : false,
      }));
      res.status(200).json(cleanData);
    })
    .catch((err) =>
      res
        .status(400)
        .json({ message: `There was an error getting posts`, error: err })
    );
};

exports.getMarkers = (req, res) => {
  knex("items")
    .select({
      id: "items.id",
      title: "items.name",
      link: "items.link",
      left: "items.xaxis",
      top: "items.yaxis",
    })
    .where("items.post_id", req.params.id)
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
  knex("posts")
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
  const uuid = crypto.randomUUID();
  const newID = uuid;
  const { title, user_id, description, user_nickname } = req.body;

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

  // Save the post details to the database
  try {
    await knex("posts").insert({
      id: newID,
      title,
      image: filePath,
      user_id,
      description,
      user_nickname,
    });
    const newPost = await knex("posts").where({ id: newID }).first();
    const newPostURL = `/posts/${newID}`;
    res.status(201).location(newPostURL).json({ post: newPost });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal server error." });
  }
};

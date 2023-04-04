const knex = require("knex")(require("../knexfile"));
const crypto = require("crypto");
const { body, validationResult } = require("express-validator");
const uuid = crypto.randomUUID();

exports.getAllPosts = (req, res) => {
  knex("posts")
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
      "posts.item_id",
      "posts.likes",
      "posts.comment_id"
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

// POST/CREATE new inventory item
exports.newPost = (req, res) => {
  const newID = uuid;
  const { title, image, user_id } = req.body;

  if (!title || !image || !user_id) {
    return res
      .status(400)
      .send({ message: "Please make sure to provide a title and an image" });
  }
  knex("posts")
    .insert({
      id: newID,
      title,
      image,
      user_id,
    })
    .then((data) => {
      const newPostURL = `/posts/${data[0]}`;
      res.sendStatus(201).location(newPostURL).send(newPostURL);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ message: "Internal server error." });
    });
};

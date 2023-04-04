const knex = require("knex")(require("../knexfile"));
const crypto = require("crypto");
const { body, validationResult } = require("express-validator");
const uuid = crypto.randomUUID();

exports.getAllComments = (req, res) => {
  knex("comments")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res
        .status(400)
        .json({ message: `There was an error getting comments`, error: err })
    );
};

exports.updateComment = [
  body("comment").notEmpty(),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { id } = req.params;
    knex("comments")
      .update(req.body)
      .where({ id })
      .then(() => {
        res.status(200).send(`Comment with id: ${id} has been updated`);
      })
      .catch((err) => {
        res.status(400).send(`Error updating comment ${id}: ${err}`);
      });
  },
];

exports.getCommentId = (req, res) => {
  knex
    .select(
      "comments.id",
      "comments.user_id",
      "comments.comment",
      "comments.timestamp"
    )
    .from("comments")
    .where("comments.id", req.params.id)
    .then((data) => {
      if (data.length === 0) {
        res.status(404).send("Comment not found");
      } else {
        res.status(200).json(data[0]);
      }
    })
    .catch((err) => {
      res.status(500).send("Error getting comment: " + err);
    });
};

exports.deleteComment = (req, res) => {
  const { id } = req.params;
  knex("comments")
    .where({ id })
    .del()
    .then((rowsAffected) => {
      if (rowsAffected === 0) {
        res.status(404).send("Comment not found");
      } else {
        res.status(204).send();
      }
    })
    .catch((err) => {
      res.status(500).send(`Error deleting comment ${id}: ${err}`);
    });
};

// POST/CREATE new inventory item
exports.newComment = (req, res) => {
  const newID = uuid();
  const { user_id, comment, timestamp } = req.body;

  if (!user_id || !comment) {
    return res
      .status(400)
      .send({ message: "Please make sure to provide a comment" });
  }

  knex("comments")
    .insert({
      id: newID,
      user_id,
      comment,
      timestamp,
    })
    .then((data) => {
      const newCommentURL = `/comments/${data[0]}`;
      res.sendStatus(201).location(newCommentURL).send(newCommentURL);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ message: "Internal server error." });
    });
};

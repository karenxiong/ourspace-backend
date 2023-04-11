const knex = require("knex")(require("../knexfile"));
const crypto = require("crypto");
const { body, validationResult } = require("express-validator");

exports.getAllLikes = (req, res) => {
  knex("likes")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res
        .status(400)
        .json({ message: `There was an error getting likes`, error: err })
    );
};

exports.getLikeId = (req, res) => {
  knex("likes")
    .where("likes.id", req.params.id)
    .then((data) => {
      if (data.length === 0) {
        res.status(404).send("Like not found");
      } else {
        res.status(200).json(data[0]);
      }
    })
    .catch((err) => {
      res.status(500).send("Error getting like information: " + err);
    });
};

exports.deleteLike = (req, res) => {
  const { id } = req.params;
  knex("likes")
    .where({ id })
    .del()
    .then((rowsAffected) => {
      if (rowsAffected === 0) {
        res.status(404).send("Like not found");
      } else {
        res.status(204).send();
      }
    })
    .catch((err) => {
      res.status(500).send(`Error deleting like ${id}: ${err}`);
    });
};

// POST/CREATE new like
exports.newLike = (req, res) => {
  const uuid = crypto.randomUUID();
  const { user_id, post_id } = req.body;

  if (!user_id || !post_id) {
    return res.status(400).send({
      message: "Please make sure to provide likes' user_id, and post_id",
    });
  }
  knex("likes")
    .insert({ id: uuid, user_id, post_id })
    .then((data) => {
      const newLikeURL = `/likes/${data[0]}`;
      res.status(201).location(newLikeURL).send(newLikeURL);
    })
    .catch((err) => {
      console.error(err);
      res.status(400).send({ message: `Error creating like: ${err}` });
    });
};

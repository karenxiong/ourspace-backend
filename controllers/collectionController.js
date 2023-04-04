const knex = require("knex")(require("../knexfile"));
const crypto = require("crypto");
const { body, validationResult } = require("express-validator");
const uuid = crypto.randomUUID();

exports.getAllCollections = (req, res) => {
  knex("collections")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res
        .status(400)
        .json({ message: `There was an error getting collections`, error: err })
    );
};

exports.updateCollection = [
  body("name").notEmpty(),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { id } = req.params;
    knex("collections")
      .update(req.body)
      .where({ id })
      .then(() => {
        res.status(200).send(`Collection with id: ${id} has been updated`);
      })
      .catch((err) => {
        res.status(400).send(`Error updating collection ${id}: ${err}`);
      });
  },
];

exports.getCollectionId = (req, res) => {
  knex
    .select("collections.id", "collections.name", "collections.post_id")
    .from("collections")
    .where("collections.id", req.params.id)
    .then((data) => {
      if (data.length === 0) {
        res.status(404).send("Collection not found");
      } else {
        res.status(200).json(data[0]);
      }
    })
    .catch((err) => {
      res.status(500).send("Error getting collection: " + err);
    });
};

exports.deleteCollection = (req, res) => {
  const { id } = req.params;
  knex("collections")
    .where({ id })
    .del()
    .then((rowsAffected) => {
      if (rowsAffected === 0) {
        res.status(404).send("Collection not found");
      } else {
        res.status(204).send();
      }
    })
    .catch((err) => {
      res.status(500).send(`Error deleting collection ${id}: ${err}`);
    });
};

// POST/CREATE new inventory item
exports.newCollection = (req, res) => {
  const newID = uuid();
  const { name } = req.body;

  if (!name) {
    return res
      .status(400)
      .send({ message: "Please make sure to provide collection's name" });
  }

  knex("collections")
    .insert({
      id: newID,
      name,
    })
    .then((data) => {
      const newCollectionURL = `/collections/${data[0]}`;
      res.sendStatus(201).location(newCollectionURL).send(newCollectionURL);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ message: "Internal server error." });
    });
};

const knex = require("knex")(require("../knexfile"));
const crypto = require("crypto");
const uuid = crypto.randomUUID();
const { body, validationResult } = require("express-validator");

exports.getAllItems = (req, res) => {
  knex("items")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res
        .status(400)
        .json({ message: `There was an error getting items`, error: err })
    );
};

exports.updateItem = [
  body("name").notEmpty(),
  body("link").notEmpty(),
  body("xaxis").notEmpty(),
  body("yaxis").notEmpty(),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { id } = req.params;
    knex("items")
      .update(req.body)
      .where({ id })
      .then(() => {
        res.status(200).send(`Item with id: ${id} has been updated`);
      })
      .catch((err) => {
        res.status(400).send(`Error updating item ${id}: ${err}`);
      });
  },
];

exports.getItemId = (req, res) => {
  knex
    .select(
      "items.id",
      "items.name",
      "items.link",
      "items.xaxis",
      "items.yaxis"
    )
    .from("items")
    .where("items.id", req.params.id)
    .then((data) => {
      if (data.length === 0) {
        res.status(404).send("Item not found");
      } else {
        res.status(200).json(data[0]);
      }
    })
    .catch((err) => {
      res.status(500).send("Error getting item information: " + err);
    });
};

exports.deleteItem = (req, res) => {
  const { id } = req.params;
  knex("items")
    .where({ id })
    .del()
    .then((rowsAffected) => {
      if (rowsAffected === 0) {
        res.status(404).send("Item not found");
      } else {
        res.status(204).send();
      }
    })
    .catch((err) => {
      res.status(500).send(`Error deleting item ${id}: ${err}`);
    });
};

// POST/CREATE new inventory item
exports.newItem = (req, res) => {
  const newID = uuid;
  const { name, link, xaxis, yaxis } = req.body;

  if (!name || !link || !xaxis || !yaxis) {
    return res.status(400).send({
      message:
        "Please make sure to provide item's name, link, xaxis, and yaxis",
    });
  }
  knex("items")
    .insert({ id: newID, name, link, xaxis, yaxis })
    .then((data) => {
      const newItemURL = `/items/${data[0]}`;
      res.sendStatus(201).location(newItemURL).send(newItemURL);
    })
    .catch((err) => {
      console.error(err);
      res.status(400).send({ message: `Error creating Item: ${err}` });
    });
};

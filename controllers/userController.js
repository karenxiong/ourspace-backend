const knex = require("knex")(require("../knexfile"));
const crypto = require("crypto");
const { body, validationResult } = require("express-validator");
const uuid = crypto.randomUUID();

exports.getAllUsers = (req, res) => {
  knex("users")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res
        .status(400)
        .json({ message: `There was an error getting users`, error: err })
    );
};

exports.updateUser = [
  body("avatar").notEmpty(),
  body("about").notEmpty(),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { id } = req.params;
    knex("users")
      .update(req.body)
      .where({ id })
      .then(() => {
        res.status(200).send(`User with id: ${id} has been updated`);
      })
      .catch((err) => {
        res.status(400).send(`Error updating user ${id}: ${err}`);
      });
  },
];

exports.getUserId = (req, res) => {
  knex
    .select(
      "users.id",
      "users.username",
      "users.avatar",
      "users.email",
      "users.password",
      "users.about"
    )
    .from("users")
    .where("users.id", req.params.id)
    .then((data) => {
      if (data.length === 0) {
        res.status(404).send("User not found");
      } else {
        res.status(200).json(data[0]);
      }
    })
    .catch((err) => {
      res.status(500).send("Error getting user information: " + err);
    });
};

// exports.deleteUser = (req, res) => {
//   const { id } = req.params;
//   knex("users")
//     .where({ id })
//     .del()
//     .then((rowsAffected) => {
//       if (rowsAffected === 0) {
//         res.status(404).send("User not found");
//       } else {
//         res.status(204).send();
//       }
//     })
//     .catch((err) => {
//       res.status(500).send(`Error deleting user ${id}: ${err}`);
//     });
// };

// POST/CREATE new inventory item
exports.newUser = (req, res) => {
  const newID = uuid();
  const { username, avatar, email, password, about } = req.body;

  if (!username || !email || !password) {
    return res.status(400).send({
      message: "Please make sure to provide a username, email, and password",
    });
  }

  knex("users")
    .insert({
      id: newID,
      username,
      avatar,
      email,
      password,
      about,
    })
    .then((data) => {
      const newUserURL = `/users/${data[0]}`;
      res.sendStatus(201).location(newUserURL).send(newUserURL);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ message: "Internal server error." });
    });
};

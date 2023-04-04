/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("collections").del();
  await knex("collections").insert([
    {
      id: "bdc6a452-a245-4c40-8ad5-a700de34b2f1",
      name: "Favourites",
      post_id: "dcc1a32e-c830-4dd7-98ca-30a4a982c6bb",
    },
    {
      id: "c09f6416-2497-4638-99d0-c3e6942f86d9",
      name: "Inspirations",
      post_id: "70a9e1ba-ee74-447c-9636-d4a12e3cc3ca",
    },
    {
      id: "0dab9677-d576-4d39-89ff-437f650d9336",
      name: "Saves",
      post_id: "8a3a834c-4fb5-4906-8a2d-a6ba112b1cb7",
    },
  ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

function createLikes(user) {}

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("likes").del();
  await knex("likes").insert([
    {
      id: "39b2cdfb-3326-4200-a8fc-5792625d1755",
      user_id: "102522671095802800548",
      post_id: "566d0120-09ef-45be-aeb7-68eb353b901c",
    },
    {
      id: "f090bf83-ff08-41dc-8281-8d9c7ddecbf4",
      user_id: "102522671095802800548",
      post_id: "566d0120-09ef-45be-aeb7-68eb353b901c",
    },
    {
      id: "c9ceeec5-105a-47d8-b345-03afa0159c1e",
      user_id: "102522671095802800548",
      post_id: "6d95e31c-ffb6-4ad2-8ff2-563824b1b1fe",
    },
    {
      id: "1636fed1-503c-4f01-bc61-5534684c0637",
      user_id: "102522671095802800548",
      post_id: "6d95e31c-ffb6-4ad2-8ff2-563824b1b1fe",
    },
  ]);
};

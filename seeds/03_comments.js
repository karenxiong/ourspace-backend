/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("comments").del();
  await knex("comments").insert([
    {
      id: "e96d9e10-b8da-4a00-8eef-63df5d31d41a",
      user_id: "2922c286-16cd-4d43-ab98-c79f698aeab0",
      comment: "LOVE this!",
      post_id: "dcc1a32e-c830-4dd7-98ca-30a4a982c6bb",
    },
    {
      id: "3529aca1-c3b0-4668-a62a-bc2aaf6c0f22",
      user_id: "5bf7bd6c-2b16-4129-bddc-9d37ff8539e9",
      comment:
        "Wow! I have the same rug and I can't recommend it enough! I have to recreate this space now.",
      post_id: "70a9e1ba-ee74-447c-9636-d4a12e3cc3ca",
    },
    {
      id: "49e331b5-5290-47c9-81c5-7f4cbd57fd72",
      user_id: "90ac3319-70d1-4a51-b91d-ba6c2464408c",
      comment:
        "Loving the bright armchair! It definitely changes the whole vibe of the room.",
      post_id: "8a3a834c-4fb5-4906-8a2d-a6ba112b1cb7",
    },
  ]);
};

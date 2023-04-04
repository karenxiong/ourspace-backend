/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert([
    {
      id: "2922c286-16cd-4d43-ab98-c79f698aeab0",
      username: "spacelover",
      avatar: "",
      email: "spacelover@example.com",
      password: "ourspacepassword",
      about: "Interior Design Enthusiast",
    },
    {
      id: "5bf7bd6c-2b16-4129-bddc-9d37ff8539e9",
      username: "homebody",
      avatar: "",
      email: "homebody@example.com",
      password: "homebodypassword",
      about: "",
    },
    {
      id: "90ac3319-70d1-4a51-b91d-ba6c2464408c",
      username: "modernhome",
      avatar: "",
      email: "modernhome@example.com",
      password: "modernhomepassword",
      about: "All things modern",
    },
  ]);
};

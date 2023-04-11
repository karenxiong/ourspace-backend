/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("posts").del();
  await knex("posts").insert([
    {
      id: "566d0120-09ef-45be-aeb7-68eb353b901c",
      title: "My Simple Desk Space",
      image: "public/data/uploads//screen-post-LJUaTzKtFNc-unsplash.jpg",
      user_id: "102522671095802800548",
      user_nickname: "simplisticspace",
      description:
        "Been enjoying my clean and simple desk, it really helps me focus on my work.",
    },
    {
      id: "6d95e31c-ffb6-4ad2-8ff2-563824b1b1fe",
      title: "Cozy Night Time Vibes",
      image: "public/data/uploads//jannis-brandt-4mHaSX8zvJI-unsplash.jpg",
      user_id: "5bf7bd6c-2b16-4129-bddc-9d37ff8539e9",
      user_nickname: "cozybear",
      description: "I work during the nights and this is my nightly desk vibe!",
    },
  ]);
};

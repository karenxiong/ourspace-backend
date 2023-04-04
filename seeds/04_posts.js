/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("posts").del();
  await knex("posts").insert([
    {
      id: "dcc1a32e-c830-4dd7-98ca-30a4a982c6bb",
      title: "My Cozy Space",
      image:
        "https://images.unsplash.com/photo-1615529182904-14819c35db37?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGl2aW5nJTIwcm9vbSUyMGludGVyaW9yJTIwZGVzaWdufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60",
      user_id: "2922c286-16cd-4d43-ab98-c79f698aeab0",
      description:
        "Been enjoying cool tones with a pop of fresh colours from my plants.",
      item_id: "593c0f83-0c42-4fbb-bd59-101fd323d849",
      likes: 22,
      comment_id: "e96d9e10-b8da-4a00-8eef-63df5d31d41a",
    },
    {
      id: "70a9e1ba-ee74-447c-9636-d4a12e3cc3ca",
      title: "My Space with a Pop of Colour",
      image:
        "https://images.unsplash.com/photo-1615873968403-89e068629265?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8bGl2aW5nJTIwcm9vbSUyMGludGVyaW9yJTIwZGVzaWdufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60",
      user_id: "5bf7bd6c-2b16-4129-bddc-9d37ff8539e9",
      description:
        "Was inspired to add some colour to my space and now this is my favourite room.",
      item_id: "2bf93aed-c5a1-4688-89ae-e2a36de02662",
      likes: 23,
      comment_id: "3529aca1-c3b0-4668-a62a-bc2aaf6c0f22",
    },
    {
      id: "8a3a834c-4fb5-4906-8a2d-a6ba112b1cb7",
      title: "My New Favourite Chair",
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGxpdmluZyUyMHJvb20lMjBpbnRlcmlvciUyMGRlc2lnbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60",
      user_id: "90ac3319-70d1-4a51-b91d-ba6c2464408c",
      description:
        "Saw this chair on sale and couldn't resist getting it. It really brightens up my room and mood!",
      item_id: "6cf6dc0d-dbb8-4caf-8353-4b1f991f881d",
      likes: 60,
      comment_id: "49e331b5-5290-47c9-81c5-7f4cbd57fd72",
    },
  ]);
};

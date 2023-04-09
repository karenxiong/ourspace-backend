/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("items").del();
  await knex("items").insert([
    {
      id: "593c0f83-0c42-4fbb-bd59-101fd323d849",
      name: "couch",
      link: "https://www.ikea.com/ca/en/p/uppland-sofa-totebo-light-beige-s49337680/",
      xaxis: 23422,
      yaxis: 21313,
      post_id: "dcc1a32e-c830-4dd7-98ca-30a4a982c6bb",
    },
    {
      id: "2bf93aed-c5a1-4688-89ae-e2a36de02662",
      name: "coffee table",
      link: "https://www.ikea.com/ca/en/p/listerby-coffee-table-dark-brown-beech-veneer-90562246/",
      xaxis: 13445,
      yaxis: 57833,
      post_id: "70a9e1ba-ee74-447c-9636-d4a12e3cc3ca",
    },
    {
      id: "6cf6dc0d-dbb8-4caf-8353-4b1f991f881d",
      name: "armchair",
      link: "https://www.ikea.com/ca/en/p/strandmon-armchair-skiftebo-yellow-20361897/",
      xaxis: 44677,
      yaxis: 29976,
      post_id: "8a3a834c-4fb5-4906-8a2d-a6ba112b1cb7",
    },
  ]);
};

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
    },
    {
      id: "2bf93aed-c5a1-4688-89ae-e2a36de02662",
      name: "coffee table",
      link: "https://www.ikea.com/ca/en/p/listerby-coffee-table-dark-brown-beech-veneer-90562246/",
      xaxis: 13445,
      yaxis: 57833,
    },
    {
      id: "6cf6dc0d-dbb8-4caf-8353-4b1f991f881d",
      name: "armchair",
      link: "https://www.ikea.com/ca/en/p/strandmon-armchair-skiftebo-yellow-20361897/",
      xaxis: 44677,
      yaxis: 29976,
    },
  ]);
};

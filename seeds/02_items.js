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
      name: "Phone Stand",
      link: "https://www.amazon.ca/Adjustable-OMOTON-Cellphone-Anti-Slip-Convenient/dp/B0744DM3Y3/ref=sr_1_6?crid=3MUFVTZ9NHLFF&keywords=phone%2Bstand&qid=1681168362&sprefix=phone%2Bs%2Caps%2C137&sr=8-6&th=1",
      xaxis: 66,
      yaxis: 54,
      post_id: "566d0120-09ef-45be-aeb7-68eb353b901c",
    },
    {
      id: "f090bf83-ff08-41dc-8281-8d9c7ddecbf4",
      name: "Shelf",
      link: "https://www.ikea.com/ca/en/p/baggebo-shelf-unit-metal-white-50481172/",
      xaxis: 39,
      yaxis: 36,
      post_id: "566d0120-09ef-45be-aeb7-68eb353b901c",
    },
    {
      id: "c9ceeec5-105a-47d8-b345-03afa0159c1e",
      name: "Laptop Stand",
      link: "https://www.amazon.ca/Aluminum-Ergonomic-Adjustable-Notebook-Compatible/dp/B08JD7FN44/ref=sr_1_8?keywords=laptop%2Bstand&qid=1681168604&sprefix=laptop%2Caps%2C130&sr=8-8&th=1",
      xaxis: 73,
      yaxis: 29,
      post_id: "6d95e31c-ffb6-4ad2-8ff2-563824b1b1fe",
    },
    {
      id: "1636fed1-503c-4f01-bc61-5534684c0637",
      name: "Bluetooth Mouse",
      link: "https://www.amazon.ca/Slim-Rechargeable-Bluetooth-Wireless-Mouse/dp/B01MDV0A0V/ref=sr_1_17?crid=2T1GPTRVZZFJG&keywords=mouse+white&qid=1681168684&sprefix=mouse+white%2Caps%2C122&sr=8-17",
      xaxis: 62,
      yaxis: 56,
      post_id: "6d95e31c-ffb6-4ad2-8ff2-563824b1b1fe",
    },
  ]);
};

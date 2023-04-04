const crypto = require("crypto");
const uuid = crypto.randomUUID();

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("users", (table) => {
      table.uuid("id").primary();
      table.string("username").notNullable();
      table.text("avatar");
      table.string("email").notNullable();
      table.string("password").notNullable();
      table.string("about");
    })
    .createTable("items", (table) => {
      table.uuid("id").primary();
      table.string("name").notNullable();
      table.string("link").notNullable();
      table.integer("xaxis").notNullable();
      table.integer("yaxis").notNullable();
    })
    .createTable("comments", (table) => {
      table.uuid("id").primary();
      table
        .uuid("user_id")
        .references("users.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.string("comment").notNullable();
      table.timestamp("timestamp").defaultTo(knex.fn.now());
    })
    .createTable("posts", (table) => {
      table.uuid("id").primary();
      table.string("title").notNullable();
      table.text("image");
      table
        .uuid("user_id")
        .references("users.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.timestamp("timestamp").defaultTo(knex.fn.now());
      table.string("description").notNullable();
      table
        .uuid("item_id")
        .references("items.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.integer("likes").defaultTo(0);
      table
        .uuid("comment_id")
        .references("comments.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("collections", (table) => {
      table.uuid("id").primary();
      table.string("name").notNullable();
      table
        .uuid("post_id")
        .references("posts.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTable("collections")
    .dropTable("posts")
    .dropTable("comments")
    .dropTable("items")
    .dropTable("users");
};

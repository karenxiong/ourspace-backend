/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("posts", (table) => {
      table.uuid("id").primary();
      table.string("title").notNullable();
      table.string("image");
      table.string("user_id").notNullable();
      table.string("user_nickname").notNullable();
      table.timestamp("timestamp").defaultTo(knex.fn.now());
      table.string("description").notNullable();
      table.integer("likes").defaultTo(0);
    })
    .createTable("items", (table) => {
      table.uuid("id").primary();
      table.string("name").notNullable();
      table.string("link").notNullable();
      table.integer("xaxis").notNullable();
      table.integer("yaxis").notNullable();
      table
        .uuid("post_id")
        .references("posts.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("comments", (table) => {
      table.uuid("id").primary();
      table.string("user_id").notNullable();
      table.string("comment").notNullable();
      table
        .uuid("post_id")
        .references("posts.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.timestamp("timestamp").defaultTo(knex.fn.now());
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
    .dropTable("comments")
    .dropTable("items")
    .dropTable("posts");
};

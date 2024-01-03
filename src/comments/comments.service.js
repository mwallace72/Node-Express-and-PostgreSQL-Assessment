const knex = require("../db/connection");

function list() {
  // your solution here
  return knex("comments").select("*")
}

function listCommenterCount() {
  // your solution here
  return knex("comments")
    .join("users as u", "comments.commenter_id", "u.user_id")
    .select("u.user_email as commenter_email")
    .count("comments.comment_id")
    .groupBy("commenter_email")
    .orderBy("commenter_email")
}

function read(commentId) {
  // your solution here
  return knex("comments")
    .join("users as u", "comments.commenter_id", "u.user_id")
    .join("posts as p", "comments.post_id", "p.post_id")
    .select("comment_id", "comment", "u.user_email as commenter_email", "p.post_body as commented_post")
    .where({ comment_id: commentId }).first();
}

module.exports = {
  list,
  listCommenterCount,
  read,
};

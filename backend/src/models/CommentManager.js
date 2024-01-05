const AbstractManager = require("./AbstractManager");

class CommentManager extends AbstractManager {
  constructor() {
    super({ table: "comment" });
  }

  async create(comment) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (user_id, recipe_id, message) VALUES (?, ?, ?)`,
      [comment.userId, comment.recipeId, comment.message]
    );
    return result;
  }

  async update(message, id) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET (message = ?) WHERE id = ? `,
      [message, id]
    );

    return result;
  }

  async readCommentsByRecipeId(id) {
    const [result] = await this.database.query(
      `select comment.id AS commentId, recipe_id, message, comment.created_date, pseudo from ${this.table} JOIN user ON user_id=user.id where recipe_id = ?`,
      [id]
    );
    return result;
  }
}
module.exports = CommentManager;

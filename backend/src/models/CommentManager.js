const AbstractManager = require("./AbstractManager");

class CommentManager extends AbstractManager {
  constructor() {
    super({ table: "comment" });
  }

  async create(userId, recipeId, message) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (user_id, recipe_id, message) VALUES (?, ?, ?)`,
      [userId, recipeId, message]
    );
    return [result];
  }

  async update(message, id) {
    const updatedDate = new Date().toISOString().slice(0, 10);

    const [result] = await this.database.query(
      `UPDATE ${this.table} SET (message = ?, updated_date = ?) WHERE id = ? `,
      [message, updatedDate, id]
    );

    return [result];
  }
}
module.exports = CommentManager;

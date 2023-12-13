const AbstractManager = require("./AbstractManager");

class FavorisManager extends AbstractManager {
  constructor() {
    super({ table: "favoris" });
  }

  async create(userId, recipeId) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (user_id, recipe_id) VALUES (?, ?)`,
      [userId, recipeId]
    );
    return [result];
  }

  async delete(userId, recipeId) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE (user_id = ? AND recipe_id = ?)`,
      [userId, recipeId]
    );
    return [result];
  }
}
module.exports = FavorisManager;

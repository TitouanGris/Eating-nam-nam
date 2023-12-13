const AbstractManager = require("./AbstractManager");

class UserIngredientManager extends AbstractManager {
  constructor() {
    super({ table: "user_ingredient" });
  }

  async create({ userId, ingredientId }) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (user_id, ingredient_id) values (?, ?)`,
      [userId, ingredientId]
    );
    return [result];
  }

  async update({ userId, ingredientId }) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET ingredient_id=? WHERE user_id=? AND ingredient_id=?`,
      [ingredientId, userId, ingredientId]
    );
    return [result];
  }

  async delete({ userId, ingredientId }) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE user_id=? AND ingredient_id=?`,
      [userId, ingredientId]
    );
    return [result];
  }
}

module.exports = UserIngredientManager;

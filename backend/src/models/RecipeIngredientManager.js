const AbstractManager = require("./AbstractManager");

class RecipeIngredientManager extends AbstractManager {
  constructor() {
    super({ table: "recipe_ingredient" });
  }

  async create({ recipeId, ingredientId, unitId, quantity }) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (recipe_id, ingredient_id, unit_id, quantity) VALUES(?, ?, ?, ?)`,
      [recipeId, ingredientId, unitId, quantity]
    );
    return result;
  }

  async delete({ recipeId, ingredientId, unitId, quantity }) {
    const [result] = await this.database.query(
      `DELETE FROM  ${this.table} WHERE recipe_id=? AND ingredient_id=? AND unit_id=? AND quantity=?`,
      [recipeId, ingredientId, unitId, quantity]
    );
    return result;
  }
}

module.exports = RecipeIngredientManager;

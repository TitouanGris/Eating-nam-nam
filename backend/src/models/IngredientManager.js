const AbstractManager = require("./AbstractManager");

class IngredientManager extends AbstractManager {
  constructor() {
    super({ table: "ingredient" });
  }

  async create(name) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (name) VALUES (?)`,
      [name]
    );

    return result;
  }

  async update(name, id) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET (name = ?) WHERE id = ? `,
      [name, id]
    );

    return result;
  }

  async readIngredientsByRecipeId(id) {
    const [result] = await this.database.query(
      `select recipe_id, ingredient.id ,ingredient.name AS ingredientName, quantity, unit.name AS unitName FROM ${this.table} JOIN recipe_ingredient ON 
ingredient.id=ingredient_id JOIN unit ON unit_id=unit.id where recipe_id = ?`,
      [id]
    );
    return result;
  }
}

module.exports = IngredientManager;

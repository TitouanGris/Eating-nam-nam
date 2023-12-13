const AbstractManager = require("./AbstractManager");

class RecipeManager extends AbstractManager {
  constructor() {
    super({ table: "recipe" });
  }

  async create({ userId, name, summary, photoUrl, nbServing, validateRecipe }) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (user_id, name, summary, photo_url, nb_serving, validate_recipe) values (?, ?, ?, ?, ?, ?)`,
      [userId, name, summary, photoUrl, nbServing, validateRecipe]
    );

    return result;
  }

  async update({
    id,
    userId,
    name,
    summary,
    photoUrl,
    nbServing,
    validateRecipe,
  }) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET userId=?, name = ?, summary = ?, photo_url = ?, nb_serving = ?, validate_recipe = ? WHERE id = ? `,
      [userId, name, summary, photoUrl, nbServing, validateRecipe, id]
    );
    return result;
  }
}

module.exports = RecipeManager;

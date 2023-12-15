const AbstractManager = require("./AbstractManager");

class RecipeManager extends AbstractManager {
  constructor() {
    super({ table: "recipe" });
  }

  async readAllCardInfos() {
    const [result] = await this.database.query(
      `SELECT r.id as recipeId, r.name as recipeName, r.nb_serving, r.validate_recipe, r.photo_url,
       t.id, t.category_id, t.name as tagName, t.image_url as tagUrl FROM
      recipe_tags rt
    JOIN  ${this.table} r ON rt.recipe_id = r.id
    JOIN tags t ON t.id = rt.tags_id
    `
    );

    return result;
  }

  // Return the array of items

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

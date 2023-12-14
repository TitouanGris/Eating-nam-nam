const AbstractManager = require("./AbstractManager");

class RecipeManager extends AbstractManager {
  constructor() {
    super({ table: "recipe" });
  }

  async readAllCardInfos() {
    const [result] = await this.database.query(
      `SELECT r.id as recipeId, r.name as recipeName, r.nb_serving, r.validate_recipe, r.photo_url,
       t.id, t.category_id, t.image_url, t.name as tagName FROM
      recipe_tags rt
    JOIN  ${this.table} r ON rt.recipe_id = r.id
    JOIN tags t ON t.id = rt.tags_id
    `
    );

    return result;
  }

  // async readAllCardInfos() {
  //   const [result] = await this.database.query(`
  //       SELECT
  //           r.id,
  //           r.name,
  //           COUNT(DISTINCT t.id) AS tag_count,
  //           GROUP_CONCAT(DISTINCT t.tag_name) AS tag_names,
  //           GROUP_CONCAT(DISTINCT t.image_url) AS tag_image_urls,
  //       FROM
  //           recipes r
  //           LEFT JOIN recipe_tags rt ON rt.recipe_id = r.id
  //           LEFT JOIN tags t ON t.id = rt.tag_id
  //       GROUP BY
  //           r.id,
  //           r.name
  //   `);

  //   return result;
  // }

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

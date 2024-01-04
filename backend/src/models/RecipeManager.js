const AbstractManager = require("./AbstractManager");

class RecipeManager extends AbstractManager {
  constructor() {
    super({ table: "recipe" });
  }

  async readAllCardInfos() {
    const [result] = await this.database.query(
      `SELECT r.id as recipeId, r.name as recipeName, r.nb_serving, r.validate_recipe, r.photo_url,
       t.id, t.category_id, t.name as tagName, t.image_url as tagUrl, category.name as categoryName FROM
      recipe_tags rt
    JOIN  ${this.table} r ON rt.recipe_id = r.id
    JOIN tags t ON t.id = rt.tags_id
    JOIN category ON t.category_id=category.id
    `
    );

    return result;
  }

  async readCardInfos(id) {
    const [result] = await this.database.query(
      `SELECT r.id as recipeId, r.name as recipeName, r.summary, r.nb_serving, r.validate_recipe, r.photo_url,
       t.id, t.category_id, t.name as tagName, t.image_url as tagUrl FROM
      recipe_tags rt
    JOIN  ${this.table} r ON rt.recipe_id = r.id
    JOIN tags t ON t.id = rt.tags_id WHERE r.id=?`,
      [id]
    );

    return result;
  }

  // Return the array of items

  async create({ recipe, tags, ingredients, steps }) {
    const connection = await this.database.getConnection();
    try {
      await connection.beginTransaction();

      // Insertion dans la table recipe
      const [recipeResult] = await connection.query(
        `INSERT INTO ${this.table} (user_id, name, summary, photo_url, nb_serving, validate_recipe) VALUES (?, ?, ?, ?, ?, ?)`,
        [
          recipe.user_id,
          recipe.recipe_name,
          recipe.summary,
          recipe.photoUrl,
          recipe.nb_serving,
          recipe.validateRecipe,
        ]
      );

      const recipeId = recipeResult.insertId;

      // Insertion dans la table recipe_ingredient
      const ingredientPromises = ingredients.map((ingredient) => {
        return connection.query(
          "INSERT INTO recipe_ingredient (recipe_id, ingredient_id, quantity, unit_id) VALUES (?, ?, ?, ?)",
          [recipeId, ingredient.catId, ingredient.qtyValue, ingredient.unitId]
        );
      });
      await Promise.all(ingredientPromises);

      // Insertion dans la table recipe_tags
      // const tagPromises = tags.map((tagId) => {
      /*
        Object.keys(tags) => [ type_tags_id,
                              time_tags_id,
                              price_tags_id,
                              diff_tags_id,
                              regime_tags_id,
                              country_tags_id
                            ]
        Object.values(tags) => [ 1,
                                2,
                                null,
                                3,
                                4,
                                null
                            ]
        Object.enrties(tags) => [ ["type_tags_id", 1], [], [] ... ]
      */
      const tagPromises = Object.values(tags).map((tagId) => {
        return connection.query(
          "INSERT INTO recipe_tags (recipe_id, tags_id) VALUES (?, ?)",
          [recipeId, tagId]
        );
      });
      await Promise.all(tagPromises);

      // Insertion dans la table step
      const stepPromises = steps.map((step) => {
        return connection.query(
          "INSERT INTO step (recipe_id, description, step_number) VALUES (?, ?, ?)",
          [recipeId, step.description, step.step_number]
        );
      });
      await Promise.all(stepPromises);

      await connection.commit();

      return recipeResult;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
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

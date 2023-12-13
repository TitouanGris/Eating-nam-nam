const AbstractManager = require("./AbstractManager");

class RecipeTagsManager extends AbstractManager {
  constructor() {
    super({ table: "recipe_tags" });
  }

  async create(recipeId, tagsId) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (recipe_id, tags_id) values (?, ?)`,
      [recipeId, tagsId]
    );
    return result;
  }

  async update(recipeId, tagsId) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET tags_id=? WHERE recipe_id=? AND tags_id=?`,
      [tagsId, recipeId, tagsId]
    );
    return result;
  }

  async delete(recipeId, tagsId) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE recipe_id=? AND tags_id=?`,
      [recipeId, tagsId]
    );
    return result;
  }
}

module.exports = RecipeTagsManager;

const AbstractManager = require("./AbstractManager");

class TagsManager extends AbstractManager {
  constructor() {
    super({ table: "tags" });
  }

  async create(categoryId, imageUrl, name) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (category_id, image_url, name) values (?, ?, ?)`,
      [categoryId, imageUrl, name]
    );

    return result;
  }

  async update(id, categoryId, imageUrl, name) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET category_id=?, image_url=?, name=? WHERE id = ? `,
      [id, categoryId, imageUrl, name]
    );
    return result;
  }

  async readTagsByRecipeId(id) {
    const [result] = await this.database.query(
      `SELECT recipe_id, tags.name, tags.id FROM recipe_tags JOIN ${this.table} ON tags_id = tags.id WHERE recipe_id=? AND (category_id=2 OR category_id=3 OR category_id=6)`,
      [id]
    );
    return result;
  }
}

module.exports = TagsManager;

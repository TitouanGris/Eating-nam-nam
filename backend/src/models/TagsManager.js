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

    return [result];
  }

  async update(id, categoryId, imageUrl, name) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET category_id=?, image_url=?, name=? WHERE id = ? `,
      [id, categoryId, imageUrl, name]
    );
    return [result];
  }
}

module.exports = TagsManager;

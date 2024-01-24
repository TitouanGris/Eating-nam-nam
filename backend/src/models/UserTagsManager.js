const AbstractManager = require("./AbstractManager");

class UserTagsManager extends AbstractManager {
  constructor() {
    super({ table: "user_tags" });
  }

  async add(newTable) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (user_id, tags_id) values ${newTable}`
    );
    return result;
  }

  async browse(id) {
    const [result] = await this.database.query(
      `SELECT t.name, t.category_id 
      FROM tags t
      JOIN ${this.table} ut on ut.tags_id = t.id
      WHERE ut.user_id = ${id}
      `
    );
    return result;
  }

  async delete(userId, newTags) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE user_id=${userId} AND tag_id=${newTags}`
    );
    return result;
  }
}

module.exports = UserTagsManager;

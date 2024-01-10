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
      `SELECT t.name FROM tags t
      JOIN ${this.table} ut on ut.tags_id = t.id
      WHERE ut.user_id = ${id}
      `
    );
    return result;
  }

  async delete({ userId, tagsId }) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE user_id = ? AND tags_id IN (?)`,
      [userId, tagsId]
    );
    return result;
  }
}

module.exports = UserTagsManager;

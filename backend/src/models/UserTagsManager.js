const AbstractManager = require("./AbstractManager");

class UserTagsManager extends AbstractManager {
  constructor() {
    super({ table: "user_tags" });
  }

  async create({ userId, tagsId }) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (user_id, tags_id) VALUES(?, ?)`,
      [userId, tagsId]
    );
    return result;
  }

  async delete({ userId, tagsId }) {
    const [result] = await this.database.query(
      `DELETE FROM  ${this.table} WHERE user_id=? AND tags_id=?`,
      [userId, tagsId]
    );
    return result;
  }
}

module.exports = UserTagsManager;

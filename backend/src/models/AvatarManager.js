const AbstractManager = require("./AbstractManager");

class AvatarManager extends AbstractManager {
  constructor() {
    super({ table: "avatar" });
  }

  async create(url) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (image_url) values (?)`,
      [url]
    );
    return result;
  }

  async readOneAvatar(imageUrl, id) {
    const [result] = await this.database.query(
      `SELECT * FROM ${this.table}
       WHERE image_url = ? OR id=?`,
      [imageUrl, id]
    );
    return result[0];
  }
}

module.exports = AvatarManager;

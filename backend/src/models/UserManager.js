const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  async create(pseudo, email, password, isAdmin) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (pseudo, email, password, is_admin) values (?, ?, ?, ?)`,
      [pseudo, email, password, isAdmin]
    );

    return result;
  }

  async update(pseudo, email, password, isAdmin, id) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET (pseudo = ?, email = ?, password = ?, is_admin = ?) WHERE id = ? `,
      [pseudo, email, password, isAdmin, id]
    );

    return result;
  }
}

module.exports = UserManager;

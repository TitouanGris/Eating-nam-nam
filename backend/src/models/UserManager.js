const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  async create(user) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (pseudo, email, password, is_admin) values (?, ?, ?, ?)`,
      [user.pseudo, user.email, user.password, user.is_admin]
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

  async readOneUser(pseudo, email) {
    const [result] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE pseudo = ? OR email = ?`,
      [pseudo, email]
    );
    return result[0];
  }
}

module.exports = UserManager;

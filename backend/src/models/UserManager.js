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

  // on cherche le user par son adresse e-mail pour renvoyer toutes ses infos (pour ensuite vérifier le mdp et si ok renvoyer les infos users vers le front)
  async getByMail(email) {
    const [result] = await this.database.query(
      `SELECT * from ${this.table} WHERE email = ?`,
      [email]
    );
    return result[0];
  }
}

module.exports = UserManager;

const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  async create(user) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (pseudo, email, password, is_admin) values (?, ?, ?, ?)`,
      [
        user.pseudo,
        user.email,
        user.password,
        user.is_admin !== undefined ? user.is_admin : 0,
      ]
    );
    return result;
  }

  async update(pseudo, email, password, isAdmin, avatarId, id) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET pseudo = ?, email = ?, password = ?, is_admin = ?, avatar_id = ? WHERE id = ? `,
      [pseudo, email, password, isAdmin, avatarId, id]
    );

    return result;
  }

  // async edit(id, newUser) {
  //   const [result] = await this.database.query(
  //     `UPDATE ${this.table} SET pseudo = ? WHERE id = ?`,
  //     [newUser.pseudo, id]
  //   );

  //   return result;
  // }

  // on cherche le user par son adresse e-mail pour renvoyer toutes ses infos (pour ensuite vérifier le mdp et si ok renvoyer les infos users vers le front)
  // on join notre table user avec la table avatar pour récupérer l'avatar choisi par le user
  async getByMail(email) {
    const [result] = await this.database.query(
      `SELECT u.id as id, u.pseudo, u.email, u.created_date, u.updated_date, u.password, u.is_admin, u.avatar_id as avatarId, a.image_url
      FROM ${this.table} u
      JOIN avatar a ON a.id = u.avatar_id
      WHERE email = ?`,
      [email]
    );
    return result[0];
  }

  // async getByMail(email) {
  //   const [result] = await this.database.query(
  //     `SELECT a.image_url, u.id, u.pseudo, u.email, u.is_admin
  //     FROM ${this.table} u
  //     JOIN avatar a ON a.id = u.avatar_id
  //     WHERE email = ?`,
  //     [email]
  //   );
  //   return result[0];
  // }

  async readOneUser(newUser) {
    const [result] = await this.database.query(
      `SELECT * FROM ${this.table}
       WHERE pseudo = ? OR email = ?  OR id=?`,
      [newUser.pseudo, newUser.email, newUser.id]
    );
    return result[0];
  }

  async destroy(id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return result;
  }
}

module.exports = UserManager;

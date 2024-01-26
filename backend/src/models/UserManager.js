const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  async readAll() {
    const [result] = await this.database.query(
      `SELECT user.id as id, pseudo, email, created_date, updated_date, is_admin, avatar.id as avatar_id, image_url   FROM ${this.table} JOIN avatar ON avatar_id = avatar.id`
    );
    return result;
  }

  /**
id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        pseudo VARCHAR(20) NOT NULL,
        email VARCHAR(255) NOT NULL,
        created_date DATETIME NOT NULL DEFAULT NOW(),
        updated_date DATETIME NULL DEFAULT NOW() ON UPDATE CURRENT_TIMESTAMP,
        password VARCHAR(255) NOT NULL,
        is_admin BOOL NOT NULL DEFAULT FALSE,
        avatar_id
   */

  async create(user) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (pseudo, email, hashed_password, is_admin) values (?, ?, ?, ?)`,
      [
        user.pseudo,
        user.email,
        user.hashedPassword,
        user.is_admin !== undefined ? user.is_admin : 0,
      ]
    );
    return result;
  }

  async update(pseudo, email, hashedPassword, isAdmin, imageUrl, id) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET pseudo = ?, email = ?, hashed_password = ?, is_admin = ?, image_url = ?  WHERE id = ? `,
      [pseudo, email, hashedPassword, isAdmin, imageUrl, id]
    );

    return result;
  }

  async edit(id, newUser) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET pseudo = ? WHERE id = ?`,
      [newUser.pseudo, id]
    );

    return result;
  }

  async editAvatar(id, newUser) {
    console.info("edit manager");
    console.info(newUser);
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET avatar_id = ? WHERE id = ?`,
      [newUser.avatar_id, id]
    );

    return result;
  }
  // on cherche le user par son adresse e-mail pour renvoyer toutes ses infos (pour ensuite vérifier le mdp et si ok renvoyer les infos users vers le front)
  // on join notre table user avec la table avatar pour récupérer l'avatar choisi par le user

  async getByMail(email) {
    const [result] = await this.database.query(
      `SELECT u.id as id, u.pseudo, u.email, u.hashed_password, u.created_date, u.updated_date, u.is_admin, u.avatar_id as avatarId, a.image_url
      FROM ${this.table} u
      JOIN avatar a ON a.id = u.avatar_id
      WHERE email = ?`,
      [email]
    );
    return result[0];
  }

  async getById(id) {
    const [result] = await this.database.query(
      `SELECT u.id as id, u.pseudo, u.email, u.hashed_password, u.created_date, u.updated_date, u.is_admin, u.avatar_id as avatarId, a.image_url
      FROM ${this.table} u
      JOIN avatar a ON a.id = u.avatar_id
      WHERE u.id = ?`,
      [id]
    );

    return result[0];
  }

  async readOneUser(newUser) {
    const [result] = await this.database.query(
      `SELECT * FROM ${this.table}
       WHERE pseudo = ? OR email = ? OR avatar_id = ? OR id = ?`,
      [newUser.pseudo, newUser.email, newUser.avatarId, newUser.id]
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

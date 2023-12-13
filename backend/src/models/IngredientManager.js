const AbstractManager = require("./AbstractManager");

class IngredientManager extends AbstractManager {
  constructor() {
    super({ table: "ingredient" });
  }

  async create(name) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (name) VALUES (?)`,
      [name]
    );

    return result;
  }

  async update(name, id) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET (name = ?) WHERE id = ? `,
      [name, id]
    );

    return result;
  }
}

module.exports = IngredientManager;

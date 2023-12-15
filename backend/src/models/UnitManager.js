const AbstractManager = require("./AbstractManager");

class UnitManager extends AbstractManager {
  constructor() {
    super({ table: "unit" });
  }

  async create(name) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (name) values (?)`,
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

module.exports = UnitManager;

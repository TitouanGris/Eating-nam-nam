const AbstractManager = require("./AbstractManager");

class StepManager extends AbstractManager {
  constructor() {
    super({ table: "step" });
  }

  async create(recipeId, stepNumber, description) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (recipe_id, step_number, description) values (?, ?, ?)`,
      [recipeId, stepNumber, description]
    );

    return result;
  }

  async update(recipeId, stepNumber, description, id) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET (recipe_id = ?, step_number=?, description=?) WHERE id = ? `,
      [recipeId, stepNumber, description, id]
    );

    return result;
  }

  async readSteps(id) {
    const [result] = await this.database.query(
      `select * from ${this.table} where recipe_id = ?`,
      [id]
    );
    return result;
  }
}

module.exports = StepManager;

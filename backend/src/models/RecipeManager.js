const AbstractManager = require("./AbstractManager");
​
class RecipeManager extends AbstractManager {
  constructor() {
    super({ table: "recipe" });
  }
​
​
  async create({ user_id, name, summary, photo_url, nb_serving, validate_recipe }) {
​
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (user_id, name, summary, photo_url, nb_serving, validate_recipe) values (?, ?, ?, ?, ?, ?)`,
      [user_id, name, summary, photo_url, nb_serving, validate_recipe]
    );
​
    return result;
  }
​
  async update( {id, name, summary, photo_url, nb_serving, validate_recipe} ) {
​
    const updated_date = new Date().toISOString().slice(0, 10);
​
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET name = ?, summary = ?, photo_url = ?, nb_serving = ?, updated_date = ?, validate_recipe = ? WHERE id = ? `,
      [name, summary, photo_url, nb_serving, updated_date, validate_recipe, id]
    );
    return result;
  }
}
​
module.exports = RecipeManager;
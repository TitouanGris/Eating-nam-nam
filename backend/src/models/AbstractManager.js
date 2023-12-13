// Import database client
const database = require("../../database/client");

// Provide database access through AbstractManager class
class AbstractManager {
  constructor({ table }) {
    // Store the table name
    this.table = table;

    // Provide access to the database client
    this.database = database;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [result] = await this.database.query(`SELECT * FROM ${this.table}`);

    // Return the array of items
    return result;
  }

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [result] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the item
    return result;
  }

  async deleteById(id) {
    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [result] = await this.database.query(
      `DELETE from ${this.table} WHERE id = ?`,
      [id]
    );

    // Return the array of items
    return result;
  }
}

// Ready to export
module.exports = AbstractManager;

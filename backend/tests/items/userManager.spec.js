// Import des dépendances
const { database, tables } = require("../setup");

// test de création d'un nouvel utilisateur
describe("Create new user", () => {
  it("should create an user successfully", async () => {
    // objet utilisateur complet
    const newUserSample = {
      pseudo: "Irwin",
      email: "irwin@gmail.com",
      hashedPassword: "qzqzdqzd@qzdqz42é12",
      is_admin: 0,
    };

    // utilisation,
    const result = await tables.user.create(newUserSample);
    const { insertId } = result;

    // Check if the newly added item exists in the database
    const [rows] = await database.query(
      "select * from user where id = ?",
      insertId
    );

    const foundUser = rows[0];

    // Assertions
    expect(foundUser).toBeDefined();
    expect(foundUser.pseudo).toBe(newUserSample.pseudo);
  });

  it("should throw when passing invalid object", async () => {
    // Send a create request to the item table with an empty object
    const promise = tables.user.create({});

    // Assertions
    await expect(promise).rejects.toThrow();
  });
});

// test de suppression d'un nouvel utilisateur
describe("Delete new user", () => {
  it("should delete an user successfully", async () => {
    // Creation d'un user pour ensuite le supprimer
    const newUserSample = {
      pseudo: "Jean",
      email: "Jean@gmail.com",
      hashedPassword: "qzqzdqzd@qzdqz42é12",
      is_admin: 0,
    };

    const resultCreation = await tables.user.create(newUserSample);
    const { insertId } = resultCreation;

    // Debut de la suppression :
    await tables.user.destroy(insertId);

    // Check if the newly added item exists in the database
    const [rows] = await database.query(
      "select * from user where id = ?",
      insertId
    );

    const foundUser = rows[0];

    // Assertions
    expect(foundUser).toBeUndefined();
  });

  it("should throw when passing invalid object", async () => {
    // Send a create request to the item table with an empty object
    const promise = tables.user.create({});

    // Assertions
    await expect(promise).rejects.toThrow();
  });
});

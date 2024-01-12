/* ************************************************************************* */
// Register Data Managers for Tables
/* ************************************************************************* */

// Import the manager modules responsible for handling data operations on the tables
const ItemManager = require("./models/ItemManager");
const RecipeIngredientManager = require("./models/RecipeIngredientManager");
const StepManager = require("./models/StepManager");
const UnitManager = require("./models/UnitManager");
const UserManager = require("./models/UserManager");
const UserTagsManager = require("./models/UserTagsManager");
const RecipeManager = require("./models/RecipeManager");
const IngredientManager = require("./models/IngredientManager");
const TagsManager = require("./models/TagsManager");
const RecipeTagsManager = require("./models/RecipeTagsManager");
const FavorisManager = require("./models/FavorisManager");
const CommentManager = require("./models/CommentManager");
const UserIngredientManager = require("./models/UserIngredientManager");
const CategoryManager = require("./models/CategoryManager");
const AvatarManager = require("./models/AvatarManager");

const managers = [
  ItemManager,
  RecipeIngredientManager,
  StepManager,
  UnitManager,
  UserManager,
  UserTagsManager,
  RecipeManager,
  IngredientManager,
  CategoryManager,
  TagsManager,
  RecipeTagsManager,
  FavorisManager,
  CommentManager,
  UserIngredientManager,
  AvatarManager,
];

// Create an empty object to hold data managers for different tables
const tables = {};

// Register each manager as data access point for its table
managers.forEach((ManagerClass) => {
  const manager = new ManagerClass();

  tables[manager.table] = manager;
});

/* ************************************************************************* */

// Use a Proxy to customize error messages when trying to access a non-existing table

// Export the Proxy instance with custom error handling
module.exports = new Proxy(tables, {
  get(obj, prop) {
    // Check if the property (table) exists in the tables object
    if (prop in obj) return obj[prop];

    // If the property (table) does not exist, throw a ReferenceError with a custom error message
    throw new ReferenceError(
      `tables.${prop} is not defined. Did you register it in ${__filename}?`
    );
  },
});

const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemControllers module for handling item-related operations
const itemControllers = require("./controllers/itemControllers");
const recipeControllers = require("./controllers/recipeControllers");
const tagsControllers = require("./controllers/tagsControllers");
const ingredientControllers = require("./controllers/ingredientControllers");

const authControllers = require("./controllers/authControllers");
const unitsControllers = require("./controllers/unitsControllers");
const stepControllers = require("./controllers/stepControllers");

const userIngredientsControllers = require("./controllers/userIngredientsControllers");
const userTagsControllers = require("./controllers/userTagsControllers");

const userControllers = require("./controllers/userControllers");

const commentControllers = require("./controllers/commentControllers");
// Route to get a list of items
router.get("/items", itemControllers.browse);
router.get("/recipe", recipeControllers.browse);
router.get("/recipe/:id", recipeControllers.read);
router.get("/step/:id", stepControllers.readSteps);
router.get("/tags", tagsControllers.browse);
router.get("/tags/recipe/:id", tagsControllers.readTagsByRecipeId);
router.get("/ingredient", ingredientControllers.browse);
router.get("/ingredients/:id", ingredientControllers.readIngredientsByRecipeId);
router.get("/unit", unitsControllers.browse);
router.get("/usertags/:id", userTagsControllers.browse);
router.get("/comments/recipe/:id", commentControllers.readCommentsByRecipeId);

// Route to get a specific item by ID
router.get("/items/:id", itemControllers.read);

// Route to add a new item
router.post("/items", itemControllers.add);
router.post("/recipe", recipeControllers.add);
router.post("/user", userControllers.add);
router.post("/comment", commentControllers.add);
router.post("/useringredients", userIngredientsControllers.add);
router.post("/usertags", userTagsControllers.add);

// Route to authentification

router.post("/login", authControllers.login);

/* ************************************************************************* */

module.exports = router;

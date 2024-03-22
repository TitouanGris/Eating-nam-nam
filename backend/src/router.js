const express = require("express");

const router = express.Router();

const path = require("path");

const { v4 } = require("uuid"); // todo : npm install nécéssclé aléatoire complexe (npm install nécéssaire)aire ?

const multer = require("multer"); // multer va permettre la gestion des images (npm install nécéssaire)
const { hashPassword, verifyToken } = require("./services/auth");
// Configuration de notre multer avec les otpions de destinations et de taille
// cb fonctionne comme next, il fait les choses les unes apres les autres
const options = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "/../public/images/avatar/"));
  },

  filename: (req, file, cb) => {
    const name = `${v4()}-${file.originalname}`;
    // on modifie le body en lui rajouant un nom ici url
    req.body.url = name;
    cb(null, name);
  },
  limits: {
    fieldSize: 1024 * 5,
  },
});

// on passe les option définis plus haut au multer
const uploadAvatar = multer({
  storage: options,
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/");
  },
  filename: (req, file, cb) => {
    const name = `${v4()}-${file.originalname}`;
    req.body.url = name;
    cb(null, name);
  },
});

const uploadRecipePic = multer({ storage });

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
const userControllers = require("./controllers/userControllers");

const userIngredientsControllers = require("./controllers/userIngredientsControllers");
const userTagsControllers = require("./controllers/userTagsControllers");
const favorisControllers = require("./controllers/favorisControllers");

const commentControllers = require("./controllers/commentControllers");

const avatarControllers = require("./controllers/avatarControllers");

// Route to get a list of items
router.get("/items", itemControllers.browse);
router.get("/users", userControllers.browse);
router.get("/recipe", recipeControllers.browse);
router.get("/tags", tagsControllers.browse);
router.get("/ingredient", ingredientControllers.browse);
router.get("/unit", unitsControllers.browse);
router.get("/avatar", avatarControllers.browse);
router.get("/adminRecipe", recipeControllers.adminBrowse);

// Route to get a specific item by ID
router.get("/usertags/:id", userTagsControllers.browse);
router.get("/comments/recipe/:id", commentControllers.readCommentsByRecipeId);
router.get("/favoris/:id", favorisControllers.browse);
router.get("/usertags/:id", userTagsControllers.browse);
router.get("/items/:id", itemControllers.read);
// router.get("/user/:id", userControllers.read);
router.get("/recipe/:id", recipeControllers.read);
router.get("/step/:id", stepControllers.readSteps);
router.get("/recipes/user/:id", recipeControllers.readUserRecipe);
router.get("/ingredients/:id", ingredientControllers.readIngredientsByRecipeId);
router.get("/tags/recipe/:id", tagsControllers.readTagsByRecipeId);

// Route to add a new item
router.post("/items", itemControllers.add);
router.post("/recipe", uploadRecipePic.single("image"), recipeControllers.add);
router.post("/user", hashPassword, userControllers.add);
router.post("/comment", commentControllers.add);
router.post("/useringredients", userIngredientsControllers.add);
router.post("/usertags", userTagsControllers.add);
router.post("/favoris", favorisControllers.add);

// Route to delette a favoris
router.put("/favoris", favorisControllers.destroy);

// Route to authentification
router.post("/login", authControllers.login);

// Route to delete item
router.delete("/user/:id", userControllers.destroy);
router.delete("/usertags", userTagsControllers.destroy);
router.delete("/recipe/:id", recipeControllers.destroy);

// Route to modify item
router.put("/user/:id", userControllers.update);
// router.put("/user/:id", userControllers.edit);
router.put("/usertags", userTagsControllers.update);
router.put("/recipe/:id/validate", recipeControllers.validateRecipe);

/* ************************************************************************* */
// router.use(verifyToken);

// Route to upload a single image
// /!\ le middleware upload.single est lié à l'utilisation de multer (voir en haut de ce fichier)
router.post(
  "/avatar",
  verifyToken,
  uploadAvatar.single("image"),
  avatarControllers.add
);
router.get("/userbytoken", verifyToken, userControllers.getbytoken);
router.post("/ingredients", verifyToken, ingredientControllers.add);

module.exports = router;

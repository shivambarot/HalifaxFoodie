const router = require('express').Router();
const RecipeController = require('../controllers/recipe.controller');

router.post('/uploadRecipe', RecipeController.uploadRecipe);
router.get('/getRecipeByRestaurant/:restCode', RecipeController.getRecipeByRestaurant);
router.post('/saveRecipe', RecipeController.saveRecipe);

module.exports = router;
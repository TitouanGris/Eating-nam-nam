import { useLoaderData } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";

function RecipeDetails() {
  const recipe = useLoaderData();

  return (
    <div>
      <RecipeCard r={recipe} />

      <p>{recipe.summary}</p>
    </div>
  );
}

export const loadRecipeDetails = async ({ params }) => {
  try {
    const recipeDetails = await fetch(
      `http://localhost:3310/api/recipe/" + ${params.id}`
    );
    const data = await recipeDetails.json();
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export default RecipeDetails;

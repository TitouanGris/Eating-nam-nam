import { useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";

function RecipeDetails() {
  const recipe = useLoaderData();
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3310/api/step/1")
      .then((res) => res.json())
      .then((data) => setSteps(data));
  }, []);

  return (
    <div>
      <RecipeCard r={recipe} key={recipe.id} />
      <p>{recipe.summary}</p>
      <div>
        {steps.map((step) => {
          return <p>{step.description}</p>;
        })}
      </div>
    </div>
  );
}

export const loadRecipeDetails = async ({ params }) => {
  try {
    const recipeDetails = await fetch(
      `http://localhost:3310/api/recipe/${params.id}`
    );
    const data = await recipeDetails.json();

    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export default RecipeDetails;

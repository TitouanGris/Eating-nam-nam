
import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";

function RecipeBrowse() {
  const [recipe, setRecipe] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3310/api/recipe")
      .then((res) => res.json())
      .then((data) => setRecipe(data));
  }, []);

  return (
    <div className="recipeBrowse">
      {recipe.map((r) => {
        return <RecipeCard r={r} key={r.recipeId} />;
      })}
    </div>
  );
}


export default RecipeBrowse;

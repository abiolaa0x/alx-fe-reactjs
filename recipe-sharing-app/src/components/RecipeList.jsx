import useRecipeStore from "./recipeStore";
import { Link } from "react-router-dom";

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes);
  const filteredRecipes = useRecipeStore((state) => state.filteredRecipes);
  const searchTerm = useRecipeStore((state) => state.searchTerm);
  const addFavorite = useRecipeStore((state) => state.addFavorite);
  const removeFavorite = useRecipeStore((state) => state.removeFavorite);
  const favorites = useRecipeStore((state) => state.favorites);

  // Display filtered recipes if search term exists, otherwise show all recipes
  const displayRecipes = searchTerm ? filteredRecipes : recipes;

  const handleFavoriteToggle = (recipeId) => {
    if (favorites.includes(recipeId)) {
      removeFavorite(recipeId);
    } else {
      addFavorite(recipeId);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Recipes</h2>
      {displayRecipes.length === 0 ?
        <p>No recipes found. Add your first recipe!</p>
      : <div style={{ display: "grid", gap: "20px" }}>
          {displayRecipes.map((recipe) => (
            <div
              key={recipe.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "15px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
              <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
                <Link to={`/recipe/${recipe.id}`}>
                  <button>View Details</button>
                </Link>
                <button
                  onClick={() => handleFavoriteToggle(recipe.id)}
                  style={{
                    backgroundColor:
                      favorites.includes(recipe.id) ? "#ff6b6b" : "#51cf66",
                    color: "white",
                    border: "none",
                    padding: "8px 15px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  {favorites.includes(recipe.id) ?
                    "❤️ Unfavorite"
                  : "🤍 Favorite"}
                </button>
              </div>
            </div>
          ))}
        </div>
      }
    </div>
  );
};

export default RecipeList;

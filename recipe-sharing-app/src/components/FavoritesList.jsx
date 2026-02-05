import { Link } from "react-router-dom";
import useRecipeStore from "./recipeStore";

const FavoritesList = () => {
  const recipes = useRecipeStore((state) => state.recipes);
  const favoriteIds = useRecipeStore((state) => state.favorites);
  const removeFavorite = useRecipeStore((state) => state.removeFavorite);

  // Compute favorite recipes from the separate values
  const favorites = favoriteIds
    .map((id) => recipes.find((recipe) => recipe.id === id))
    .filter(Boolean);

  return (
    <div style={{ padding: "20px" }}>
      <h2>❤️ My Favorites</h2>
      {favorites.length === 0 ?
        <p>No favorite recipes yet. Start adding some!</p>
      : <div style={{ display: "grid", gap: "15px" }}>
          {favorites.map((recipe) => (
            <div
              key={recipe.id}
              style={{
                border: "2px solid #ff6b6b",
                borderRadius: "8px",
                padding: "15px",
                backgroundColor: "#fff5f5",
              }}
            >
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
              <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
                <Link to={`/recipe/${recipe.id}`}>
                  <button>View Details</button>
                </Link>
                <button
                  onClick={() => removeFavorite(recipe.id)}
                  style={{
                    backgroundColor: "#f44336",
                    color: "white",
                    border: "none",
                    padding: "8px 15px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Remove from Favorites
                </button>
              </div>
            </div>
          ))}
        </div>
      }
    </div>
  );
};

export default FavoritesList;

import { Link } from "react-router-dom";
import useRecipeStore from "./recipeStore";

const RecommendationsList = () => {
  const recommendations = useRecipeStore((state) => state.recommendations);
  const generateRecommendations = useRecipeStore(
    (state) => state.generateRecommendations,
  );
  const favorites = useRecipeStore((state) => state.favorites);

  // Generate recommendations when button is clicked
  const handleGenerateRecommendations = () => {
    generateRecommendations();
  };

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#e3f2fd",
        borderRadius: "8px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "15px",
        }}
      >
        <h2>🌟 Recommended for You</h2>
        {favorites.length > 0 && (
          <button
            onClick={handleGenerateRecommendations}
            style={{
              padding: "8px 15px",
              backgroundColor: "#2196F3",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Refresh Recommendations
          </button>
        )}
      </div>
      {favorites.length === 0 ?
        <p>Add some favorites to get personalized recommendations!</p>
      : recommendations.length === 0 ?
        <div>
          <p>
            Click "Refresh Recommendations" to see personalized recipe
            suggestions!
          </p>
        </div>
      : <div style={{ display: "grid", gap: "15px" }}>
          {recommendations.map((recipe) => (
            <div
              key={recipe.id}
              style={{
                border: "1px solid #2196F3",
                borderRadius: "8px",
                padding: "15px",
                backgroundColor: "white",
              }}
            >
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
              <Link to={`/recipe/${recipe.id}`}>
                <button
                  style={{
                    marginTop: "10px",
                    padding: "8px 15px",
                    backgroundColor: "#2196F3",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  View Recipe
                </button>
              </Link>
            </div>
          ))}
        </div>
      }
    </div>
  );
};

export default RecommendationsList;

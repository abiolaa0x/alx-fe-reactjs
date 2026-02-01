import { useParams, useNavigate } from "react-router-dom";
import useRecipeStore from "./recipeStore";
import EditRecipeForm from "./EditRecipeForm";
import DeleteRecipeButton from "./DeleteRecipeButton";

const RecipeDetails = () => {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const recipe = useRecipeStore((state) =>
    state.recipes.find((recipe) => recipe.id === parseInt(recipeId)),
  );

  if (!recipe) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Recipe not found</h2>
        <button onClick={() => navigate("/")}>Back to Recipes</button>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <button onClick={() => navigate("/")} style={{ marginBottom: "20px" }}>
        ← Back to All Recipes
      </button>
      <div
        style={{
          border: "2px solid #ddd",
          borderRadius: "10px",
          padding: "30px",
          backgroundColor: "#fff",
        }}
      >
        <h1>{recipe.title}</h1>
        <p style={{ fontSize: "18px", lineHeight: "1.6", marginTop: "20px" }}>
          {recipe.description}
        </p>
        <div style={{ marginTop: "30px" }}>
          <h3>Edit or Delete This Recipe</h3>
          <EditRecipeForm recipe={recipe} />
          <DeleteRecipeButton recipeId={recipe.id} />
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;

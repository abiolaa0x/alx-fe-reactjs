import { useState } from "react";
import useRecipeStore from "./recipeStore";

const EditRecipeForm = ({ recipe }) => {
  const updateRecipe = useRecipeStore((state) => state.updateRecipe);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(recipe.title);
  const [description, setDescription] = useState(recipe.description);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (title.trim() && description.trim()) {
      updateRecipe({ ...recipe, title, description });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setTitle(recipe.title);
    setDescription(recipe.description);
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <button
        onClick={() => setIsEditing(true)}
        style={{
          padding: "10px 20px",
          backgroundColor: "#2196F3",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "10px",
        }}
      >
        Edit Recipe
      </button>
    );
  }

  return (
    <div
      style={{
        marginTop: "20px",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
      }}
    >
      <h3>Edit Recipe</h3>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Recipe Title"
          required
          style={{
            padding: "10px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Recipe Description"
          required
          rows="4"
          style={{
            padding: "10px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={handleCancel}
            style={{
              padding: "10px 20px",
              backgroundColor: "#757575",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRecipeForm;

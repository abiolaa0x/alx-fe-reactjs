import { useState } from "react";
import useRecipeStore from "./recipeStore";

const AddRecipeForm = () => {
  const addRecipe = useRecipeStore((state) => state.addRecipe);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (title.trim() && description.trim()) {
      addRecipe({ id: Date.now(), title, description });
      setTitle("");
      setDescription("");
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f0f0f0",
        borderRadius: "8px",
      }}
    >
      <h2>Add New Recipe</h2>
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
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Add Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipeForm;

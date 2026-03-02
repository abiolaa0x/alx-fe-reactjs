import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AddRecipeForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    ingredients: "",
    instructions: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = "Recipe title is required.";
    }
    if (!formData.ingredients.trim()) {
      newErrors.ingredients = "Ingredients are required.";
    } else {
      const lines = formData.ingredients
        .split("\n")
        .filter((l) => l.trim() !== "");
      if (lines.length < 2) {
        newErrors.ingredients = "Please include at least two ingredients.";
      }
    }
    if (!formData.instructions.trim()) {
      newErrors.instructions = "Preparation steps are required.";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-md p-10 text-center max-w-md w-full">
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Recipe Submitted!
          </h2>
          <p className="text-gray-500 mb-6">
            Your recipe has been added successfully.
          </p>
          <Link
            to="/"
            className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors font-medium"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-6 flex justify-between items-center">
          <Link
            to="/"
            className="text-orange-500 font-bold text-xl hover:text-orange-600"
          >
            🍴 RecipeShare
          </Link>
          <Link
            to="/"
            className="text-gray-500 hover:text-orange-500 transition-colors"
          >
            ← Back to Recipes
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow-md p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Add a New Recipe
          </h1>
          <p className="text-gray-500 mb-8">
            Share your favorite recipe with the community.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="title"
              >
                Recipe Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Creamy Mushroom Pasta"
                className={`w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-400 transition ${
                  errors.title ? "border-red-400 bg-red-50" : "border-gray-300"
                }`}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            {/* Ingredients */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="ingredients"
              >
                Ingredients <span className="text-red-500">*</span>
                <span className="text-gray-400 font-normal ml-2">
                  (one per line, minimum 2)
                </span>
              </label>
              <textarea
                id="ingredients"
                name="ingredients"
                value={formData.ingredients}
                onChange={handleChange}
                rows={5}
                placeholder={"200g spaghetti\n100g bacon\n2 eggs\n50g parmesan"}
                className={`w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-400 transition resize-none ${
                  errors.ingredients ?
                    "border-red-400 bg-red-50"
                  : "border-gray-300"
                }`}
              />
              {errors.ingredients && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.ingredients}
                </p>
              )}
            </div>

            {/* Instructions */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="instructions"
              >
                Preparation Steps <span className="text-red-500">*</span>
              </label>
              <textarea
                id="instructions"
                name="instructions"
                value={formData.instructions}
                onChange={handleChange}
                rows={6}
                placeholder="Describe each step of the preparation process..."
                className={`w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-400 transition resize-none ${
                  errors.instructions ?
                    "border-red-400 bg-red-50"
                  : "border-gray-300"
                }`}
              />
              {errors.instructions && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.instructions}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 active:scale-95 transition-all duration-150"
            >
              Submit Recipe
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default AddRecipeForm;

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import recipeData from '../data.json';

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const found = recipeData.find((r) => r.id === parseInt(id));
    setRecipe(found || null);
  }, [id]);

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <p className="text-gray-500 text-lg mb-4">Recipe not found.</p>
        <Link to="/" className="text-orange-500 hover:underline">← Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6 flex justify-between items-center">
          <Link to="/" className="text-orange-500 font-bold text-xl hover:text-orange-600">
            🍴 RecipeShare
          </Link>
          <Link to="/" className="text-gray-500 hover:text-orange-500 transition-colors">
            ← Back to Recipes
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-10">
        {/* Recipe Header */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-8">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-64 object-cover bg-orange-100"
          />
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-3">{recipe.title}</h1>
            <p className="text-gray-500 text-lg">{recipe.summary}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Ingredients */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              🥕 Ingredients
            </h2>
            <ul className="space-y-2">
              {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-600">
                  <span className="text-orange-400 font-bold mt-0.5">•</span>
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              📋 Instructions
            </h2>
            <ol className="space-y-4">
              {recipe.instructions && recipe.instructions.map((step, index) => (
                <li key={index} className="flex gap-3 text-gray-600">
                  <span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <p>{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </main>
    </div>
  );
}

export default RecipeDetail;

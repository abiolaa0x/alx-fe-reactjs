import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import recipeData from '../data.json';

function HomePage() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    setRecipes(recipeData);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-orange-500">🍴 RecipeShare</h1>
          <Link
            to="/add-recipe"
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors font-medium"
          >
            + Add Recipe
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-orange-500 text-white py-16 px-4 text-center">
        <h2 className="text-4xl font-bold mb-3">Discover Delicious Recipes</h2>
        <p className="text-orange-100 text-lg max-w-xl mx-auto">
          Browse, share, and create recipes from around the world. Find your next favorite meal today.
        </p>
      </section>

      {/* Recipe Grid */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <h3 className="text-2xl font-semibold text-gray-800 mb-8">All Recipes</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {recipes.map((recipe) => (
            <Link key={recipe.id} to={`/recipe/${recipe.id}`} className="group">
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-40 object-cover bg-orange-100"
                />
                <div className="p-4">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-orange-500 transition-colors">
                    {recipe.title}
                  </h4>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                    {recipe.summary}
                  </p>
                  <span className="inline-block mt-3 text-orange-500 text-sm font-medium group-hover:underline">
                    View Recipe →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

export default HomePage;

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RecipeList from "./components/RecipeList";
import AddRecipeForm from "./components/AddRecipeForm";
import RecipeDetails from "./components/RecipeDetails";
import SearchBar from "./components/SearchBar";
import FavoritesList from "./components/FavoritesList";
import RecommendationsList from "./components/RecommendationsList";

function App() {
  return (
    <Router>
      <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
        {/* Header/Navigation */}\
        <header
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "20px",
            marginBottom: "20px",
          }}
        >
          <h1 style={{ margin: 0 }}>recipe sharing application 🍳</h1>
          <nav style={{ marginTop: "15px" }}>
            <Link
              to="/"
              style={{
                color: "white",
                textDecoration: "none",
                marginRight: "20px",
                fontSize: "18px",
              }}
            >
              Home
            </Link>
            <Link
              to="/favorites"
              style={{
                color: "white",
                textDecoration: "none",
                marginRight: "20px",
                fontSize: "18px",
              }}
            >
              Favorites
            </Link>
          </nav>
        </header>

        {/* Main Content */}
        <div
          style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}
        >
          <Routes>
            {/* Home Page */}
            <Route
              path="/"
              element={
                <>
                  <AddRecipeForm />
                  <SearchBar />
                  <RecommendationsList />
                  <RecipeList />
                </>
              }
            />

            {/* Recipe Details Page */}
            <Route path="/recipe/:recipeId" element={<RecipeDetails />} />

            {/* Favorites Page */}
            <Route path="/favorites" element={<FavoritesList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

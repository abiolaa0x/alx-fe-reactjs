import useRecipeStore from "./recipeStore";

const SearchBar = () => {
  const setSearchTerm = useRecipeStore((state) => state.setSearchTerm);
  const filterRecipes = useRecipeStore((state) => state.filterRecipes);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    // Call filterRecipes immediately after setting search term
    setTimeout(() => filterRecipes(), 0);
  };

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: "8px",
        marginBottom: "20px",
      }}
    >
      <input
        type="text"
        placeholder="Search recipes..."
        onChange={handleSearchChange}
        style={{
          width: "100%",
          padding: "12px",
          fontSize: "16px",
          borderRadius: "5px",
          border: "2px solid #4CAF50",
          boxSizing: "border-box",
        }}
      />
    </div>
  );
};

export default SearchBar;

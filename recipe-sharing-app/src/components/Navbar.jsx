import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>🍲 Recipe Sharing App</h1>
      <div>
        <Link to="/">Home</Link>
        <Link to="/favorites">Favorites</Link>
        <Link to="/recommendations">Recommendations</Link>
      </div>
    </nav>
  );
};

export default Navbar;

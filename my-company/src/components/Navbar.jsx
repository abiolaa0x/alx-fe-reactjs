import { Link } from "react-router-dom";

function Navbar() {
    return ( 
        <nav>
            <li>
                <Link to = "/">
                Home
                </Link>
            </li>
            <li>
                <Link to = "/about">
            About
                </Link>
            </li>
            <li>
                <Link to = "/services">
                Our Services
                </Link>
            </li>
            <li>
                <Link to = "/contact">
                Contact Us
                </Link>
            </li>
        </nav>
     );
}

export default Navbar;
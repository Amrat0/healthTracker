import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav className="nav-container">
      <Link to="/dashboard" as={Link}>
        Admin
      </Link>
      <Link to="/inputData" as={Link}>
       Track
      </Link>
    </nav>
  );
}

export default Nav;

import { useState } from "react";
import { Link } from "react-router-dom";
import { MessageSquareHeart, Music, Home } from "lucide-react";

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <nav className="navbar is-primary">
      <div className="navbar-brand">
        <Link className="navbar-item is-flex is-align-items-center" to="/">
          <MessageSquareHeart size={25} className="mr-2 has-text-warning" />
        </Link>
        <button
          className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
          aria-label="menu"
          aria-expanded={isActive}
          onClick={() => setIsActive(!isActive)}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>
      </div>

      <div className={`navbar-menu ${isActive ? "is-active" : ""}`}>
        <div className="navbar-end">
          <Link className="navbar-item is-flex is-align-items-center is-gapless" to="/">
            <Home size={16} className="me-1 mr-1" />Home
          </Link>
          <Link className="navbar-item is-flex is-align-items-center is-gapless" to="/music">
            <Music size={16} className="me-1 mr-1" />Music
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div style={{ position: "fixed", width: 2000 }}>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="apt">
          Apt
        </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="home">
                Home
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="flat">
                Flats
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="People">
                People
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="maintenenceInfo">
                Maintenence Info
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
export default NavBar;

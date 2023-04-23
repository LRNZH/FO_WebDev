import React from "react";
import "./Header.css";

function Header() {
  return (
    <header className="Header">
      <div className="container">
        <div className="row">
          <div className="col">
            <h1>Kepler Clean Energy</h1>
            <h2>
              We help businesses & households access clean & cost-effective
              electricity/energy in Africa.
            </h2>
          </div>
          <div className="col">
            <nav>
              <ul>
                <li>
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#">Services</a>
                </li>
                <li>
                  <a href="#">About</a>
                </li>
                <li>
                  <a href="#">Contact</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

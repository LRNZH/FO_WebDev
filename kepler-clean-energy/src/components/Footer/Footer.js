import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="Footer">
      <div className="container">
        <div className="row">
          <div className="col">
            <p>&copy; Kepler Clean Energy & Sustainability Solutions Ltd</p>
          </div>
          <div className="col">
            <nav>
              <ul>
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
                <li>
                  <a href="#">Terms of Use</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

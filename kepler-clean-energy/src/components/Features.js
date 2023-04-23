import React from "react";
import "./Features.css";

function Features() {
  return (
    <section className="Features">
      <div className="container">
        <div className="row">
          <div className="col">
            <h3>Off-grid solutions</h3>
            <p>
              We provide off-grid solar energy solutions that enable households
              and businesses to generate their own electricity and reduce their
              dependence on fossil fuels.
            </p>
          </div>
          <div className="col">
            <h3>Mini-grid solutions</h3>
            <p>
              We offer mini-grid solutions that can supply power to entire
              communities, even in remote areas, using renewable energy sources
              such as solar and wind.
            </p>
          </div>
          <div className="col">
            <h3>Grid solutions</h3>
            <p>
              We work with utilities and governments to develop and implement
              grid-connected renewable energy projects that help reduce carbon
              emissions and improve energy security.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;

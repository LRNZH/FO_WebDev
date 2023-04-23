import React from "react";
import "./ImageSection.css";

function ImageSection(props) {
  return (
    <div className="ImageSection">
      <img src={props.src} alt={props.alt} />
      <h2>{props.title}</h2>
      <p>{props.text}</p>
    </div>
  );
}

export default ImageSection;

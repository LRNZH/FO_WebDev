import ReactDOM from "react-dom/client";
import axios from "axios";
import App from "./App";
import "./index.css";

axios.get("http://localhost:5000/notes").then((response) => {
  const notes = response.data;
  ReactDOM.createRoot(document.getElementById("root")).render(
    <App notes={notes} />
  );
});

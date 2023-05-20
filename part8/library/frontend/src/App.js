import React, { useState, useEffect } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import Recommend from "./components/Recommend";
import { BrowserRouter as Router } from "react-router-dom";
import Registration from "./components/Registration";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const [favoriteGenre, setFavoriteGenre] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState("");

useEffect(() => {
  setToken(localStorage.getItem("library-user-token"));
  setFavoriteGenre(localStorage.getItem("favorite-genre"));
}, [setToken]);

  const displayNotification = (message, duration = 4000, type = "default") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification("");
    }, duration);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("library-user-token");
    setPage("authors");
    setUsername("");
    setPassword("");
    setFavoriteGenre("");
  };

const handleLogin = (token, favoriteGenre) => {
  setToken(token);
  localStorage.setItem("library-user-token", token);
  localStorage.setItem("favorite-genre", favoriteGenre);
  setFavoriteGenre(favoriteGenre);
  setPage("recommend");
};

  const renderNavigation = () => {
    if (!token) {
      return (
        <div>
          <button onClick={() => setPage("authors")}>authors</button>
          <button onClick={() => setPage("all books")}>all books</button>
          <button onClick={() => setPage("login")}>login</button>
          <button onClick={() => setPage("new user")}>new user?</button>
        </div>
      );
    }

    return (
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("all books")}>all books</button>
        {token && (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommend")}>recommended books</button>
            <button onClick={handleLogout}>logout</button>
          </>
        )}
      </div>
    );
  };

  const renderPage = () => {
    
    if (page === "authors") {
      return (
        <Authors
          show={page === "authors"}
          token={token}
          displayNotification={displayNotification}
        />
      );
    } else if (page === "all books") {
      return (
        <Books
          show={page === "all books"}
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
          token={token}
          displayNotification={displayNotification}
        />
      );
    } else if (page === "recommend" && token) {
      return <Recommend favoriteGenre={favoriteGenre} />;
    } else if (page === "login" && !token) {
      return (
        <Login
          handleLogin={handleLogin}
          displayNotification={displayNotification}
          setFavoriteGenre={setFavoriteGenre}
        />
      );
    } else if (page === "new user" && !token) {
      return (
        <Registration
          handleLogin={handleLogin}
          displayNotification={displayNotification}
          setPage={setPage}
        />
      );
    } else if (page === "add" && token) {
      return (
        <NewBook
          show={page === "add"}
          token={token}
          displayNotification={displayNotification}
        />
      );
    }

    return null;
  };

  const getNotificationStyle = (type) => {
    let style = {
      borderRadius: "5px",
      padding: "10px",
      marginTop: "10px",
      fontWeight: "bold",
      animation: "blink 1s infinite",
    };

    if (type === "error") {
      style.border = "2px solid red";
    } else if (type === "success") {
      style.border = "2px solid green";
    } else if (type === "welcome") {
      style.border = "2px solid blue";
    } else {
      style.border = "2px solid black";
    }

    return style;
  };

  return (
    <Router>
      <div>
        {renderNavigation()}
        {notification && (
          <p style={getNotificationStyle(notification.type)}>
            {notification.message}
          </p>
        )}
        {renderPage()}
      </div>
    </Router>
  );
};

export default App;

import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { LOGIN, GET_GENRES } from "../queries";

const Login = ({ handleLogin, displayNotification }) => {
  const [username, setUsername] = useState("lorenzo");
  const [password, setPassword] = useState("your_password");
  const [favoriteGenre, setFavoriteGenre] = useState("");
  const [showGenreDropdown, setShowGenreDropdown] = useState(false);

  const [login] = useMutation(LOGIN);
  const { loading: genresLoading, data: genresData } = useQuery(GET_GENRES);

  const handleGenreSelection = (genre) => {
    setFavoriteGenre(genre);
    setShowGenreDropdown(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await login({
        variables: { username, password, favoriteGenre },
      });

      const { value, user } = result.data.login;

      if (user.favoriteGenre) {
        handleLogin(value, user.favoriteGenre);
        setUsername("");
        setPassword("");
        displayNotification("Welcome back!");
      } else {
        displayNotification("Invalid genre selection");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="favoriteGenre"></label>
          {genresLoading ? (
            <p>Loading genres...</p>
          ) : (
            <div>
              <button
                type="button"
                onClick={() => setShowGenreDropdown(!showGenreDropdown)}
              >
                {favoriteGenre || "Update Favorite Genre (optional"}
              </button>
              {showGenreDropdown && (
                <div>
                  {genresData &&
                    genresData.allGenres.map((genre) => (
                      <button
                        key={genre}
                        type="button"
                        onClick={() => handleGenreSelection(genre)}
                      >
                        {genre}
                      </button>
                    ))}
                </div>
              )}
            </div>
          )}
        </div>
        <p></p>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

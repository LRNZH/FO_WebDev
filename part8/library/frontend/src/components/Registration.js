import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { REGISTER_USER, GET_GENRES } from "../queries";

const Registration = ({ handleLogin, setPage, displayNotification }) => {
  const [username, setUsername] = useState("");
  const [favoriteGenre, setFavoriteGenre] = useState("");
  const [password, setPassword] = useState("");
  const { loading: genresLoading, data: genresData } = useQuery(GET_GENRES);

  const [registerUser] = useMutation(REGISTER_USER);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await registerUser({
        variables: { username, favoriteGenre, password },
      });

      const token = data.createUser.value;
      handleLogin(token, favoriteGenre);
      setPage("authors");
      displayNotification(`Welcome to the library app, ${username}`);
    } catch (error) {
      console.error(error);
      displayNotification("Problem creating user profile");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Username:
          <input
            type="text"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Favorite Genre:
          {genresLoading ? (
            <p>Loading genres...</p>
          ) : (
            <select
              value={favoriteGenre}
              onChange={(e) => setFavoriteGenre(e.target.value)}
            >
              <option value="">Select a genre</option>
              {genresData &&
                genresData.allGenres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
            </select>
          )}
        </label>
      </div>
      <div>
        <label>
          Password:
          <input
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default Registration;

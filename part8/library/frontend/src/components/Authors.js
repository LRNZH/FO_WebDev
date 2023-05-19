import { GET_AUTHORS, UPDATE_AUTHOR, GET_BOOKS } from "../queries";
import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";

const Authors = ({ show, token, displayNotification }) => {
  const { loading, error, data } = useQuery(GET_AUTHORS);

  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const handleNameChange = ({ target }) => {
    setName(target.value);
  };

  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    refetchQueries: [{ query: GET_AUTHORS }, { query: GET_BOOKS }],
    onCompleted: () => {
      displayNotification("Author updated successfully.");
    },
  });

  const birthYearSubmit = (event) => {
    event.preventDefault();

    updateAuthor({
      variables: { name, born },
    })
      .then(() => {
        setName("");
        setBorn("");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  if (!show) {
    return null;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const authors = data.allAuthors;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {token && <h2>Set birthyear</h2>}
      {token && (
        <form onSubmit={birthYearSubmit}>
          <div>
            name
            <select value={name} onChange={handleNameChange}>
              {authors.map((a) => (
                <option key={a.name} value={a.name}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            born
            <input
              type="number"
              value={born}
              onChange={({ target }) => setBorn(parseInt(target.value))}
            />
          </div>
          <button type="submit">update author</button>
        </form>
      )}
    </div>
  );
};

export default Authors;

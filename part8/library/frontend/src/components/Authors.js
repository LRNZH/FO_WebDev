/* /components/Author.js */
import { GET_AUTHORS, UPDATE_AUTHOR, GET_BOOKS, BOOK_ADDED } from "../queries";
import { useState, useEffect } from "react";
import { useQuery, useMutation, useSubscription } from "@apollo/client";

const Authors = ({ show, token, displayNotification }) => {
  const { loading, error, data } = useQuery(GET_AUTHORS);
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    if (data && data.allAuthors) {
      setAuthors(data.allAuthors);
    }
  }, [data]);

  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const handleNameChange = ({ target }) => {
    setName(target.value);
  };

  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: GET_AUTHORS }, { query: GET_BOOKS }],
    onCompleted: () => {
      displayNotification("Author updated successfully.");
    },
  });

  const { data: bookAddedData } = useSubscription(BOOK_ADDED);

  useEffect(() => {
    if (bookAddedData && bookAddedData.bookAdded) {
      const { bookAdded } = bookAddedData;
      setAuthors((prevAuthors) => {
        const updatedAuthors = prevAuthors.map((author) => {
          if (author.name === bookAdded.author.name) {
            return {
              ...author,
              bookCount: author.bookCount + 1,
            };
          }
          return author;
        });

        return updatedAuthors;
      });
    }
  }, [bookAddedData]);

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

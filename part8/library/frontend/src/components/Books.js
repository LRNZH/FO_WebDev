import { useState } from "react";
import { GET_BOOKS, BOOK_ADDED } from "../queries";
import { useQuery, useSubscription } from "@apollo/client";

const Books = (props) => {
  const { loading, error, data } = useQuery(GET_BOOKS);
  const [selectedGenre, setSelectedGenre] = useState("");

  const { data: subscriptionData } = useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ client, subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded;
      const dataInStore = client.readQuery({ query: GET_BOOKS });

      client.writeQuery({
        query: GET_BOOKS,
        data: {
          allBooks: [...dataInStore.allBooks, addedBook],
        },
      });
      client.query({ query: GET_BOOKS });
    },
  });

  if (!props.show) {
    return null;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const books = data.allBooks;

  const genres = [...new Set(books.flatMap((book) => book.genres))];

  const handleGenreFilter = (genre) => {
    setSelectedGenre(genre);
  };

  const filteredBooks = selectedGenre
    ? books.filter((book) => book.genres.includes(selectedGenre))
    : books;

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>
                {book.author.name}{" "}
                {book.author.born && `(born ${book.author.born})`}
              </td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p></p>
      {props.token && (
        <div>
          {genres.map((genre) => (
            <button key={genre} onClick={() => handleGenreFilter(genre)}>
              {genre}
            </button>
          ))}
          <button onClick={() => setSelectedGenre("")}>All genres</button>
        </div>
      )}
    </div>
  );
};

export default Books;

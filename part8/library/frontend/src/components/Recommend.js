import React from "react";
import { GET_BOOKS } from "../queries";
import { useQuery } from "@apollo/client";

const Recommend = ({ favoriteGenre }) => {
const { loading, error, data } = useQuery(GET_BOOKS, {
  variables: { genre: favoriteGenre },
});
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const books = data.allBooks;
  const filteredBooks = books.filter((book) =>
    book.genres.includes(favoriteGenre)
  );

  return (
    <div>
      <h2>Recommendations</h2>
      <p>
        books in your favorite genre: <strong>{favoriteGenre}</strong>
      </p>
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
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommend;

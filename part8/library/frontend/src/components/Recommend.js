import React from "react";
import { useQuery, useSubscription } from "@apollo/client";
import { GET_BOOKS, BOOK_ADDED } from "../queries";

const Recommend = ({ favoriteGenre }) => {
  const { loading, error, data } = useQuery(GET_BOOKS);

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
    },
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
        Books in your favorite genre: <strong>{favoriteGenre}</strong>
      </p>
      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
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

import { useState } from "react";
import { useMutation } from "@apollo/client";
import { GET_BOOKS, GET_AUTHORS, ADD_BOOK } from "../queries";

const NewBook = ({ show, token, displayNotification }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const [AddBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }, { query: GET_AUTHORS }],
    update: (store, response) => {
      const dataInStore = store.readQuery({ query: GET_BOOKS });
      store.writeQuery({
        query: GET_BOOKS,
        data: {
          allBooks: [...dataInStore.allBooks, response.data.addBook],
        },
      });
    },
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    onCompleted: () => {
      displayNotification("Book created successfully.");
    },
  });

  const submit = async (event) => {
    event.preventDefault();

    await AddBook({ variables: { title, author, published: parseInt(published), genres } });

    setTitle("");
    setPublished("");
    setAuthor("");
    setGenres([]);
    setGenre("");
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  if (!show) {
    return null;
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;

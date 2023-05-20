import { useState } from "react";
import { useMutation } from "@apollo/client";
import { GET_AUTHORS, ADD_BOOK } from "../queries";

const NewBook = ({ show, displayNotification }) => {
  const [title, setTitle] = useState("Crazy Book");
  const [author, setAuthor] = useState("John Ingram");
  const [published, setPublished] = useState("2021");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState(["political activism", "activism"]);

  const [addBook] = useMutation(ADD_BOOK, {
    update: (cache, { data: { addBook } }) => {
      const { allAuthors } = cache.readQuery({ query: GET_AUTHORS });
      const authorIndex = allAuthors.findIndex(
        (a) => a.name === addBook.author.name
      );
      if (authorIndex !== -1) {
        const updatedAuthor = { ...allAuthors[authorIndex] };
        updatedAuthor.bookCount += 1;
        const updatedAuthors = [...allAuthors];
        updatedAuthors.splice(authorIndex, 1, updatedAuthor);
        cache.writeQuery({
          query: GET_AUTHORS,
          data: { allAuthors: updatedAuthors },
        });
      }
    },
    onCompleted: () => {
      displayNotification("Book created successfully.");
    },
  });

  const submit = async (event) => {
    event.preventDefault();

    await addBook({
      variables: { title, author, published: parseInt(published), genres },
    });

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

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");

const resolvers = {
  Query: {
    bookCount: () => async () => Book.collection.countDocuments(),
    authorCount: () => async () => Author.collection.countDocuments(),
    allAuthors: async () => {
      const authors = await Author.find({});
      const authorsWithCount = [];

      for (const author of authors) {
        const bookCount = await Book.countDocuments({ author: author._id });
        authorsWithCount.push({ ...author.toObject(), bookCount });
      }

      return authorsWithCount.map((author) => ({
        ...author,
        bookCount: author.bookCount || 0,
      }));
    },
    allBooks: async (root, args) => {
      const { author, genre } = args;
      let filters = {};

      if (author) {
        filters.author = author;
      }

      if (genre) {
        filters.genres = genre;
      }

      const books = await Book.find(filters).populate("author");

      return books.map((book) => ({
        ...book.toObject(),
        id: book._id.toString(),
        author: {
          ...book.author.toObject(),
          id: book.author._id.toString(),
          bookCount: book.author.bookCount || 0,
        },
      }));
    },
    allGenres: async (parent, args, context) => {
      if (context.genres) {
        return context.genres;
      }

      const genres = await Book.distinct("genres").exec();
      context.genres = genres;
      return genres;
    },
    me: (root, args, context) => {
      const user = context.currentUser;
      if (!user) {
        throw new Error("Authentication required.");
      }
      return user;
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const { title, author, published, genres } = args;
      const user = context.currentUser;

      if (!user) {
        throw new Error("Authentication required.");
      }

      try {
        let existingAuthor = await Author.findOne({ name: author });

        if (!existingAuthor) {
          existingAuthor = new Author({ name: author });
          await existingAuthor.save();
        }

        const book = new Book({
          title,
          published,
          author: existingAuthor._id,
          genres,
        });

        const savedBook = await book.save();
        savedBook.author = existingAuthor;
        savedBook.author.bookCount = await Book.countDocuments({
          author: existingAuthor._id,
        });
        return savedBook;
      } catch (error) {
        throw new Error(
          "Failed to add book. Please check your input.",
          "ADD_BOOK_ERROR"
        );
      }
    },
    editAuthor: async (root, args, context) => {
      const { name, setBornTo } = args;
      const user = context.currentUser;

      if (!user) {
        throw new error("Authentication required.");
      }

      try {
        const author = await Author.findOne({ name });

        if (!author) {
          return null;
        }

        author.born = setBornTo;
        await author.save();

        return author;
      } catch (error) {
        throw new error(
          "Failed to update author born information. Please check your input.",
          "EDIT_AUTHOR_ERROR"
        );
      }
    },
    createUser: async (root, args) => {
      const { username, favoriteGenre, password } = args;
      const existingUser = await User.findOne({ username });

      if (existingUser) {
        throw new ApolloError(
          "Username is already taken.",
          "USERNAME_TAKEN_ERROR"
        );
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const user = new User({
        username,
        favoriteGenre,
        password: hashedPassword,
      });
      const savedUser = await user.save();
      const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET);

      return {
        username: savedUser.username,
        favoriteGenre: savedUser.favoriteGenre,
        id: savedUser._id,
        value: token,
      };
    },

    login: async (root, args) => {
      const { username, password, favoriteGenre } = args;

      const user = await User.findOne({ username });

      if (!user) {
        throw new ApolloError("Invalid username.", "INVALID_CREDENTIALS_ERROR");
      }

      const isValidPassword = await user.comparePassword(password);
      if (!isValidPassword) {
        throw new ApolloError("Invalid password.", "INVALID_CREDENTIALS_ERROR");
      }


      if (favoriteGenre) {
        user.favoriteGenre = favoriteGenre;
        await user.save();
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

      return {
        value: token,
        user,
      };
    },
  },
};

module.exports = resolvers;

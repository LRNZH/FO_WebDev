const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { ApolloError } = require("apollo-server-errors");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
require("dotenv").config();
const jwt = require("jsonwebtoken");

const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const MONGODB_URI = process.env.MONGODB_URI;

console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });


const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: ({ req }) => {
    const authHeader = req.headers.authorization;
    let currentUser = null;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.substring(7); //
      try {
        currentUser = jwt.verify(token, process.env.JWT_SECRET);
      } catch (error) {
        throw new Error("Authentication failed. Invalid token.");
      }
    }

    return { currentUser };
  },
  formatError: (error) => {
    if (error.extensions && error.extensions.code === "ADD_BOOK_ERROR") {
      return new ApolloError(error.message, "ADD_BOOK_ERROR");
    }
    if (error.extensions && error.extensions.code === "EDIT_AUTHOR_ERROR") {
      return new ApolloError(error.message, "EDIT_AUTHOR_ERROR");
    }
    if (error.extensions && error.extensions.code === "USERNAME_TAKEN_ERROR") {
      return new ApolloError(error.message, "USERNAME_TAKEN_ERROR");
    }
    if (
      error.extensions &&
      error.extensions.code === "INVALID_CREDENTIALS_ERROR"
    ) {
      return new ApolloError(error.message, "INVALID_CREDENTIALS_ERROR");
    }
    return error;
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

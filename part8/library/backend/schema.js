const typeDefs = `
  type Token {
    value: String!
    user: User!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
    value: String!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author
    id: ID!
    genres: [String!]!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allAuthors: [Author!]!
    allBooks(author: String, genre: String): [Book!]!
    allGenres: [String!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!

    editAuthor(name: String!, setBornTo: Int!): Author

    createUser(
      username: String!
      favoriteGenre: String!
      password: String!
    ): User

    login(username: String!, password: String!, favoriteGenre: String): Token!
  }
`;

module.exports = typeDefs;

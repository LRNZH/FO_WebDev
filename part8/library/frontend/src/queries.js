import { gql } from "@apollo/client";

export const GET_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

export const GET_BOOKS = gql`
  query {
    allBooks {
      title
      author {
        name
        id
        born
        bookCount
      }
      published
      genres
      id
    }
  }
`;

export const ADD_BOOK = gql`
  mutation AddBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author {
        name
        born
        bookCount
      }
      published
      genres
    }
  }
`;

export const UPDATE_AUTHOR = gql`
  mutation updateAuthor($name: String!, $born: Int!) {
    editAuthor(name: $name, setBornTo: $born) {
      name
      born
    }
  }
`;

export const LOGIN = gql`
  mutation Login(
    $username: String!
    $password: String!
    $favoriteGenre: String
  ) {
    login(
      username: $username
      password: $password
      favoriteGenre: $favoriteGenre
    ) {
      value
      user {
        username
        favoriteGenre
        id
      }
    }
  }
`;

export const GET_GENRES = gql`
  query {
    allGenres
  }
`;

export const REGISTER_USER = gql`
  mutation RegisterUser(
    $username: String!
    $favoriteGenre: String!
    $password: String!
  ) {
    createUser(
      username: $username
      favoriteGenre: $favoriteGenre
      password: $password
    ) {
      value
    }
  }
`;

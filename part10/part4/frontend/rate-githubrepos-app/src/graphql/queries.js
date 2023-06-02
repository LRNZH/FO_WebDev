import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query GetRepositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $first: Int, $after: String) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection, first: $first, after: $after) {
      edges {
        node {
          id
          fullName
          description
          language
          stargazersCount
          forksCount
          reviewCount
          ratingAverage
          ownerAvatarUrl
        }
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
`;


export const ME = gql`
  query Me {
    me {
      id
      username
    }
  }
`;

export const GET_REPOSITORY = gql`
  query GetRepository($id: ID!) {
    repository(id: $id) {
      id
      fullName
      description
      language
      stargazersCount
      forksCount
      reviewCount
      ratingAverage
      ownerAvatarUrl
      url
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;


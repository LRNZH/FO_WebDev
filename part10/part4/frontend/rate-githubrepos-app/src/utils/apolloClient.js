import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import Constants from 'expo-constants';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: Constants.manifest.extra.env.APOLLO_URI,
});

const createApolloClient = (authStorage) => {
  const authLink = setContext(async (_, { headers }) => {
    try {
      const accessToken = await authStorage.getAccessToken();
      return {
        headers: {
          ...headers,
          authorization: accessToken ? `Bearer ${accessToken}` : '',
        },
      };
    } catch (e) {
      console.log(e);
      return {
        headers,
      };
    }
  });
  
  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          repositories: {
            keyArgs: [], // Remove keyArgs for pagination to work correctly
            merge(existing = {}, incoming) {
              return {
                ...incoming,
                edges: [...(existing.edges || []), ...incoming.edges],
              };
            },
          },
        },
      },
      Repository: {
        fields: {
          reviews: {
            keyArgs: ['id'], // Specify keyArgs for pagination to work correctly
            merge(existing = {}, incoming) {
              const merged = {
                ...incoming,
                edges: [...(existing.edges || []), ...incoming.edges],
              };
              // Remove duplicate reviews by ID
              merged.edges = merged.edges.reduce((acc, curr) => {
                if (!acc.find((item) => item.node.id === curr.node.id)) {
                  acc.push(curr);
                }
                return acc;
              }, []);
              return merged;
            },
          },
        },
      },
    },
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
  });
};

export default createApolloClient;

import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (orderBy, orderDirection, first, after) => {
  const { data, loading, fetchMore } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: { orderBy, orderDirection, first, after },
  });

const handleFetchMore = () => {
  const endCursor = data.repositories.pageInfo.endCursor;
  const cursor = endCursor || '';
  fetchMore({
    variables: {
      after: cursor,
    },
  });
  return endCursor;
};

  return { data, loading, handleFetchMore };
};

export default useRepositories;

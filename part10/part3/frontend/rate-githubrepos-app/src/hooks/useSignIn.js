import { useMutation, useApolloClient } from '@apollo/client';
import { AUTHENTICATE } from '../graphql/mutations';
import { useAuthStorage } from './useAuthStorage';

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    const credentials = { username, password };
    const { data } = await mutate({ variables: { credentials } });

    if (data && data.authenticate) {
      const { accessToken } = data.authenticate;
      await authStorage.setAccessToken(accessToken);
      await apolloClient.resetStore();
    }

    return data;
  };

  const signOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  };

  return [signIn, signOut, result.data, result.loading];
};

export default useSignIn;

import React from 'react';
import { View, Pressable, Text } from 'react-native';
import { useApolloClient } from '@apollo/client';
import { useAuthStorage } from '../hooks/useAuthStorage';
import { signInStyles } from '../theme';
import { useNavigate } from 'react-router-dom';

const SignOut = () => {
  const authStorage = useAuthStorage();
    const apolloClient = useApolloClient();
    const navigate = useNavigate();

  const handleSignOut = async () => {
    await authStorage.removeAccessToken();
      await apolloClient.resetStore();
      navigate('/');
  };

  return (
    <View style={signInStyles.container}>
      <Pressable onPress={handleSignOut} style={signInStyles.button}>
        <Text style={signInStyles.buttonText}>Sign Out</Text>
      </Pressable>
    </View>
  );
};

export default SignOut;

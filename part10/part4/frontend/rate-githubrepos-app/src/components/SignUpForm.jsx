import React from 'react';
import { View, Pressable, Text } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-native';

import { CREATE_USER } from '../graphql/mutations';
import FormikTextInput from './FormikTextInput';
import { signInStyles } from '../theme';
import useSignIn from '../hooks/useSignIn';

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required').min(5, 'Username must be at least 5 characters').max(30, 'Username must be at most 30 characters'),
  password: yup.string().required('Password is required').min(5, 'Password must be at least 5 characters').max(50, 'Password must be at most 50 characters'),
  passwordConfirmation: yup.string()
    .required('Password confirmation is required')
    .oneOf([yup.ref('password'), null], 'Password confirmation must match the password'),
});

const SignUpForm = () => {
    const [createUser] = useMutation(CREATE_USER);
    const [signIn] = useSignIn();
    const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await createUser({ variables: { username, password } });
        signIn({ username, password });
        navigate('/');
    } catch (error) {
      console.log('Sign up error:', error);
    }
  };

  return (
    <Formik
      initialValues={{ username: '', password: '', passwordConfirmation: '' }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <View style={signInStyles.container}>
          <FormikTextInput
            name="username"
            placeholder="Username"
            style={signInStyles.input}
            autoCapitalize="none"
          />
          <FormikTextInput
            name="password"
            placeholder="Password"
            style={signInStyles.input}
            secureTextEntry
          />
          <FormikTextInput
            name="passwordConfirmation"
            placeholder="Confirm Password"
            style={signInStyles.input}
            secureTextEntry
          />
          <Pressable onPress={handleSubmit} style={signInStyles.button}>
            <Text style={signInStyles.buttonText}>Sign Up</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default SignUpForm;
import React from 'react';
import { View, Pressable, Text } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

import FormikTextInput from './FormikTextInput';
import { signInStyles } from '../theme';
import useSignIn from '../hooks/useSignIn';

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const SignInForm = ({ onSubmit }) => {
  return (
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
      <Pressable onPress={onSubmit} style={signInStyles.button}>
        <Text style={signInStyles.buttonText}>Submit</Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <>
          <SignInForm onSubmit={handleSubmit} />
        </>
      )}
    </Formik>
  );
};

export default SignIn;

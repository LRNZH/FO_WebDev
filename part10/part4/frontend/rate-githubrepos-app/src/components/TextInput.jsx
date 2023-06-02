import React from 'react';
import { TextInput as NativeTextInput, StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 5,
  },
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [styles.input, style];

  if (error) {
    textInputStyle.push(styles.errorInput);
  }

  return (
    <>
      <NativeTextInput style={textInputStyle} {...props} />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </>
  );
};

export default TextInput;
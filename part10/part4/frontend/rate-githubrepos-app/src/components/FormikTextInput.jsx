import { StyleSheet, Text } from 'react-native';
import { useField } from 'formik';

import TextInput from './TextInput';

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
    marginTop: 5,
  },
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);

  const showError = meta.touched && meta.error;

  return (
    <>
      <TextInput
        onChangeText={value => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError ? true : false}
        style={showError ? styles.errorInput : undefined}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

export default FormikTextInput;

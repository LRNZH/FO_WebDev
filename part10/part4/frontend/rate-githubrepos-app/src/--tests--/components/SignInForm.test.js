import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { MemoryRouter } from 'react-router-native';
import { Formik } from 'formik'; // Import Formik
import { SignInForm } from '../../components/SignIn';

jest.mock('../../hooks/useSignIn', () => {
  return jest.fn(() => {
    return [
      async ({ username, password }) => {
        if (username === 'kalle' && password === 'password') {
          return { success: true };
        } else {
          throw new Error('Invalid credentials');
        }
      },
      jest.fn(),
      null,
      false,
    ];
  });
});

describe('SignIn', () => {
  it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
    const onSubmit = jest.fn();

    const { getByPlaceholderText, getByText } = render(
      <MemoryRouter>
        <Formik // Wrap the SignInForm with Formik
          initialValues={{ username: '', password: '' }}
          onSubmit={onSubmit}
        >
          {({ handleSubmit }) => (
            <SignInForm handleSubmit={handleSubmit} />
          )}
        </Formik>
      </MemoryRouter>
    );

    const usernameInput = getByPlaceholderText('Username');
    const passwordInput = getByPlaceholderText('Password');
    const submitButton = getByText('Submit');

    fireEvent.changeText(usernameInput, 'kalle');
    fireEvent.changeText(passwordInput, 'password');

    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalled();
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          username: 'kalle',
          password: 'password',
        })
      );
    });
  });
});

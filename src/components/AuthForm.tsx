import React from 'react';
import { Button, Form } from 'react-bootstrap';

import { signInUser, signUpUser } from 'ts/api';
import { LoginUserData, RegistrationUserData } from 'ts/interfaces';
import SetState from 'ts/types';

interface AuthFormProps {
  signUpForm?: boolean;
  setLoggedIn: SetState<boolean>;
}

type RegistrationInputs = {
  username: HTMLInputElement;
  email: HTMLInputElement;
  password: HTMLInputElement;
};

function AuthForm({ signUpForm, setLoggedIn }: AuthFormProps) {
  const confirmRegistration = async (userData: RegistrationUserData) => {
    try {
      console.log(userData);
      await signUpUser(userData);
      console.log(await signUpUser(userData));
      // setLoggedIn(true);
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  const confirmLogin = async (userData: LoginUserData) => {
    try {
      console.log(userData);
      await signInUser(userData);
      console.log(await signInUser(userData));
      // setLoggedIn(true);
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  const handleSubmit: React.FormEventHandler<
    HTMLFormElement & RegistrationInputs
  > = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (signUpForm) {
      const { username, email, password } = form;
      await confirmRegistration({
        username: username.value,
        email: email.value,
        password: password.value,
      });
    } else {
      const { email, password } = form;
      await confirmLogin({
        email: email.value,
        password: password.value,
      });
    }
  };

  return (
    <Form
      className="col-md-4 col-sm-5 mx-auto vh-75 d-flex flex-column justify-content-center"
      onSubmit={handleSubmit}
    >
      {signUpForm && (
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            name="username"
            required
          />
        </Form.Group>
      )}
      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>E-mail address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter e-mail"
          name="email"
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          name="password"
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="w-100 mt-4">
        Submit
      </Button>
    </Form>
  );
}

AuthForm.defaultProps = {
  signUpForm: false,
};

export default AuthForm;
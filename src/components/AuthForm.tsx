import React, { useEffect, useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';

import { getUsers, signUpUser } from 'ts/api';
import { LoginUserData, RegistrationUserData } from 'ts/interfaces';
import SetState from 'ts/types';

interface AuthFormProps {
  signUpForm?: boolean;
  setLoggedIn: SetState<boolean>;
}

function AuthForm({ signUpForm, setLoggedIn }: AuthFormProps) {
  const [newUser, setNewUser] = useState<RegistrationUserData | null>(null);
  const [signInUser, setUserSignedIn] = useState<LoginUserData | null>(null);

  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const registrationInputs = [
    usernameRef.current,
    emailRef.current,
    passwordRef.current,
  ];
  // const loginInputs = [emailRef.current, passwordRef.current];

  const validateForm = (inputRefs: (HTMLInputElement | null)[]) => {
    if (!inputRefs.every((ref) => ref && ref.value)) {
      console.log(usernameRef.current?.value);
      console.log(emailRef.current?.value);
      console.log(passwordRef.current?.value);
      console.log('All fields should be filled out.');
      return false;
    }
    setNewUser({
      username: usernameRef.current?.value as string,
      email: emailRef.current?.value as string,
      password: passwordRef.current?.value as string,
    });
    return true;
  };

  const submitRegistration = async () => {
    if (validateForm(registrationInputs) && newUser) {
      try {
        console.log(newUser);
        await signUpUser(newUser);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Form
      className="col-md-4 col-sm-5 mx-auto vh-75 d-flex flex-column justify-content-center"
      onSubmit={(event) => {
        event.preventDefault();
        submitRegistration();
      }}
    >
      {signUpForm && (
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            ref={usernameRef}
          />
        </Form.Group>
      )}
      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>E-mail address</Form.Label>
        <Form.Control type="email" placeholder="Enter e-mail" ref={emailRef} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          ref={passwordRef}
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

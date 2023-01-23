import React from 'react';
import { Button, Form } from 'react-bootstrap';

interface AuthFormProps {
  signUpForm?: boolean;
}

function AuthForm({ signUpForm }: AuthFormProps) {
  return (
    <Form className="col-md-4 col-sm-5 mx-auto vh-75 d-flex flex-column justify-content-center">
      {signUpForm && (
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter your name" />
        </Form.Group>
      )}
      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>E-mail address</Form.Label>
        <Form.Control type="email" placeholder="Enter e-mail" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
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

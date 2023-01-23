import React, { memo } from 'react';
import { Tab, Tabs } from 'react-bootstrap';

import AuthForm from 'components/AuthForm';

function Main() {
  return (
    <Tabs defaultActiveKey="signUp" className="mb-3" justify>
      <Tab eventKey="signUp" title="Sign Up">
        <AuthForm signUpForm />
      </Tab>
      <Tab eventKey="signIn" title="Sign In">
        <AuthForm />
      </Tab>
    </Tabs>
  );
}

export default memo(Main);

import React, { memo } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';

import AuthForm from 'components/AuthForm';

import SetState from 'ts/types';

interface MainProps {
  isLoggedIn: boolean;
  setLoggedIn: SetState<boolean>;
  setNotificationShown: SetState<boolean>;
  setNotificationVariant: SetState<string>;
  setNotificationMessage: SetState<string>;
}

function Main({
  isLoggedIn,
  setLoggedIn,
  setNotificationShown,
  setNotificationVariant,
  setNotificationMessage,
}: MainProps) {
  if (isLoggedIn) {
    return <Navigate to="/auth-app/users" />;
  }
  return (
    <Tabs defaultActiveKey="signUp" className="mb-3" justify>
      <Tab eventKey="signUp" title="Sign Up">
        <AuthForm
          signUpForm
          id="signUp"
          setLoggedIn={setLoggedIn}
          setNotificationShown={setNotificationShown}
          setNotificationVariant={setNotificationVariant}
          setNotificationMessage={setNotificationMessage}
        />
      </Tab>
      <Tab eventKey="signIn" title="Sign In">
        <AuthForm
          id="signIn"
          setLoggedIn={setLoggedIn}
          setNotificationShown={setNotificationShown}
          setNotificationVariant={setNotificationVariant}
          setNotificationMessage={setNotificationMessage}
        />
      </Tab>
    </Tabs>
  );
}

export default memo(Main);

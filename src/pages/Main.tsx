import React, { memo, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';

import AuthForm from 'components/AuthForm';
import Notification from 'components/Notification';

import SetState from 'ts/types';

interface MainProps {
  isLoggedIn: boolean;
  setLoggedIn: SetState<boolean>;
  notificationVariant: string;
  setNotificationVariant: SetState<string>;
  notificationMessage: string;
  setNotificationMessage: SetState<string>;
}

function Main({
  isLoggedIn,
  setLoggedIn,
  notificationVariant,
  setNotificationVariant,
  notificationMessage,
  setNotificationMessage,
}: MainProps) {
  const [isNotificationShown, setNotificationShown] = useState(false);

  if (isLoggedIn) {
    return <Navigate to="/auth-app/users" />;
  }
  return (
    <>
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
      {isNotificationShown && (
        <Notification
          setNotificationShown={setNotificationShown}
          variant={notificationVariant}
          message={notificationMessage}
        />
      )}
    </>
  );
}

export default memo(Main);

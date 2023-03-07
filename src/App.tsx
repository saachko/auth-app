import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Main from 'pages/Main';
import NotFound from 'pages/NotFound';
import Users from 'pages/Users';

import parseJwt from 'ts/functions';
import { ParsedToken } from 'ts/interfaces';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [notificationVariant, setNotificationVariant] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [token, setToken] = useState(
    localStorage.getItem('accessUserToken') || ''
  );

  const checkToken = (userToken: string) => {
    const parsedToken: ParsedToken = parseJwt(userToken);
    const nowTimestamp = Math.floor(Date.now() / 1000);
    return parsedToken.exp > nowTimestamp;
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('accessUserToken');
    if (accessToken && checkToken(accessToken)) {
      setToken(accessToken);
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Main
            isLoggedIn={isLoggedIn}
            setLoggedIn={setLoggedIn}
            notificationVariant={notificationVariant}
            setNotificationVariant={setNotificationVariant}
            notificationMessage={notificationMessage}
            setNotificationMessage={setNotificationMessage}
          />
        }
      />
      <Route
        path="/users"
        element={
          <Users
            isLoggedIn={isLoggedIn}
            setLoggedIn={setLoggedIn}
            token={token}
          />
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;

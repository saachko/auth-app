import React, { useEffect, useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Main from 'pages/Main';
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

  const router = createBrowserRouter([
    {
      path: '/auth-app',
      element: (
        <Main
          isLoggedIn={isLoggedIn}
          setLoggedIn={setLoggedIn}
          notificationVariant={notificationVariant}
          setNotificationVariant={setNotificationVariant}
          notificationMessage={notificationMessage}
          setNotificationMessage={setNotificationMessage}
        />
      ),
    },
    {
      path: '/auth-app/users',
      element: (
        <Users
          isLoggedIn={isLoggedIn}
          setLoggedIn={setLoggedIn}
          token={token}
        />
      ),
    },
    {
      path: '*',
      element: <div>not found</div>,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

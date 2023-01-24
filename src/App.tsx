import React, { useEffect, useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Main from 'pages/Main';
import Users from 'pages/Users';

import Notification from './components/Notification';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isNotificationShown, setNotificationShown] = useState(false);
  const [notificationVariant, setNotificationVariant] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    const accessToken = localStorage.getItem('accessUserToken');
    if (accessToken) {
      setToken(accessToken);
      setLoggedIn(true);
    }
  }, []);

  const router = createBrowserRouter([
    {
      path: '/auth-app',
      element: (
        <Main
          isLoggedIn={isLoggedIn}
          setLoggedIn={setLoggedIn}
          setNotificationShown={setNotificationShown}
          setNotificationVariant={setNotificationVariant}
          setNotificationMessage={setNotificationMessage}
        />
      ),
      errorElement: <div>not found</div>,
    },
    {
      path: '/auth-app/users',
      element: <Users isLoggedIn={isLoggedIn} token={token} />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
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

export default App;

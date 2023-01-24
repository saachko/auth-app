import React, { useEffect, useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Main from 'pages/Main';
import Users from 'pages/Users';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
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
          notificationVariant={notificationVariant}
          setNotificationVariant={setNotificationVariant}
          notificationMessage={notificationMessage}
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

  return <RouterProvider router={router} />;
}

export default App;

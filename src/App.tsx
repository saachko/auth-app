import React, { useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Main from 'pages/Main';
import Users from 'pages/Users';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const router = createBrowserRouter([
    {
      path: '/auth-app',
      element: <Main isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />,
      errorElement: <div>not found</div>,
    },
    {
      path: '/auth-app/users',
      element: <Users isLoggedIn={isLoggedIn} />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

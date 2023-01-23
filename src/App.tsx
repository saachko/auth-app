import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Main from 'pages/Main';

function App() {
  const router = createBrowserRouter([
    {
      path: '/auth-app',
      element: <Main />,
      errorElement: <div>not found</div>,
    },
    {
      path: '/auth-app/users',
      element: <div>users</div>,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

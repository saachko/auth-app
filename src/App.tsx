import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <div>new app</div>,
      errorElement: <div>not found</div>,
    },
    {
      path: '/users',
      element: <div>users</div>,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

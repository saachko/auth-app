import React, { memo } from 'react';
import { Navigate } from 'react-router-dom';

interface UsersProps {
  isLoggedIn: boolean;
}

function Users({ isLoggedIn }: UsersProps) {
  if (!isLoggedIn) {
    return <Navigate to="/auth-app" />;
  }
  return <div>Users</div>;
}

export default memo(Users);

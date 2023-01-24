import React, { memo, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { getUsers } from 'ts/api';
import { User } from 'ts/interfaces';

import UsersTable from '../components/UsersTable';

interface UsersProps {
  isLoggedIn: boolean;
  token: string;
}

function Users({ isLoggedIn, token }: UsersProps) {
  const [users, setUsers] = useState<User[] | null>(null);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessUserToken');
    (async () => {
      if (accessToken) {
        const data = await getUsers(accessToken);
        setUsers(data);
      }
    })();
  }, [token]);

  if (!isLoggedIn) {
    return <Navigate to="/auth-app" />;
  }
  return <UsersTable users={users} />;
}

export default memo(Users);

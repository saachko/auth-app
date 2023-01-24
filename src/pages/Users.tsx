import React, { memo, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { getUsers } from 'ts/api';
import { User } from 'ts/interfaces';

import Loading from '../components/Loading';
import UsersTable from '../components/UsersTable';

interface UsersProps {
  isLoggedIn: boolean;
  token: string;
}

function Users({ isLoggedIn, token }: UsersProps) {
  const [isDataLoading, setDataLoading] = useState(false);
  const [users, setUsers] = useState<User[] | null>(null);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessUserToken');
    (async () => {
      if (accessToken) {
        setDataLoading(true);
        const data = await getUsers(accessToken);
        setUsers(data);
        setDataLoading(false);
      }
    })();
  }, [token]);

  if (!isLoggedIn) {
    return <Navigate to="/auth-app" />;
  }
  return isDataLoading ? <Loading /> : <UsersTable users={users} />;
}

export default memo(Users);

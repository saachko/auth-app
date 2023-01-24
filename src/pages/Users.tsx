import React, { memo, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { getUsers } from 'ts/api';
import { User } from 'ts/interfaces';
import SetState from 'ts/types';

import Header from '../components/Header';
import Loading from '../components/Loading';
import UsersTable from '../components/UsersTable';

interface UsersProps {
  isLoggedIn: boolean;
  setLoggedIn: SetState<boolean>;
  token: string;
}

function Users({ isLoggedIn, setLoggedIn, token }: UsersProps) {
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
  return isDataLoading ? (
    <Loading />
  ) : (
    <>
      <Header setLoggedIn={setLoggedIn} />
      <UsersTable users={users} />
    </>
  );
}

export default memo(Users);

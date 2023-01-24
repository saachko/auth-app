import React, { memo, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { getUserById, getUsers } from 'ts/api';
import parseJwt from 'ts/functions';
import { User } from 'ts/interfaces';
import SetState from 'ts/types';

import ButtonsToolbar from '../components/ButtonToolbar';
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
  const [currentUserName, setCurrentUserName] = useState('');
  const [currentUserId, setCurrentUserId] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<string[]>([]);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessUserToken');
    (async () => {
      if (accessToken) {
        setDataLoading(true);
        const currentUser = await getUserById(
          parseJwt(accessToken).id,
          accessToken
        );
        setCurrentUserName(currentUser.username);
        setCurrentUserId(currentUser._id);
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
      <Header setLoggedIn={setLoggedIn} username={currentUserName} />
      <ButtonsToolbar
        selectedId={selectedUserId}
        currentUserId={currentUserId}
        setLoggedIn={setLoggedIn}
        token={token}
        setUsers={setUsers}
        setDataLoading={setDataLoading}
      />
      <UsersTable
        users={users}
        selectedUserId={selectedUserId}
        setSelectedUserId={setSelectedUserId}
      />
    </>
  );
}

export default memo(Users);

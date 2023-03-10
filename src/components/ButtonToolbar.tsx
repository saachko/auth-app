import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
import { AiFillDelete } from 'react-icons/ai';

import { deleteUser, getUserById, getUsers, updateUser } from 'ts/api';
import { iconStyle, textForWarnings } from 'ts/constants';
import { User } from 'ts/interfaces';
import SetState from 'ts/types';

import Warning from './Warning';

interface ButtonsToolbarProps {
  selectedId: string[];
  currentUserId: string;
  setLoggedIn: SetState<boolean>;
  setUsers: SetState<User[] | null>;
  setDataLoading: SetState<boolean>;
}

function ButtonsToolbar({
  selectedId,
  currentUserId,
  setLoggedIn,
  setUsers,
  setDataLoading,
}: ButtonsToolbarProps) {
  const [currentToken, setCurrentToken] = useState('');
  const [isWarningShown, setWarningShown] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');

  useEffect(() => {
    const accessToken = localStorage.getItem('accessUserToken');
    if (accessToken) setCurrentToken(accessToken);
  }, []);

  const checkCurrentUser = () => {
    if (selectedId.includes(currentUserId)) {
      localStorage.removeItem('accessUserToken');
      setLoggedIn(false);
    }
  };

  const updateUsersTable = async () => {
    const data = await getUsers(currentToken);
    setUsers(data);
  };

  const changeUserStatus = async (isUserBlocked: boolean) => {
    await Promise.all(
      selectedId.map(async (changedId) => {
        const changedUser = await getUserById(changedId, currentToken);
        await updateUser(changedId, currentToken, {
          ...changedUser,
          isBlocked: isUserBlocked,
        });
      })
    );
  };

  const deleteUsers = async () => {
    if (currentToken) {
      setDataLoading(true);
      await Promise.all(
        selectedId.map(async (deletedId) => {
          await deleteUser(deletedId, currentToken);
        })
      );
      checkCurrentUser();
      await updateUsersTable();
      setDataLoading(false);
    }
  };

  const blockUsers = async () => {
    if (currentToken) {
      setDataLoading(true);
      await changeUserStatus(true);
      checkCurrentUser();
      await updateUsersTable();
      setDataLoading(false);
    }
  };

  const unblockUsers = async () => {
    if (currentToken) {
      setDataLoading(true);
      await changeUserStatus(false);
      await updateUsersTable();
      setDataLoading(false);
    }
  };

  const handleSubmit = () => {
    if (warningMessage === textForWarnings.delete) {
      deleteUsers();
    } else if (warningMessage === textForWarnings.block) {
      blockUsers();
    } else if (warningMessage === textForWarnings.unblock) {
      unblockUsers();
    }
  };

  return (
    <>
      <ButtonToolbar
        aria-label="Toolbar with button groups"
        className="mb-4 justify-content-end"
      >
        <ButtonGroup className="me-2" aria-label="Third group">
          <Button
            onClick={() => {
              setWarningShown(true);
              setWarningMessage(textForWarnings.delete);
            }}
          >
            <AiFillDelete style={iconStyle} />
          </Button>
        </ButtonGroup>
        <ButtonGroup aria-label="Second group">
          <Button
            onClick={() => {
              setWarningShown(true);
              setWarningMessage(textForWarnings.block);
            }}
          >
            Block
          </Button>
          <Button
            onClick={() => {
              setWarningShown(true);
              setWarningMessage(textForWarnings.unblock);
            }}
          >
            Unblock
          </Button>
        </ButtonGroup>
      </ButtonToolbar>
      <Warning
        warningText={warningMessage}
        isWarningShown={isWarningShown}
        setWarningShown={setWarningShown}
        handleSubmit={handleSubmit}
      />
    </>
  );
}

export default ButtonsToolbar;

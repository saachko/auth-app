import React, { useState } from 'react';
import { Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
import { AiFillDelete } from 'react-icons/ai';

import { deleteUser, getUsers } from 'ts/api';
import { iconStyle, textForWarnings } from 'ts/constants';
import { User } from 'ts/interfaces';
import SetState from 'ts/types';

import Warning from './Warning';

interface ButtonsToolbarProps {
  selectedId: string[];
  currentUserId: string;
  setLoggedIn: SetState<boolean>;
  token: string;
  setUsers: SetState<User[] | null>;
  setDataLoading: SetState<boolean>;
}

function ButtonsToolbar({
  selectedId,
  currentUserId,
  setLoggedIn,
  token,
  setUsers,
  setDataLoading,
}: ButtonsToolbarProps) {
  const [isWarningShown, setWarningShown] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');

  const checkCurrentUser = () => {
    if (selectedId.indexOf(currentUserId) !== -1) {
      localStorage.removeItem('accessUserToken');
      setLoggedIn(false);
    }
  };

  const deleteUsers = async () => {
    if (token) {
      setDataLoading(true);
      selectedId.map(async (deletedId) => {
        await deleteUser(deletedId, token);
      });
      checkCurrentUser();
      const data = await getUsers(token);
      setUsers(data);
      setDataLoading(false);
    }
  };

  const blockUsers = async () => {};

  const unblockUsers = async () => {};

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

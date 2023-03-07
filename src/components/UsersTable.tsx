import React, { useEffect, useState } from 'react';
import { Form, OverlayTrigger, Table, Tooltip } from 'react-bootstrap';

import { tableHeadings } from 'ts/constants';
import { User } from 'ts/interfaces';
import SetState from 'ts/types';

interface UsersTableProps {
  users: User[] | null;
  selectedUserId: string[];
  setSelectedUserId: SetState<string[]>;
}

function UsersTable({
  users,
  selectedUserId,
  setSelectedUserId,
}: UsersTableProps) {
  const [allChecked, setAllChecked] = useState(false);

  const selectUserId = (newSelectedId: string) => {
    if (!selectedUserId.includes(newSelectedId)) {
      setSelectedUserId((prev) => [...prev, newSelectedId]);
    } else {
      setSelectedUserId((prev) => [
        ...prev.filter((id) => id !== newSelectedId),
      ]);
    }
  };

  useEffect(() => {
    if (allChecked) {
      const allId = users?.map((user) => user._id);
      if (allId) {
        setSelectedUserId(allId);
      }
    } else {
      setSelectedUserId([]);
    }
  }, [allChecked]);

  return (
    <div>
      <Table responsive="lg" striped>
        <thead>
          <tr>
            <th>
              <Form.Check
                aria-label="option 1"
                onChange={() => setAllChecked(!allChecked)}
              />
            </th>
            {tableHeadings.map((heading) => (
              <th key={heading.id}>{heading.headingName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users?.map((user, index) => (
            <tr key={user._id}>
              <td>
                <Form.Check
                  aria-label="option 1"
                  onChange={() => selectUserId(user._id)}
                  checked={selectedUserId.includes(user._id)}
                />
              </td>
              <td>{index + 1}</td>
              <OverlayTrigger
                placement="right"
                overlay={<Tooltip>{user._id}</Tooltip>}
              >
                <td>{user._id.slice(0, 5)}...</td>
              </OverlayTrigger>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.registrationDate}</td>
              <td>{user.lastLoginDate}</td>
              <td style={{ color: `${user.isBlocked ? 'red' : 'green'}` }}>
                {user.isBlocked ? 'blocked' : 'active'}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default UsersTable;

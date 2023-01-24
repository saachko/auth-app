import React from 'react';
import { OverlayTrigger, Table, Tooltip } from 'react-bootstrap';

import { tableHeadings } from 'ts/constants';
import { User } from 'ts/interfaces';

interface UsersTableProps {
  users: User[] | null;
}

function UsersTable({ users }: UsersTableProps) {
  return (
    <div>
      <Table responsive="lg" striped>
        <thead>
          <tr>
            {tableHeadings.map((heading) => (
              <th key={heading.id}>{heading.headingName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users?.map((user, index) => (
            <tr key={user._id}>
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

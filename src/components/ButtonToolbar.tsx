import React from 'react';
import { Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
import { AiFillDelete } from 'react-icons/ai';

function ButtonsToolbar() {
  const iconStyle = { color: 'white', fontSize: '1.3em', marginTop: '-5px' };

  return (
    <ButtonToolbar
      aria-label="Toolbar with button groups"
      className="mb-4 justify-content-end"
    >
      <ButtonGroup className="me-2" aria-label="Third group">
        <Button>
          <AiFillDelete style={iconStyle} />
        </Button>
      </ButtonGroup>
      <ButtonGroup aria-label="Second group">
        <Button>Block</Button>
        <Button>Unblock</Button>
      </ButtonGroup>
    </ButtonToolbar>
  );
}

export default ButtonsToolbar;

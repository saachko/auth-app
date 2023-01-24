import React from 'react';
import { Button, Modal } from 'react-bootstrap';

import SetState from 'ts/types';

interface WarningProps {
  warningText: string;
  isWarningShown: boolean;
  setWarningShown: SetState<boolean>;
  handleSubmit: () => void;
}

function Warning({
  warningText,
  isWarningShown,
  setWarningShown,
  handleSubmit,
}: WarningProps) {
  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={isWarningShown}
      onHide={() => setWarningShown(false)}
    >
      <Modal.Body>
        Do you really want to{' '}
        <span className="text-primary">{warningText}</span> selected users
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setWarningShown(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Warning;

import React from 'react';
import { Spinner } from 'react-bootstrap';

function Loading() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-75">
      <Spinner
        animation="border"
        variant="primary"
        style={{
          width: '5rem',
          height: '5rem',
          zIndex: '5',
        }}
        role="status"
      />
    </div>
  );
}

export default Loading;

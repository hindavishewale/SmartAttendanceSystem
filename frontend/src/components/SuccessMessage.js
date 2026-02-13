import React from 'react';

function SuccessMessage({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="alert alert-success alert-dismissible fade show" role="alert">
      {message}
      {onClose && (
        <button type="button" className="btn-close" onClick={onClose}></button>
      )}
    </div>
  );
}

export default SuccessMessage;

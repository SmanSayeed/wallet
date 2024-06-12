import React from 'react';
import PropTypes from 'prop-types';

const Alert = ({ message, variant, dismissible, onClose }) => {
  return (
    <div className={`alert alert-${variant} ${dismissible ? 'alert-dismissible' : ''}`} role="alert">
      {dismissible && (
        <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
      )}
      {message}
    </div>
  );
};

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  variant: PropTypes.string,
  dismissible: PropTypes.bool,
  onClose: PropTypes.func,
};

Alert.defaultProps = {
  variant: 'primary',
  dismissible: false,
  onClose: () => {},
};

export default Alert;

import React from 'react';
import '../assets/styles/Alert.css';

const Alert = ({ message, onClose, color }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="alert" style={{ backgroundColor: color }}>
      {message}
    </div>
  );
};

export default Alert;

import React from 'react';

interface StatusDisplayProps {
  message: string;
}

const StatusDisplay: React.FC<StatusDisplayProps> = ({ message }) => {
  return <p>{message}</p>;
};

export default StatusDisplay;

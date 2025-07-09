import React from 'react';

interface StatusDisplayProps {
  message: string;
}

const StatusDisplay: React.FC<StatusDisplayProps> = ({ message }) => {
  const isSuccess = message.includes('✅');
  const isError = message.includes('불가') || message.includes('실패') || message.includes('없습니다');

  let textColor = 'text-gray-600';
  if (isSuccess) {
    textColor = 'text-green-600';
  } else if (isError) {
    textColor = 'text-red-600';
  }

  return (
    <div className={`p-4 rounded-lg bg-gray-50 ${isSuccess ? 'bg-green-50' : ''} ${isError ? 'bg-red-50' : ''}`}>
      <p className={`text-base font-medium ${textColor}`}>
        {message}
      </p>
    </div>
  );
};

export default StatusDisplay;

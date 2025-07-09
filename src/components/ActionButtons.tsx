import React from 'react';

interface ActionButtonsProps {
  onCheckIn: () => void;
  onRecheckPosition: () => void;
  isCheckInDisabled: boolean;
  isChecked: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onCheckIn,
  onRecheckPosition,
  isCheckInDisabled,
  isChecked,
}) => {
  return (
    <div className="flex flex-col space-y-3">
      {!isChecked && (
        <button 
          onClick={onCheckIn} 
          disabled={isCheckInDisabled}
          className="w-full py-3 px-4 rounded-lg font-semibold text-white bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition duration-200"
        >
          출석하기
        </button>
      )}
      <button 
        onClick={onRecheckPosition}
        className="w-full py-3 px-4 rounded-lg font-semibold text-blue-600 bg-blue-100 hover:bg-blue-200 transition duration-200"
      >
        위치 다시 확인
      </button>
    </div>
  );
};

export default ActionButtons;

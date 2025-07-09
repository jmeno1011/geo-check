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
    <>
      {!isChecked && (
        <button onClick={onCheckIn} disabled={isCheckInDisabled}>
          출석하기
        </button>
      )}
      <button onClick={onRecheckPosition} style={{ marginTop: 10 }}>
        위치 다시 확인
      </button>
    </>
  );
};

export default ActionButtons;

import React from 'react';

interface CheckpointFormProps {
  checkpoint: {
    latitude: number;
    longitude: number;
    radius: number;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckpointForm: React.FC<CheckpointFormProps> = ({ checkpoint, onInputChange }) => {
  return (
    <div style={{ marginBottom: 10 }}>
      <label>
        위도:
        <input
          type="number"
          name="latitude"
          value={checkpoint.latitude}
          onChange={onInputChange}
          step="0.0001"
        />
      </label>
      <br />
      <label>
        경도:
        <input
          type="number"
          name="longitude"
          value={checkpoint.longitude}
          onChange={onInputChange}
          step="0.0001"
        />
      </label>
      <br />
      <label>
        반경(m):
        <input
          type="number"
          name="radius"
          value={checkpoint.radius}
          onChange={onInputChange}
        />
      </label>
    </div>
  );
};

export default CheckpointForm;

import { useCallback, useEffect, useState } from 'react';
import './App.css';
import { getDistanceFromLatLonInMeters } from './utils/distance';
import CheckpointForm from './components/CheckpointForm';
import StatusDisplay from './components/StatusDisplay';
import ActionButtons from './components/ActionButtons';

function App() {
  const [checkpoint, setCheckpoint] = useState({
    latitude: 37.5665,
    longitude: 126.9780,
    radius: 300,
  });

  const [isInRange, setIsInRange] = useState(false);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [message, setMessage] = useState('');
  const [checked, setChecked] = useState(false);

  const checkPosition = useCallback(() => {
    if (!navigator.geolocation) {
      setMessage('위치 정보를 사용할 수 없습니다.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });

        const distance = getDistanceFromLatLonInMeters(
          latitude,
          longitude,
          checkpoint.latitude,
          checkpoint.longitude
        );

        if (distance <= checkpoint.radius) {
          setIsInRange(true);
          setMessage(`출석 가능! 현재 거리: ${Math.round(distance)}m`);
        } else {
          setIsInRange(false);
          setMessage(`출석 불가: ${Math.round(distance)}m 떨어져 있음`);
        }
      },
      (error) => {
        setMessage('위치 확인에 실패했습니다.');
        console.error(error);
      }
    );
  }, [checkpoint.latitude, checkpoint.longitude, checkpoint.radius]);

  const handleCheckIn = () => {
    if (isInRange) {
      console.log('출석 완료!', location);
      setChecked(true);
      setMessage('✅ 출석이 완료되었습니다!');
    }
  };

  useEffect(() => {
    checkPosition();
  }, [checkPosition]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCheckpoint((prev) => ({
      ...prev,
      [name]: parseFloat(value),
    }));
    setChecked(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>📍 위치 기반 출석</h2>
      <CheckpointForm checkpoint={checkpoint} onInputChange={handleInputChange} />
      <StatusDisplay message={message} />
      <ActionButtons
        onCheckIn={handleCheckIn}
        onRecheckPosition={checkPosition}
        isCheckInDisabled={!isInRange}
        isChecked={checked}
      />
    </div>
  );
}

export default App;

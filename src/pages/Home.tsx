import { useCallback, useEffect, useState } from 'react';
import '../App.css';
import { getDistanceFromLatLonInMeters } from '../utils/distance';
import StatusDisplay from '../components/StatusDisplay';
import ActionButtons from '../components/ActionButtons';
import MapSelector from '../components/MapSelector';

function Home() {
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

  const handleLocationSelect = (lat: number, lng: number) => {
    setCheckpoint((prev) => ({
      ...prev,
      latitude: lat,
      longitude: lng,
    }));
    setChecked(false);
  };

  const handleRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckpoint((prev) => ({
      ...prev,
      radius: parseInt(e.target.value, 10),
    }));
    setChecked(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">📍 위치 기반 출석</h2>
        <p className="text-gray-600 mb-4">지도에서 출석할 위치를 클릭하세요.</p>
        <div className="rounded-lg overflow-hidden">
          <MapSelector
            initialPosition={{ lat: checkpoint.latitude, lng: checkpoint.longitude }}
            onLocationSelect={handleLocationSelect}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">설정</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="radius" className="block text-sm font-medium text-gray-700">반경 (미터)</label>
              <input
                type="number"
                id="radius"
                name="radius"
                value={checkpoint.radius}
                onChange={handleRadiusChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">선택된 위치</p>
              <p className="text-gray-600">위도: {checkpoint.latitude.toFixed(4)}, 경도: {checkpoint.longitude.toFixed(4)}</p>
            </div>
            {location && (
              <div>
                <p className="text-sm font-medium text-gray-700">현재 내 위치</p>
                <p className="text-gray-600">위도: {location.latitude.toFixed(4)}, 경도: {location.longitude.toFixed(4)}</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">상태</h3>
            <StatusDisplay message={message} />
          </div>
          <div className="mt-4">
            <ActionButtons
              onCheckIn={handleCheckIn}
              onRecheckPosition={checkPosition}
              isCheckInDisabled={!isInRange}
              isChecked={checked}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

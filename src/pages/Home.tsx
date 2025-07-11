import { useCallback, useEffect, useState } from "react";
import { getDistanceFromLatLonInMeters } from "../utils/distance";
import StatusDisplay from "../components/StatusDisplay";
import ActionButtons from "../components/ActionButtons";
import MapSelector from "../components/MapSelector";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";

function Home() {
  const [checkpoint, setCheckpoint] = useState({
    latitude: 37.5665,
    longitude: 126.978,
    radius: 300,
  });

  const [isInRange, setIsInRange] = useState(false);
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [message, setMessage] = useState("");
  const [checked, setChecked] = useState(false);

  const checkPosition = useCallback(() => {
    if (!navigator.geolocation) {
      setMessage("위치 정보를 사용할 수 없습니다.");
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
        setMessage("위치 확인에 실패했습니다.");
        console.error(error);
      }
    );
  }, [checkpoint.latitude, checkpoint.longitude, checkpoint.radius]);

  const handleCheckIn = () => {
    if (isInRange) {
      console.log("출석 완료!", location);
      setChecked(true);
      setMessage("✅ 출석이 완료되었습니다!");
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
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          📍 위치 기반 출석
        </h1>
        <p className="text-gray-600">지도에서 출석할 위치를 클릭하세요.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card className="h-full gap-0">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  지도 영역
                </CardTitle>
                {/* <div>
                  현재 좌표 (위도, 경도) : {location?.latitude.toFixed(4)},{" "}
                  {location?.longitude.toFixed(4)}
                </div> */}
              </div>
            </CardHeader>
            <CardContent>
              <MapSelector
                initialPosition={{
                  lat: checkpoint.latitude,
                  lng: checkpoint.longitude,
                }}
                onLocationSelect={handleLocationSelect}
              />
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-1">
          <Card className="h-full gap-0">
            <CardHeader className="pb-0">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">설정</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {/* <div className="max-h-96 md:max-h-[500px] lg:max-h-[600px] overflow-y-auto"> */}
              <div className="">
                <div className="space-y-2 p-4">
                  <div>
                    <label
                      htmlFor="radius"
                      className="block text-sm font-medium text-gray-700"
                    >
                      반경 (미터)
                    </label>
                    <input
                      type="number"
                      id="radius"
                      name="radius"
                      value={checkpoint.radius}
                      onChange={handleRadiusChange}
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  {location && (
                    <div className="p-3 rounded-lg border transition-all duration-200 ">
                      <p className="text-sm font-medium text-gray-700">
                        현재 내 위치
                      </p>
                      <p className="text-gray-600">
                        위도: {location.latitude.toFixed(4)}, 경도:{" "}
                        {location.longitude.toFixed(4)}
                      </p>
                    </div>
                  )}
                  <div className="p-3 rounded-lg border transition-all duration-200 ">
                    <p className="text-sm font-medium text-gray-700">
                      선택된 위치
                    </p>
                    <p className="text-gray-600">
                      위도: {checkpoint.latitude.toFixed(4)}, 경도:{" "}
                      {checkpoint.longitude.toFixed(4)}
                    </p>
                  </div>
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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Home;

import React, { useEffect } from 'react';
import { auth, googleProvider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('로그인 실패:', error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  return (
    <div className="flex items-center justify-center mt-10">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          로그인
        </h2>
        <p className="text-center text-gray-600">
          출석 체크를 위해 로그인해주세요.
        </p>
        <button 
          onClick={handleGoogleLogin}
          className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
        >
          <svg className="w-6 h-6 mr-2" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 381.5 512 244 512 110.3 512 0 398.8 0 256S110.3 0 244 0c73.2 0 136.2 29.3 182.4 75.8l-66.8 64.3C334.3 112.3 293.1 91.4 244 91.4c-81.4 0-148.5 67.1-148.5 148.5s67.1 148.5 148.5 148.5c87.8 0 124.9-65.3 129.2-98.5H244v-73.4h239.1c1.2 6.9 2.9 14.1 2.9 21.8z"></path></svg>
          Google 계정으로 로그인
        </button>
      </div>
    </div>
  );
};

export default Login;

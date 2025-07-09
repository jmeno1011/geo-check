import React from 'react';
import { auth, googleProvider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';

const Login: React.FC = () => {
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      // This gives you a Google Access Token. You can use it to access the Google API.
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log('로그인 성공:', user);
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    } catch (error) {
      console.error('로그인 실패:', error);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>로그인</h2>
      <button onClick={handleGoogleLogin}>
        구글로 로그인
      </button>
    </div>
  );
};

export default Login;

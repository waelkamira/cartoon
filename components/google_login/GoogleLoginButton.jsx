// components/GoogleLoginButton.js
'use client';
import { GoogleLogin } from '@react-oauth/google';

const GoogleLoginButton = ({ onSuccess, onError }) => {
  return <GoogleLogin onSuccess={onSuccess} onError={onError} useOneTap />;
};

export default GoogleLoginButton;

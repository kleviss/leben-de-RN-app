import * as Device from 'expo-device';

export const getBaseUrl = () => {
  if (__DEV__) {
    console.log('Device.isDevice', Device.isDevice);
    return !Device.isDevice
      ? 'http://localhost:5005/api'
      : 'https://leben-de-backend.onrender.com/api';
  }

  return 'https://leben-de-backend.onrender.com/api';
};

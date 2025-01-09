import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../../constants';

// 타입 정의
interface LoginResponse {
  access_token: string;
}

interface ProfileResponse {
  userId: number;
  username: string;
}

// 로그인 함수
export const login = async (
  username: string,
  password: string,
): Promise<string> => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username, password}),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    const data: LoginResponse = await response.json();

    // 토큰 저장
    await AsyncStorage.setItem('accessToken', data.access_token);

    console.log('Login successful, token saved:', data.access_token);
    return data.access_token;
  } catch (error) {
    console.error('Login failed:', (error as Error).message);
    throw error;
  }
};

// 프로필 조회 함수
export const getProfile = async (): Promise<ProfileResponse> => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    if (!token) {
      throw new Error('No token found, please login first');
    }

    const response = await fetch(`${BASE_URL}/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // JWT 토큰 추가
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch profile');
    }

    const data: ProfileResponse = await response.json();
    console.log('Profile fetched successfully:', data);
    return data;
  } catch (error) {
    console.error('Failed to fetch profile:', (error as Error).message);
    throw error;
  }
};

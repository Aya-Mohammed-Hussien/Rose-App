import { GetUserResponse } from '@/lib/types/user-data';
import { getToken } from '@/lib/utils/get-token.util';

export const getUserData = async (): Promise<GetUserResponse> => {
  try {
    // Get token from cookies
    const token = await getToken();

    // Base API URL
    const baseURL = process.env.NEXT_PUBLIC_API;

    if (!token) {
      throw new Error('No access token found');
    }

    // Fetch user profile data
    const response = await fetch(`${baseURL}/auth/profile-data`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    });

    const payload: GetUserResponse = await response.json();

    if (!response.ok) {
      throw new Error(payload.message || 'Failed to fetch user data');
    }

    return payload;
  } catch (error: unknown) {
    throw new Error(error instanceof Error ? error.message : 'Unexpected error while getting user data');
  }
};

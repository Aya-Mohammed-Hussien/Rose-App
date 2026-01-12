import { decode } from 'next-auth/jwt';
import { cookies } from 'next/headers';

export async function getToken() {
  try {
    const tokenCookies = cookies().get('next-auth.session-token')?.value;

    if (!tokenCookies) return null;

    if (!process.env.NEXTAUTH_SECRET) {
      console.error('NEXTAUTH_SECRET is not set');
      return null;
    }

    const jwt = await decode({
      token: tokenCookies,
      secret: process.env.NEXTAUTH_SECRET,
    });

    return jwt?.token || null;
  } catch (error: unknown) {
    // Log error but don't throw - return null instead
    // This allows the calling code to handle the missing token gracefully
    console.error('Error decoding token:', error);
    return null;
  }
}

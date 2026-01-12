import { decode } from 'next-auth/jwt';
import { cookies } from 'next/headers';

export async function getToken() {
  try {
    // Check if we're in a dynamic context
    // If cookies() throws an error about dynamic usage, catch it and return null
    let tokenCookies: string | undefined;
    try {
      tokenCookies = cookies().get('next-auth.session-token')?.value;
    } catch (cookieError: unknown) {
      // If cookies() fails due to static generation context, return null
      if (cookieError instanceof Error && cookieError.message.includes('Dynamic server usage')) {
        // This is expected during static generation, return null gracefully
        return null;
      }
      // Re-throw other cookie errors
      throw cookieError;
    }

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
    // Only log non-dynamic-usage errors to avoid noise during build
    if (error instanceof Error && error.message.includes('Dynamic server usage')) {
      // This is expected during static generation, return null gracefully
      return null;
    }
    console.error('Error decoding token:', error);
    return null;
  }
}

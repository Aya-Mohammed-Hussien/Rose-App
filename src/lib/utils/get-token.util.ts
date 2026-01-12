import { decode } from 'next-auth/jwt';
import { cookies } from 'next/headers';

export async function getToken() {
  try {
    // Get token from cookies
    // Note: This will throw during static generation if route doesn't have 'force-dynamic'
    // but we catch and handle it gracefully
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
    // Handle errors gracefully
    // If it's a dynamic server usage error, it's expected during static generation
    // and the route should have 'export const dynamic = "force-dynamic"' to prevent this
    if (error instanceof Error) {
      // Don't log expected dynamic server usage errors during build
      // These are handled by the route's dynamic configuration
      if (error.message.includes('Dynamic server usage')) {
        // Silently return null - this is expected behavior
        return null;
      }
      // Log other errors for debugging
      console.error('Error decoding token:', error);
    } else {
      console.error('Error decoding token:', error);
    }
    return null;
  }
}

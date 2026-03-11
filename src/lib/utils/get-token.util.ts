import { decode } from 'next-auth/jwt';
import { cookies } from 'next/headers';

export async function getToken() {
  try {
    const cookieStore = cookies();

    // Try common cookie names — Vercel/HTTPS may set __Secure- or __Host-
    const tokenCookie =
      cookieStore.get('__Secure-next-auth.session-token')?.value ??
      cookieStore.get('__Host-next-auth.session-token')?.value ??
      cookieStore.get('next-auth.session-token')?.value;

    if (!tokenCookie) return null;

    // If NEXTAUTH_SECRET is not set, return the raw cookie value as a fallback.
    // Many API calls only need the raw JWT for Bearer auth; decoding isn't strictly
    // necessary in those paths and this avoids breaking when the secret is missing.
    if (!process.env.NEXTAUTH_SECRET) {
      return tokenCookie;
    }

    // Try to decode the cookie to validate it and extract the embedded token
    // (NextAuth stores the actual token under `.token` in the JWT payload).
    try {
      const jwt = await decode({ token: tokenCookie, secret: process.env.NEXTAUTH_SECRET });
      // If decode succeeded and contains the nested token, return it.
      if (jwt?.token) return jwt.token;
      // Otherwise fall back to returning the raw cookie value
      return tokenCookie;
    } catch (err) {
      // If decode fails for any reason, log and fall back to raw cookie so callers
      // that only need the JWT string continue to work.
      console.error('Error decoding token fallback:', err);
      return tokenCookie;
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.message.includes('Dynamic server usage')) return null;
      console.error('Error getting token:', error);
    } else {
      console.error('Error getting token:', error);
    }
    return null;
  }
}

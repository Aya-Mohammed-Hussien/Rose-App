import { signOut } from 'next-auth/react';

export async function handleLogout() {
  // When logging out => redirect to login page
  await signOut({ callbackUrl: '/login' });
}

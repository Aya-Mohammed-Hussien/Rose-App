import React from 'react';
import MyAccountForm from './_components/my-account-form';
import { getUserData } from '@/lib/apis/profile/user-data.api';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function Page() {
  try {
    const userData = await getUserData();
    return <MyAccountForm userData={userData} />;
  } catch (error) {
    // Log error for debugging
    console.error('Error loading user data:', error);

    // If it's an authentication error, redirect to login
    if (error instanceof Error && error.message.includes('token')) {
      redirect('/login');
    }

    // Otherwise, throw to trigger error boundary
    throw error;
  }
}

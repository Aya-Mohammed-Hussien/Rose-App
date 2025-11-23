import React from 'react';
import MyAccountForm from './_components/my-account-form';
import { getUserData } from '@/lib/apis/profile/user-data.api';

export default async function Page() {
  const userData = await getUserData();
  return <MyAccountForm userData={userData} />;
}

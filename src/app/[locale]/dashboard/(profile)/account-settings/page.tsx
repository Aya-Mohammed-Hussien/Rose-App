import React from 'react';
import ProfileAccount from './_components/account-settings';
import { getUserData } from '@/lib/apis/profile/user-data.api';

export const dynamic = "force-dynamic";

export default async function AccountSettings() {
  const userData = await getUserData();
  return (
    <section className="flex flex-col gap-4 w-full items-center ">
      <div className="w-full  bg-white   rounded-xl shadow-sm">
        <ProfileAccount userData={userData} />
      </div>
    </section>
  );
}

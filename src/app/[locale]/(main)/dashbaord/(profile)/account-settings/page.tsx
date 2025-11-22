import React from 'react'
import ProfileAccount from './_components/account-settings'
import { getUserData } from '@/lib/apis/profile/user-data.api';
import MyAccountForm from '../../../(profile)/profile/my-account/_components/my-account-form';

export default async function AccountSettings() {
    const userData = await getUserData();
    return (
        <section className="flex flex-col gap-4 w-full items-center bg-[#FAFAFA]">
            <h4 className="text-zinc-800 font-semibold text-2xl mt-5 w-3/4">
                Account Settings
            </h4>
            <div className="w-3/4  bg-white   rounded-xl shadow-sm">
                <ProfileAccount userData={userData} />
            </div>
        </section>


    )
}

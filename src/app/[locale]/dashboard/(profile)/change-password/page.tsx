
import ChangePasswordForm from '@/app/[locale]/(main)/(profile)/profile/change-password/_components/change-password-form';
import React from 'react';


export default function ChangePassword() {
  return (
    <section className="flex flex-col gap-4 w-full items-center bg-[#FAFAFA] ">
      <h4 className="text-zinc-800 font-semibold text-2xl  w-full">Change Password</h4>
      <div className="w-full m-5 bg-white p-6 rounded-xl shadow-sm">
        <ChangePasswordForm />
      </div>
    </section>
  );
}

import React from 'react'
import ChangePasswordForm from '../../../(profile)/profile/change-password/_components/change-password-form'

export default function ChangePassword() {
    return (
        <section className="flex flex-col gap-4 w-full items-center bg-[#FAFAFA] ">
            <h4 className="text-zinc-800 font-semibold text-2xl mt-5 w-3/4">
                Change Password
            </h4>
            <div className='w-3/4 m-5 bg-white p-6 rounded-xl shadow-sm'>
                <ChangePasswordForm />
            </div>
        </section>
    )
}

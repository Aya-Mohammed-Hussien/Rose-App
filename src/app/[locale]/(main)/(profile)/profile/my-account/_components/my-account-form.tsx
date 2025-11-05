'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { CloudUpload, Loader2, Trash } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { profileSchema, profileValues } from '@/lib/schemes/profile.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { GENDER } from '@/lib/constants/auth.constant';
import {
  FormField,
  FormLabel,
  FormItem,
  FormControl,
  FormMessage,
  Form,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PhoneInput } from '@/components/ui/phone-input';
import { GetUserResponse } from '@/lib/types/user-data';
import { useEditProfile } from '@/hooks/profile/use-edit-profile';
import { useUploadProfileImage } from '@/hooks/profile/use-upload-profile-image';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useDeleteAccount } from '@/hooks/profile/use-delete-account.action';
import ConfirmationModal from '@/components/shared/confirmation-modal';

// Props
type MyAccountProps = {
  userData: GetUserResponse;
};

export default function MyAccountForm({ userData }: MyAccountProps) {
  // Ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mutation
  const { mutate: editProfile, isPending } = useEditProfile();
  const { deleteMyAccount, isPendingDelete } = useDeleteAccount();
  const { uploadImage, isPendingImage } = useUploadProfileImage();

  // State
  const [preview, setPreview] = useState<string | null>(null);

  // Form
  const form = useForm<profileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      gender: GENDER.MALE,
    },
  });

  // Functions
  // Submit handler for saving profile changes
  const onSubmit: SubmitHandler<profileValues> = (value) => {
    const { gender, ...payload } = value;
    editProfile(payload);
  };

  // Trigger file input click
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Handle file selection and upload
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      // Show preview using FileReader
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Prepare FormData for upload
      const formData = new FormData();
      formData.append('photo', file);

      // Upload image via mutation
      uploadImage(formData, {
        onError: () => {
          // reset preview on error
          setPreview(null);
        },
      });
    }
  };

  // Effects
  useEffect(() => {
    // Fill form inputs when user data is loaded from server
    if (userData?.user) {
      form.reset({
        firstName: userData.user.firstName || '',
        lastName: userData.user.lastName || '',
        email: userData.user.email || '',
        phone: userData.user.phone || '',
        gender: userData.user.gender as profileValues['gender'],
      });

      // reset preview when user data changes
      setPreview(null);
    }
  }, [userData, form]);

  return (
    <section className="flex flex-col gap-4">
      {/* Header Section */}
      <header className="w-full flex items-center gap-4 h-28 ">
        {/* Profile Picture */}
        <div className="relative">
          {/* Avatar */}
          <Avatar className="h-28 w-28">
            {/* Image */}
            <AvatarImage src={preview || userData.user.photo} alt="User avatar" />

            {/* Fallback (First letters of name) */}
            <AvatarFallback>
              {userData.user.firstName?.charAt(0).toUpperCase()}
              {userData.user.lastName?.charAt(0).toUpperCase()}
            </AvatarFallback>

            {/* Show loader overlay while uploading */}
            {isPendingImage && (
              <div className="absolute inset-0 bg-white/60 flex items-center justify-center rounded-full">
                <Loader2 className="animate-spin text-zinc-700" />
              </div>
            )}
          </Avatar>

          {/* Upload Button */}
          <Button
            type="button"
            variant="secondary"
            size="icon"
            className="absolute -bottom-1 -right-1 w-[36px] h-[36px] rounded-full"
            aria-label="Upload photo"
            disabled={isPendingImage}
            onClick={handleUploadClick}
          >
            {/* Icon */}
            <CloudUpload width={20} height={20} />
          </Button>

          {/* Hidden file input */}
          <input
            aria-label="upload button"
            type="file"
            ref={fileInputRef}
            disabled={isPendingImage}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col  h-16 gap-4">
          {/* Title */}
          <h3 className="text-xl text-zinc-800 font-semibold">Upload Photo</h3>
          {/* Description */}
          <p className="text-base text-zinc-500">
            You can upload a .jpg, .png, or .gif photo with max size of 5MB.
          </p>
        </div>
      </header>

      {/* Form Section */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-[0.625rem]">
          {/* First Name and Last Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-5">
            {/* FirstName Field */}
            <FormField
              name="firstName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  {/* FirstName Label */}
                  <FormLabel className="font-medium text-base text-zinc-800">First name</FormLabel>
                  <FormControl>
                    {/* FirstName Input */}
                    <Input placeholder="Ahmed" className="w-full h-12" {...field} />
                  </FormControl>
                  {/* Feedback message */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* LastName Field */}
            <FormField
              name="lastName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  {/* LastName Label */}
                  <FormLabel className="font-medium text-base text-zinc-800">Last name</FormLabel>
                  <FormControl>
                    {/* LastName Input */}
                    <Input placeholder="Abdullah" className="w-full h-12" {...field} />
                  </FormControl>
                  {/* Feedback message */}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Email Field*/}
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                {/* Email Label */}
                <FormLabel className="text-base font-medium">Email</FormLabel>
                <FormControl>
                  {/* Email Input */}
                  <Input
                    type="email"
                    placeholder="user@example.com"
                    className="w-full h-12"
                    {...field}
                  />
                </FormControl>
                {/* Feedback message */}
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone Field */}
          <FormField
            name="phone"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                {/* Phone Label */}
                <FormLabel className="text-base font-medium">Phone</FormLabel>
                <FormControl>
                  {/* Phone Input */}
                  <PhoneInput
                    {...field}
                    placeholder="1012345678"
                    defaultCountry="EG"
                    international
                  />
                </FormControl>
                {/* Feedback message */}
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Gender Field*/}
          <FormField
            name="gender"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                {/* Gender Label */}
                <FormLabel aria-disabled className="text-base text-zinc-400 font-medium">
                  Gender
                </FormLabel>
                <FormControl>
                  {/* Gender Input */}
                  <Input
                    disabled={true}
                    className="w-full h-12 border-none bg-zinc-100 capitalize"
                    {...field}
                  />
                </FormControl>
                {/* Feedback message */}
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Delete Account - Save Changes */}
          <div className="w-full h-[6.5rem] flex items-end justify-between">
            {/* Confirmation Modal */}
            <ConfirmationModal
              deleteMyAccount={deleteMyAccount}
              isPendingDelete={isPendingDelete}
            />

            {/* Save Button */}
            <Button disabled={isPending} type="submit" className="px-4 py-3" variant="default">
              Save Changes
              {/* Pending State*/}
              {isPending && <Loader2 className="animate-spin" />}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}

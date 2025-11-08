'use client';

import { uploadProfileImage } from '@/lib/actions/profile/upload-profile-image.action';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '../use-toast';
import { useTranslations } from 'next-intl';

/**
 * Custom hook to handle uploading a user's profile image.
 *
 * Provides a mutation function to upload an image and tracks the upload state.
 *
 *
 * @returns {Object}
 *   - uploadImage: function to call with FormData containing the image
 *   - isPendingImage: boolean indicating if the upload is in progress
 */
export const useUploadProfileImage = () => {
  // Translation
  const t = useTranslations('profile.my-account.toast');

  // Hooks
  const { toast } = useToast();

  // React Query mutation for upload profile image
  const { mutate: uploadImage, isPending: isPendingImage } = useMutation({
    // Function to call the API
    mutationFn: (formData: FormData) => uploadProfileImage(formData),

    // On successful upload profile image
    onSuccess: () => {
      toast({
        title: t('upload-image-success'),
      });
    },

    // On Error during uploading profile image
    onError: (error) => {
      toast({
        title: t('upload-image-error'),
        description: String(error.message),
        variant: 'destructive',
      });
    },
  });

  return { uploadImage, isPendingImage };
};

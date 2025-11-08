'use client';

import { editProfile } from '@/lib/actions/profile/edit-profile.action';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '../use-toast';
import { profileValues } from '@/lib/schemes/profile.schema';
import { useTranslations } from 'next-intl';

/**
 * Custom hook to handle editing the user's profile.
 *
 * Provides a mutation function to update profile data and tracks its loading state.
 *
 * @returns {Object} React Query mutation object:
 *   - mutate: function to call with profile data to save changes
 *   - isPending: boolean indicating if the mutation is in progress
 *   - isError: boolean indicating if an error occurred
 *   - error: the error object if mutation fails
 */
export const useEditProfile = () => {
  // translation
  const t = useTranslations('profile.my-account.toast');

  // Hooks
  const { toast } = useToast();

  // React Query mutation for changing password
  const mutation = useMutation({
    // Function to call the API
    mutationFn: (userData: Omit<profileValues, 'gender'>) => editProfile(userData),

    // On successful edit profile
    onSuccess: (d) => {
      toast({
        variant: 'default',
        description: t('edit-profile-success'),
      });
    },

    // On Error during editing profile
    onError: (error: Error) => {
      const errorMessage = error?.message || t('edit-profile-error');
      toast({
        variant: 'destructive',
        description: errorMessage,
      });
    },
  });

  return mutation;
};

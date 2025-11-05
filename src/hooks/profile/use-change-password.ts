'use client';

import { changePassword } from '@/lib/actions/profile/change-password.action';
import { changePasswordValues } from '@/lib/schemes/change-password.schema';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '../use-toast';
import { useRouter } from '@/i18n/navigation';

/**
 * Custom hook to handle changing user password.
 *
 * Provides a mutation function to update the password and tracks its loading state.
 *
 * @returns {Object}
 *   - updatePassword: function to call with user data to change password
 *   - isPending: boolean indicating if the mutation is in progress
 */
export const useChangePassword = () => {
  // Hooks
  const { toast } = useToast();
  const router = useRouter();

  // React Query mutation for changing password
  const { mutate: updatePassword, isPending } = useMutation({
    // Function to call the API
    mutationFn: (userData: Omit<changePasswordValues, 'confirmNewPassword'>) =>
      changePassword(userData),

    // On successful password change
    onSuccess: () => {
      toast({
        variant: 'default',
        description: 'Your password has been changed successfully',
      });

      // Redirect user to login page after short delay
      setTimeout(() => router.push('/login'), 800);
    },

    // On error during password change
    onError: (error) => {
      toast({
        variant: 'destructive',
        description: error.message,
      });
    },
  });

  return { updatePassword, isPending };
};

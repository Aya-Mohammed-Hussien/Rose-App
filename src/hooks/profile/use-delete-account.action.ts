'use client';

import { deleteAccount } from '@/lib/actions/profile/delete-account.action';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '../use-toast';
import { useRouter } from '@/i18n/navigation';

/**
 * Custom hook to handle deleting the current user account.
 *
 * Provides a mutation function to delete the account and tracks its loading state.
 *
 * @returns {Object}
 *   - deleteMyAccount: function to call to delete the account
 *   - isPendingDelete: boolean indicating if the mutation is in progress
 */
export const useDeleteAccount = () => {
  // Hooks
  const { toast } = useToast();
  const router = useRouter();

  // React Query mutation for changing password
  const { mutate: deleteMyAccount, isPending: isPendingDelete } = useMutation({
    // Function to call the API
    mutationFn: () => deleteAccount(),

    // On successful delete account
    onSuccess: () => {
      toast({
        variant: 'default',
        description: 'Your account has been deleted successfully',
      });

      // Redirect user to login page after deleting account
      router.push('login');
    },

    // On Error during deleting account
    onError: (error) => {
      toast({
        variant: 'destructive',
        description: error.message || 'Unexpected error occurred',
      });
    },
  });

  return { deleteMyAccount, isPendingDelete };
};

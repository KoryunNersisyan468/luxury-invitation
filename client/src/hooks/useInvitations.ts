import { useState, useEffect } from 'react';
import { invitationService } from '@/api';
import { InvitationListItem } from '@/types';

interface UseInvitationsResult {
  data: InvitationListItem[] | null;
  isLoading: boolean;
  error: Error | null;
}

export function useInvitations(): UseInvitationsResult {
  const [data, setData] = useState<InvitationListItem[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchInvitations = async () => {
      try {
        const invitations = await invitationService.getAll();
        setData(invitations);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchInvitations();
  }, []);

  return { data, isLoading, error };
}
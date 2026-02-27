import { getOccasionById } from './get-occasion-by-Id';
import type { Occasion } from '@/lib/types/occasion';

type OccasionResponse = { message: string; occasion: Occasion };

export async function getSpecificOccasion(occasionId: string): Promise<
  | OccasionResponse
  | { occasion?: never; error: string }
> {
  try {
    const data = await getOccasionById(occasionId);
    return data;
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : 'Failed to fetch occasion',
    };
  }
}

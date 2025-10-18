import { OccasionsApiResponse } from "@/lib/types/occasion";

export const getOccasions = async (): Promise<OccasionsApiResponse> => {
  try {
    const response = await fetch(
      "https://flower.elevateegy.com/api/v1/occasions?limit=4"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch occasions");
    }
    const payload: OccasionsApiResponse = await response.json();
    return payload;
  } catch (error) {
    throw new Error("Failed to fetch occasions");
  }
};

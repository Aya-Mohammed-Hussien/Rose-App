import { getToken } from "@/lib/utils/get-token.util";

export async function getProfileData() {
  // Get token from server
  const token = await getToken();
  
  const api = process.env.NEXT_PUBLIC_API;

  if (!token) {
    throw new Error("Token not found");
  }

  // Fetch user profile
  const res = await fetch(`${api}/auth/profile-data`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch profile data");
  }

  return res.json();
}

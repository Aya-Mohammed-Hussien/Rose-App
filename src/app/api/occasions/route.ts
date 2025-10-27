// app/api/occasions/route.ts
import { NextResponse } from "next/server";

// Handle GET requests for fetching occasions
export async function GET(req: Request) {
  try {
    // Parse query params (page & limit)
    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page") ?? "1";
    const limit = searchParams.get("limit") ?? "4";

    // Fetch data from external API (no cache)
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API}/occasions?page=${page}&limit=${limit}`,
      { cache: "no-store" }
    );

    // Handle failed response
    if (!res.ok) throw new Error("Failed to fetch occasions");

    // Return fetched data as JSON
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load occasions" },
      { status: 500 }
    );
  }
}

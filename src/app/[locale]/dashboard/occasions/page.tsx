import { getOccasions } from "@/lib/apis/occasions/alloccasions-dashboard.api";
import AllOccasions from "./_components/occasions";

export default async function OccasionsPage({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
    const page = Number(searchParams.page) || 1;
    const search = String(searchParams.search) || '';

    const data = await getOccasions(Number(page), search);

    return (
        <AllOccasions
            occasions={data.occasions}
            metadata={data.metadata}
            initialSearch={search}
        />
    );
}

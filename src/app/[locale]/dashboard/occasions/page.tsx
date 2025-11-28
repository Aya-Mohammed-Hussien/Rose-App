import { getOccasions } from "@/lib/apis/occasions/alloccasions-dashboard.api";
import AllOccasions from "./_components/occasions";

export default async function OccasionsPage({ searchParams }: { searchParams: any }) {
    const page = searchParams.page || 1;
    const search = searchParams.search || '';

    const data = await getOccasions(page, search);

    return (
        <AllOccasions
            occasions={data.occasions}
            metadata={data.metadata}
            initialSearch={search}
        />
    );
}

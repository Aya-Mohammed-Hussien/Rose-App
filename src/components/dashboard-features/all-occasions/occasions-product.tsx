import { getOccasions } from '@/lib/apis/occasions/get-all-occasions.api';
import AllOccasionsProduct from './all-occasions-product';

// Props
interface PageProps {
    searchParams: { page?: string };
}

export default async function OccasionsProduct({ searchParams }: PageProps) {
    // Number of Page
    const currentPage = Number(searchParams.page) || 1;

    // Data
    const data = await getOccasions(currentPage, '');

    return (
        <AllOccasionsProduct
            products={data.occasions}
            metadata={data.metadata}
        />
    );
}

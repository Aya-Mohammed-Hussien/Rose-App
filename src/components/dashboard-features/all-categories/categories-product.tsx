import { getAllCategories } from '@/lib/apis/categories/get-all-categories.api';
import AllCategoriesProduct from './all-categories-product';

// Props
interface PageProps {
    searchParams: { page?: string };
}

export default async function CategoriesProduct({ searchParams }: PageProps) {

    // Number of Page
    const currentPage = Number(searchParams.page) || 1;

    // Data
    const data = await getAllCategories(currentPage);
    

    return (
        <div>
            <AllCategoriesProduct
                products={data.categories}
                metadata={data.metadata}
            />
        </div>
    );
}
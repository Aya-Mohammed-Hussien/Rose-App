import { notFound } from "next/navigation";
import { getSpecificCategory } from "@/lib/apis/categories/get-sepecific-categories.api";
import UpdateCategoryForm from "../[id]/_components/update-category";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function UpdateCategoryPage({ params }: PageProps) {
    // Params
    const { id } = await params;

    // Fetch Data
    const result = await getSpecificCategory(id);

    if ('error' in result || !result.category) {
        notFound();
    }

    const category = result.category;

    return (
        <section className="w-full min-h-screen bg-zinc-50 flex justify-center">
            <UpdateCategoryForm
                key={category._id}
                id={category._id}
                name={category.name}
                image={category.image}
            />
        </section>
    );
}
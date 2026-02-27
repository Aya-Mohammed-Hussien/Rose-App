import { notFound } from "next/navigation";
import { getSpecificOccasion } from "@/lib/apis/occasions/get-specific-occasion.api";
import UpdateOccasionForm from "./_components/update-occasion";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function UpdateOccasionPage({ params }: PageProps) {
    const { id } = await params;

    const result = await getSpecificOccasion(id);

    if ('error' in result || !result.occasion) {
        notFound();
    }

    const occasion = result.occasion;

    return (
        <section className="w-full min-h-screen bg-zinc-50 flex justify-center">
            <UpdateOccasionForm
                key={occasion._id}
                id={occasion._id}
                name={occasion.name}
                image={occasion.image}
            />
        </section>
    );
}

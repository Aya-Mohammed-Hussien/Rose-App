import { getOccasionById } from "@/lib/apis/occasions/get-occasion-by-Id";
import UpdateOccasion from "../_components/update-occasions";

export default async function UpdateOccasionPage({ params }: { params: { id: string } }) {
    try {
        const res = await getOccasionById(params.id);


        const occasionData = res.occasion;

        return <UpdateOccasion occasion={occasionData} />;
    } catch (err) {
        console.error("Failed to fetch occasion:", err);
        return <div className="text-center text-red-600 p-10">
            Failed to load occasion.
        </div>;
    }
}

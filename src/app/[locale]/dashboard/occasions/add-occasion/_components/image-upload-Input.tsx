import { Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRef } from "react";

interface ImageUploadInputProps {
    selectedFile: File | undefined;
    onFileSelect: (file: File | undefined) => void;
    uploadLabel: string;
}

export default function ImageUploadInput({
    selectedFile,
    onFileSelect,
    uploadLabel,
}: ImageUploadInputProps) {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleClick = () => fileInputRef.current?.click();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        onFileSelect(file);

        // Select the same img
        e.target.value = "";
    };

    return (
        <div
            className="w-3/4 h-10 border border-zinc-300 rounded-xl flex items-center justify-between px-3 cursor-pointer hover:border-zinc-400 transition-colors"
            onClick={handleClick}
        >
            <span className="text-sm text-zinc-500 truncate">
                {selectedFile?.name ?? ""}
            </span>

            <span className="text-red-500 flex items-center gap-1 text-sm whitespace-nowrap ml-2">
                <Upload size={18} />
                {uploadLabel}
            </span>

            <Input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
            />
        </div>
    );
}

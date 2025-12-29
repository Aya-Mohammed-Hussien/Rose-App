"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";

import { Occasion } from "@/lib/types/occasion";
import { useUpdateOccasion } from "@/hooks/occasions/use-update-occasion";



// Schema 
const schema = z.object({
    name: z.string().min(1, "Name is required"),
    image: z.any().optional(),
});

type FormType = z.infer<typeof schema>;

export default function UpdateOccasion({ occasion }: { occasion: Occasion }) {
    // State
    const [preview] = useState<string | null>(null);

    // Mutation
    const updateMutation = useUpdateOccasion();

    // Form & validation
    const form = useForm<FormType>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: occasion?.name || "",
        },
    });

    // Effects
    useEffect(() => {
        if (occasion) {
            form.reset({
                name: occasion.name || "",
            });
        }
    }, [occasion, form]);

    // Functions
    const onSubmit = async (data: FormType) => {
        const formData = new FormData();
        formData.append("name", data.name);

        if (data.image && data.image instanceof FileList && data.image.length > 0) {
            formData.append("image", data.image[0]);
        }

        updateMutation.mutate({ id: occasion._id, form: formData });
    };

    return (
        <div className="p-6">
            <h1 className="text-xl font-semibold text-gray-900 mb-6">
                Update Occasion:
                <span className="font-bold ml-1 text-maroon-700">
                    {occasion?.name}
                </span>
            </h1>

            <div className="w-full bg-gray-50 rounded-xl p-8">
                <Card className="w-full bg-white rounded-xl shadow-sm">
                    <CardContent className="p-8">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                                {/* NAME */}
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input {...field} className="h-12" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* CURRENT IMAGE */}
                                {occasion?.image && !preview && (
                                    <div className="mb-4">
                                        <FormLabel className="font-medium text-gray-700 block mb-2">
                                            Occasion Image
                                        </FormLabel>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="text-blue-600 border-blue-300 hover:bg-blue-50"
                                            onClick={() => window.open(occasion.image, "_blank")}
                                        >
                                            View occasion image
                                        </Button>
                                    </div>
                                )}

                                {/* PREVIEW */}
                                {preview && (
                                    <Image
                                        src={preview}
                                        alt="Preview"
                                        className="w-40 h-40 object-cover rounded-lg border mb-4"
                                    />
                                )}

                                <Button
                                    type="submit"
                                    className="w-full bg-maroon-600 hover:bg-maroon-700 text-white py-4 rounded-lg"
                                    disabled={updateMutation.isPending}
                                >
                                    {updateMutation.isPending ? "Updating..." : "Update Occasion"}
                                </Button>

                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

"use client";

import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";

import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { useAddOccasion } from "@/hooks/occasions/use-add-occasion";



//  Schema
const schema = z.object({
    name: z.string().min(1, "Name is required"),
    image: z.instanceof(File).optional(),
});

type FormType = z.infer<typeof schema>;


export default function AddOccasion() {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { mutate: createOccasion, isPending } = useAddOccasion();

    const form = useForm<FormType>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            image: undefined,
        },
    });

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const onSubmit = (data: FormType) => {
        const fd = new FormData();
        fd.append("name", data.name);
        if (data.image) fd.append("image", data.image);

        createOccasion(fd);
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add a New Occasion</h2>
            <div className="container mx-auto flex justify-center items-center p-6 gap-32 bg-gray-50 rounded-xl">
                <Card className="w-full max-w-4xl p-6 shadow-md rounded-2xl bg-white">

                    <CardContent className="space-y-6">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                                {/* Name */}
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-700 font-medium">
                                                Name <span className="text-red-500">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter occasion name"
                                                    className="rounded-xl h-12 border-gray-300"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Image Upload */}
                                <FormField
                                    control={form.control}
                                    name="image"
                                    render={() => (
                                        <FormItem>
                                            <FormLabel className="text-gray-700 font-medium">
                                                Occasion Image <span className="text-red-500">*</span>
                                            </FormLabel>

                                            <FormControl>
                                                <>
                                                    <Input
                                                        type="file"
                                                        ref={fileInputRef}
                                                        className="hidden"
                                                        onChange={(e) => {
                                                            const file = e.target.files?.[0];
                                                            form.setValue("image", file);
                                                        }}
                                                    />

                                                    <div
                                                        className="flex items-center justify-between border rounded-xl px-4 py-3 text-gray-500 cursor-pointer hover:bg-gray-100 transition"
                                                        onClick={handleUploadClick}
                                                    >
                                                        <span className="text-gray-400">Upload file</span>
                                                        <Upload className="w-5 h-5 text-red-600" />
                                                    </div>
                                                </>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button
                                    type="submit"
                                    disabled={isPending}
                                    className="w-full bg-red-700 hover:bg-red-800 text-white py-4 rounded-xl text-base font-medium"
                                >
                                    {isPending ? "Adding..." : "Add Occasion"}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

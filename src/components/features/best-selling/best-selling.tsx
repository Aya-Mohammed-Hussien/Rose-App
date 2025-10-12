"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  VectorSquare,
} from "lucide-react";
import { Product } from "@/lib/types/product";
import ProductCard from "../product-card/product-card";
import { Button } from "@/components/ui/button";

// props
type BestSellingProps = {
  bestSelling: Product[];
};

export default function BestSelling({ bestSelling }: BestSellingProps) {
  return (
    <>
      <section className=" container mx-auto px-4 ">
        <div className="grid grid-cols-4 gap-9">
          {/* aside */}
          <aside className="col-span-1 flex flex-col gap-2    ">
            {/* title */}
            <header className=" text-[#FF668B] font-bold   uppercase ">
              best selling
            </header>

            {/* description */}
            <h4 className="text-[#741C21] font-bold capitalize text-3xl">
              {" "}
              <span className="text-[#FF668B]">check out</span> what everyone's
              <span className="text-[#FF668B]"> buying</span> right now
            </h4>

            {/* details */}
            <p className="text-zinc-500">
              Not sure what to choose? Start with our best sellers, these are
              the gifts our customers keep coming back for. Whether you're
              celebrating a birthday, anniversary or wedding, our top picks are
              guaranteed to leave a lasting impression.{" "}
            </p>

            {/* gifts button */}
            <div className="h-full flex  items-end">
              <Button className="text-white bg-[#A6252A] rounded-lg hover:bg-[#A6252A] ">
                Explore gifts <ArrowRight />
              </Button>
            </div>
          </aside>

          {/* Carousel */}
          <div className="col-span-3 relative">
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full  "
            >
              {/* content */}
              <CarouselContent>
                {/* product card (carousel item) */}
                {bestSelling.map((product) => (
                  <CarouselItem className=" w-full basis-1/3" key={product._id}>
                    <div className="p-1">
                      <ProductCard product={product} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* previous arrow */}
              <CarouselPrevious className="absolute left-[-15px] top-[40%] text-white  hover:text-white  bg-[#A6252A] hover:bg-[#A6252A] border-none shadow-md rounded-full w-10 h-10 ">
                {" "}
                {/* icon */}
                <ChevronLeft className="w-5 h-5 text-white" />{" "}
              </CarouselPrevious>

              {/* next arrow */}
              <CarouselNext className="absolute right-[-15px] top-[40%] text-white hover:text-white  bg-[#A6252A] hover:bg-[#A6252A] border-none shadow-md rounded-full w-10 h-10 ">
                {/* icon */}
                <ChevronRight className="w-5 h-5 text-white" />
              </CarouselNext>
            </Carousel>
          </div>
        </div>
      </section>
    </>
  );
}

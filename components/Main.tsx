"use client";

import React, { Suspense } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import Loading from "@/app/loading";
import { useCartStore, useSuperUserStore } from "@/store/store";
import SuperUserMode from "./SuperUserMode";
import { XIcon } from "lucide-react";
import { Product } from "@/data/products";

export default function Main() {
  const { addToCart } = useCartStore();
  const {
    products,
    deleteProduct,
    isAdmin,
    selectedCardId,
    setSelectedCard,
    prefillForm,
  } = useSuperUserStore();

  const handleCardSelect = (product: Product) => {
    if (isAdmin) {
      setSelectedCard(product.id);
      prefillForm(product);
    }
  };

  return (
    <Suspense fallback={<Loading />}>
      <ScrollArea className="relative w-full">
        <main className=" grid w-full grid-cols-3 gap-8 p-12">
          {products.map((product) => (
            <Card
              key={product.id}
              className={`relative h-fit cursor-pointer transition-all duration-300 ease-in-out
              ${isAdmin ? "hover:scale-105" : ""}
              ${
                isAdmin && selectedCardId === product.id
                  ? "scale-105 border-2 border-primary shadow-lg"
                  : ""
              }`}
              onClick={() => handleCardSelect(product)}
            >
              {isAdmin && (
                <Button
                  variant="destructive"
                  className="absolute right-2 top-2 z-10 size-8 rounded-full bg-foreground p-0 transition-all duration-300 ease-in-out hover:scale-110"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteProduct(product.id);
                  }}
                >
                  <XIcon />
                </Button>
              )}
              <CardHeader>
                <CardTitle className="text-xl">{product.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative h-48 w-full">
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    layout="fill"
                    objectFit="contain"
                    className="rounded-md"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <span className="font-semibold text-foreground">
                  {product.price.toFixed(2)} €
                </span>
                <Button
                  className="bg-foreground font-bold"
                  onClick={() => addToCart(product)}
                >
                  Add to basket
                </Button>
              </CardFooter>
            </Card>
          ))}
        </main>
        <SuperUserMode />
      </ScrollArea>
    </Suspense>
  );
}

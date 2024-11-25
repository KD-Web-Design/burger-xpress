import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import products from "../data/products.json";

export default function Main() {
  return (
    <main className="grid w-full grid-cols-3 gap-8 overflow-y-auto p-12">
      {products.map((product, index) => (
        <Card key={index} className="h-fit">
          <CardHeader>
            <CardTitle className="text-xl">{product.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative h-48 w-full">
              <Image
                src={product.image}
                alt={product.title}
                layout="fill"
                objectFit="contain"
                className="rounded-md"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <span>{product.price.toFixed(2)} €</span>
            <Button className="bg-foreground font-bold " size="sm">
              Add to basket
            </Button>
          </CardFooter>
        </Card>
      ))}
    </main>
  );
}

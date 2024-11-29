"use client";

import { useUserStore } from "@/store/store";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent } from "./ui/card";

export default function SuperUserMode() {
  const [productName, setProductName] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productPrice, setProductPrice] = useState<number | string>("");
  const [inStock, setInStock] = useState(true);
  const { isAdmin } = useUserStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      name: productName,
      image: productImage,
      price: parseFloat(productPrice as string),
      inStock,
    });
    // Ajouter ici la logique pour stocker les produits
  };

  if (!isAdmin) return null;

  return (
    <Tabs
      defaultValue="add"
      className="absolute bottom-0 w-full bg-gray-100 p-4"
    >
      <TabsList>
        <TabsTrigger value="add">Add a product</TabsTrigger>
        <TabsTrigger value="modify">Modify a product</TabsTrigger>
      </TabsList>
      <TabsContent value="add">
        <Card>
          <CardContent className="space-y-2 pt-6">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Input
                type="text"
                placeholder="Nom du produit"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="border p-2"
              />
              <Input
                type="url"
                placeholder="URL de l'image"
                value={productImage}
                onChange={(e) => setProductImage(e.target.value)}
                className="border p-2"
              />
              <Input
                type="number"
                placeholder="Prix du produit"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                className="border p-2"
              />
              <Label className="flex items-center gap-2">
                <Input
                  type="checkbox"
                  checked={inStock}
                  onChange={(e) => setInStock(e.target.checked)}
                />
                En stock
              </Label>
              <Button type="submit">Submit</Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

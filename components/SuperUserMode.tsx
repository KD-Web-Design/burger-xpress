/* eslint-disable @next/next/no-img-element */
"use client";

import { useUserStore } from "@/store/store";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent, CardHeader } from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function SuperUserMode() {
  const [productName, setProductName] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productPrice, setProductPrice] = useState<number | string>("");
  const [inStock, setInStock] = useState(true);
  const { isAdmin } = useUserStore();

  const isValidUrl = (urlString: string) => {
    try {
      return Boolean(new URL(urlString));
    } catch {
      return false;
    }
  };

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
      className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-lg p-4 shadow-lg backdrop-blur-md transition-all duration-300 ease-in-out animate-in fade-in-0 slide-in-from-bottom-8"
    >
      <TabsList>
        <TabsTrigger value="add">Add a product</TabsTrigger>
        <TabsTrigger value="modify">Modify a product</TabsTrigger>
      </TabsList>
      <TabsContent value="add">
        <Card className="flex items-center justify-center gap-4 p-6">
          <CardHeader>
            <img
              src={
                productImage && isValidUrl(productImage)
                  ? productImage
                  : "/img/no-image.png"
              }
              alt=""
              width={70}
              height={70}
              className="object-contain"
            />
          </CardHeader>
          <CardContent className="space-y-2 p-0">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Input
                type="text"
                placeholder="Name of the product"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="border p-2"
              />
              <Input
                type="url"
                placeholder="Image URL"
                value={productImage}
                onChange={(e) => setProductImage(e.target.value)}
                className="border p-2"
              />
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Product price"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                  className="border p-2"
                />
                <Select
                  onValueChange={(value) => setInStock(value === "in-stock")}
                >
                  <SelectTrigger>
                    <SelectValue
                      defaultValue="in-stock"
                      placeholder="In stock"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="in-stock">In stock</SelectItem>
                    <SelectItem value="sold-out">Sold out</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* <Label className="flex items-center gap-2">
                <Input
                  type="checkbox"
                  checked={inStock}
                  onChange={(e) => setInStock(e.target.checked)}
                />
                En stock
              </Label> */}
              <Button type="submit">Add new product</Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="modify">
        <Card className="flex items-center justify-center gap-4 p-6">
          <CardHeader>
            <img
              src={
                productImage && isValidUrl(productImage)
                  ? productImage
                  : "/img/no-image.png"
              }
              alt=""
              width={70}
              height={70}
              className="object-contain"
            />
          </CardHeader>
          <CardContent className="space-y-2 p-0">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Input
                type="text"
                placeholder="Name of the product"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="border p-2"
              />
              <Input
                type="url"
                placeholder="Image URL"
                value={productImage}
                onChange={(e) => setProductImage(e.target.value)}
                className="border p-2"
              />
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Product price"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                  className="border p-2"
                />
                <Select
                  onValueChange={(value) => setInStock(value === "in-stock")}
                >
                  <SelectTrigger>
                    <SelectValue
                      defaultValue="in-stock"
                      placeholder="In stock"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="in-stock">In stock</SelectItem>
                    <SelectItem value="sold-out">Sold out</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* <Label className="flex items-center gap-2">
                <Input
                  type="checkbox"
                  checked={inStock}
                  onChange={(e) => setInStock(e.target.checked)}
                />
                En stock
              </Label> */}
              <span className="text-center text-sm text-foreground">
                Click on a product to modify.
              </span>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

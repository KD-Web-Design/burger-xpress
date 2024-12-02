/* eslint-disable @next/next/no-img-element */
"use client";

import { useSuperUserStore } from "@/store/store";
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
import { toast } from "@/hooks/use-toast";
import Image from "next/image";
import { EuroIcon, ForkKnife, ImageIcon, PackageIcon } from "lucide-react";

export default function SuperUserMode() {
  const {
    isAdmin,
    addProduct,
    selectedCardId,
    products,
    updateProduct,
    productName,
    productImage,
    productPrice,
    inStock,
    setProductName,
    setProductImage,
    setProductPrice,
    setInStock,
    resetForm,
  } = useSuperUserStore();

  const selectedProduct = products.find(
    (product) => product.id === selectedCardId
  );

  const isValidUrl = (urlString: string) => {
    try {
      return Boolean(new URL(urlString));
    } catch {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName || !productImage || !productPrice) {
      toast({
        title: "Error",
        description: "❌ Please fill all fields",
        variant: "destructive",
      });
      return;
    }

    const productData = {
      title: productName,
      imageUrl: productImage,
      price: parseFloat(productPrice as string),
      inStock,
    };

    if (selectedCardId) {
      updateProduct(selectedCardId, productData);
    } else {
      addProduct(productData);
    }
    resetForm();
  };

  if (!isAdmin) return null;

  return (
    <Tabs
      defaultValue="add"
      className="absolute bottom-0 left-1/2 z-20 -translate-x-1/2 translate-y-0 rounded-lg p-4 shadow-lg backdrop-blur-md"
    >
      <TabsList>
        <TabsTrigger value="add">Add a product</TabsTrigger>
        <TabsTrigger value="update">Update a product</TabsTrigger>
      </TabsList>
      <TabsContent value="add">
        <Card className="flex items-center justify-center gap-4 p-6">
          <CardHeader>
            <Image
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
              <div className="relative flex items-center">
                <ForkKnife
                  className="absolute left-2 text-gray-500"
                  size={16}
                />
                <Input
                  type="text"
                  placeholder="Name of the product"
                  onChange={(e) => setProductName(e.target.value)}
                  className="border p-2 pl-8"
                />
              </div>
              <div className="relative flex items-center">
                <ImageIcon
                  className="absolute left-2 text-gray-500"
                  size={16}
                />
                <Input
                  type="url"
                  placeholder="Image URL"
                  onChange={(e) => setProductImage(e.target.value)}
                  className="border p-2 pl-8"
                />
              </div>
              <div className="flex gap-2">
                <div className="relative flex w-1/2 items-center">
                  <EuroIcon
                    className="absolute left-2 text-gray-500"
                    size={16}
                  />
                  <Input
                    type="number"
                    placeholder="Product price"
                    onChange={(e) => setProductPrice(e.target.value)}
                    className="border p-2 pl-8"
                  />
                </div>
                <div className="relative flex w-1/2 items-center">
                  <PackageIcon
                    className="absolute left-2 text-gray-500"
                    size={16}
                  />
                  <Select
                    onValueChange={(value) => setInStock(value === "in-stock")}
                  >
                    <SelectTrigger className="pl-8">
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
              </div>
              <Button type="submit">Add new product</Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="update">
        <Card className="flex items-center justify-center gap-4 p-6">
          {selectedProduct ? (
            <>
              <CardHeader>
                <img
                  src={
                    isValidUrl(productImage)
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
                  <div className="relative flex items-center">
                    <ForkKnife
                      className="absolute left-2 text-gray-500"
                      size={16}
                    />
                    <Input
                      type="text"
                      placeholder="Name of the product"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      className="border p-2 pl-8"
                    />
                  </div>
                  <div className="relative flex items-center">
                    <ImageIcon
                      className="absolute left-2 text-gray-500"
                      size={16}
                    />
                    <Input
                      type="url"
                      placeholder="Image URL"
                      value={productImage}
                      onChange={(e) => setProductImage(e.target.value)}
                      className="border p-2 pl-8"
                    />
                  </div>
                  <div className="flex gap-2">
                    <div className="relative flex w-1/2 items-center">
                      <EuroIcon
                        className="absolute left-2 text-gray-500"
                        size={16}
                      />
                      <Input
                        type="number"
                        placeholder="Product price"
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                        className="border p-2 pl-8"
                      />
                    </div>
                    <div className="relative flex w-1/2 items-center">
                      <PackageIcon
                        className="absolute left-2 text-gray-500"
                        size={16}
                      />
                      <Select
                        value={inStock ? "in-stock" : "sold-out"}
                        onValueChange={(value) =>
                          setInStock(value === "in-stock")
                        }
                      >
                        <SelectTrigger className="pl-8">
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
                  </div>
                  <Button type="submit">Update product</Button>
                </form>
              </CardContent>
            </>
          ) : (
            <p>Select a product to update</p>
          )}
        </Card>
      </TabsContent>
    </Tabs>
  );
}

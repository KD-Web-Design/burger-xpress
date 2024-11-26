"use client";

import { useCartStore } from "@/store/store";
import React, { useState } from "react";
import { Card, CardFooter } from "./ui/card";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

export default function Aside() {
  const { cart, totalPrice, removeItem } = useCartStore();
  const [hoveredItemId, setHoveredItemId] = useState<number | null>(null);
  const formattedTotalPrice = totalPrice.toFixed(2);

  const handleRemoveItem = (productId: number) => {
    removeItem(productId);
    setHoveredItemId(null); // Réinitialiser l'état hoveredItemId
  };
  return (
    <aside className="flex w-1/3 flex-col border-t border-foreground bg-white shadow-2xl">
      <div
        id="aside-top"
        className="flex justify-between bg-red-950 p-4 text-3xl font-semibold text-foreground"
      >
        <h1>Total</h1>
        <motion.div
          key={formattedTotalPrice} // Change d'état lorsque le prix change
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 30, opacity: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 10 }}
        >
          <span>{formattedTotalPrice} €</span>
        </motion.div>
      </div>
      <div
        id="aside-body"
        className="flex flex-1 flex-col items-center gap-4 p-4"
      >
        {cart.length === 0 ? (
          <motion.h2
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 10 }}
            className="my-auto text-2xl text-slate-800"
          >
            Your basket is empty. 😢
          </motion.h2>
        ) : (
          <>
            {cart.map((item) => (
              <motion.div
                key={item.product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                <Card
                  key={item.product.id}
                  className="relative flex h-fit w-full items-center justify-between gap-4 p-4"
                  onMouseEnter={() => setHoveredItemId(item.product.id)}
                  onMouseLeave={() => setHoveredItemId(null)}
                >
                  <div className="relative h-16 w-1/4">
                    <Image
                      src={item.product.image}
                      alt={item.product.title}
                      layout="fill"
                      objectFit="contain"
                      className="rounded-md"
                    />
                  </div>

                  <div className="flex flex-col">
                    <h2>{item.product.title}</h2>
                    <span className="font-semibold text-foreground">
                      {item.product.price.toFixed(2)} €
                    </span>
                  </div>
                  <CardFooter className="relative p-4">
                    <motion.span
                      key={item.quantity} // Change d'état lorsque la quantité change
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 20, opacity: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 120,
                        damping: 10,
                      }}
                      className="font-semibold text-foreground"
                    >
                      x {item.quantity}
                    </motion.span>
                    {hoveredItemId === item.product.id && (
                      <Button
                        variant="destructive"
                        className="absolute right-0 top-1/2 h-full -translate-y-1/2 bg-background"
                        onClick={() => handleRemoveItem(item.product.id)}
                      >
                        <Trash2 size={24} />
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </>
        )}

        {/* <h2 className="text-2xl text-slate-800">Your basket is empty. 😢</h2> */}
      </div>
      <div id="aside-footer" className="bg-red-950 p-4 text-center">
        <span className="text-xs">Made by KD Web Design</span>
      </div>
    </aside>
  );
}

import { create } from 'zustand'
import { persist } from 'zustand/middleware';

type Product = {
    id: number;
    title: string;
    image: string;
    price: number;
  };
  
  type CartItem = {
    product: Product;
    quantity: number;
  };
  
  type CartState = {
    cart: CartItem[];
    totalPrice: number;
    addToCart: (product: Product) => void;
    
    removeItem: (productId: number) => void;
    
  };

  export const useCartStore = create(persist<CartState>((set) => ({
    cart: [],
    totalPrice: 0,
  
    addToCart: (product) =>
      set((state) => {
        const existingItem = state.cart.find((item) => item.product.id === product.id);
  
        if (existingItem) {
          // Si le produit existe déjà, augmente la quantité
          const updatedCart = state.cart.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
  
          return {
            cart: updatedCart,
            totalPrice: state.totalPrice + product.price,
          };
        }
  
        // Ajouter un nouvel item au panier
        return {
          cart: [...state.cart, { product, quantity: 1 }],
          totalPrice: state.totalPrice + product.price,
        };
      }), 

      removeItem: (productId) =>
        set((state) => {
          const itemToRemove = state.cart.find((item) => item.product.id === productId);
    
          if (!itemToRemove) return state; // Si l'item n'existe pas, rien à faire
    
          const updatedCart = state.cart.filter((item) => item.product.id !== productId);
    
          return {
            cart: updatedCart,
            totalPrice: state.totalPrice - itemToRemove.product.price * itemToRemove.quantity,
          };
        }),
  }), {
    name: 'cart-storage',
  }));

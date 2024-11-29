import { Product } from '@/data/products';
import { create } from 'zustand'
import { persist } from 'zustand/middleware';

  
  type CartItem = {
    product: Product;
    quantity: number;
  };
  
  type CartState = {
    cart: CartItem[];
    totalPrice: number;
    addToCart: (product: Product) => void;
    removeItem: (productId: number) => void;
    clearCart: () => void;
  };

  interface UserState {
    username: string;
    setUsername: (name: string) => void;
    logout: () => void;
    isAdmin: boolean;
    toggleAdmin: () => void;
  }

  interface SuperUserState {
    isAdmin: boolean;
    toggleAdmin: () => void;
    products: Product[];
    addProduct: (product: Omit<Product, "id">) => void;
    updateProduct: (id: number, updatedProduct: Partial<Product>) => void;
  }
  
  export const useUserStore = create<UserState>((set) => ({
    username: "",
    setUsername: (name) => set({ username: name }),
    logout: () => {
      localStorage.removeItem('username');
      set({ username: "" })},
    isAdmin: false,
    toggleAdmin: () => set((state) => ({ isAdmin: !state.isAdmin })),
  }));

  export const useSuperUserStore = create<SuperUserState>((set) => ({
    isAdmin: false,
    toggleAdmin: () => set((state) => ({ isAdmin: !state.isAdmin })),
    products: [],
    addProduct: (product) =>
      set((state) => ({
        products: [
          ...state.products,
          { id: Date.now(), ...product },
        ],
      })),
      updateProduct: (id, updatedProduct) =>
        set((state) => ({
          products: state.products.map((product) =>
            product.id === id ? { ...product, ...updatedProduct } : product
          ),
        }),
      ),
  }));

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

        clearCart: () => set({ cart: [], totalPrice: 0 }),
}), {
  name: 'cart-storage',
}));

import { Product, products as initialProducts } from '@/data/products';
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
    removeItemFromCart: (productId: number) => void;
    clearCart: () => void;
  };

  interface UserState {
    username: string;
    setUsername: (name: string) => void;
    logout: () => void;
    
  }

  interface SuperUserState {
    isAdmin: boolean;
    toggleAdmin: () => void;
    products: Product[];
    selectedCardId: number | null;
    setSelectedCard: (id: number | null) => void;
    addProduct: (product: Omit<Product, "id">) => void;
    updateProduct: (id: number, updatedProduct: Partial<Product>) => void;
    deleteProduct: (id: number) => void;
    productName: string;
    productImage: string;
    productPrice: string;
    inStock: boolean;
    setProductName: (name: string) => void;
    setProductImage: (url: string) => void;
    setProductPrice: (price: string) => void;
    setInStock: (stock: boolean) => void;
    resetForm: () => void;
    prefillForm: (product: Product) => void;
  }
  
  export const useUserStore = create(persist<UserState>((set) => ({
    username: "",
    setUsername: (name) => set({ username: name }),
    logout: () => {
      localStorage.removeItem('username');
      document.cookie = 'username=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      set({ username: "" })},
  }),{
    name: 'user-storage',
  }));

  export const useSuperUserStore = create(
    persist<SuperUserState>(
      (set) => ({
        isAdmin: false,
        toggleAdmin: () => set((state) => ({ isAdmin: !state.isAdmin })),
        products: initialProducts,
        addProduct: (product) =>
          set((state) => ({
            products: [
              { id: Date.now(), ...product },
              ...state.products,
            ],
          })),
        updateProduct: (id, updatedProduct) =>
          set((state) => ({
            products: state.products.map((product) =>
              product.id === id ? { ...product, ...updatedProduct } : product
            ),
          })),
        deleteProduct: (id) => {
          set((state) => ({
            products: state.products.filter((product) => product.id !== id),
          }));
          useCartStore.getState().removeItemFromCart(id);
        },
        selectedCardId: null,
        setSelectedCard: (id) => set({ selectedCardId: id }),
        productName: "",
        productImage: "",
        productPrice: "",
        inStock: true,
        setProductName: (name) => set({ productName: name }),
        setProductImage: (url) => set({ productImage: url }),
        setProductPrice: (price) => set({ productPrice: price }),
        setInStock: (stock) => set({ inStock: stock }),
        resetForm: () => set({
          productName: "",
          productImage: "",
          productPrice: "",
          inStock: true,
        }),
        prefillForm: (product) => set({
          productName: product.title,
          productImage: product.imageUrl,
          productPrice: product.price.toString(),
          inStock: product.inStock,
        }),
      }),
      {
        name: 'super-user-store',
      }
    )
  );

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

      removeItemFromCart: (productId) =>
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

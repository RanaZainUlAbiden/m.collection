import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/data/products';

export interface CartItem {
    cartItemId: string;
    product: Product;
    quantity: number;
    size?: string;
    color?: string;
    price: number;
}

interface CartState {
    items: CartItem[];
    addToCart: (product: Product, quantity?: number, size?: string, color?: string, price?: number) => void;
    removeFromCart: (cartItemId: string) => void;
    updateQuantity: (cartItemId: string, quantity: number) => void;
    clearCart: () => void;
    getCartTotal: () => number;
    getCartCount: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            
            addToCart: (product: Product, quantity = 1, size?: string, color?: string, price?: number) => {
                const finalPrice = price !== undefined ? price : product.price;
                const cartItemId = `${product.id}-${size || 'nosize'}-${color || 'nocolor'}`;
                set((state) => {
                    const existingItem = state.items.find(item => item.cartItemId === cartItemId);
                    if (existingItem) {
                        return {
                            items: state.items.map(item => 
                                item.cartItemId === cartItemId 
                                    ? { ...item, quantity: item.quantity + quantity }
                                    : item
                            )
                        };
                    }
                    return { items: [...state.items, { cartItemId, product, quantity, size, color, price: finalPrice }] };
                });
            },

            removeFromCart: (cartItemId: string) => {
                set((state) => ({
                    items: state.items.filter(item => item.cartItemId !== cartItemId)
                }));
            },

            updateQuantity: (cartItemId: string, quantity: number) => {
                if (quantity <= 0) {
                    get().removeFromCart(cartItemId);
                    return;
                }
                set((state) => ({
                    items: state.items.map(item => 
                        item.cartItemId === cartItemId 
                            ? { ...item, quantity }
                            : item
                    )
                }));
            },

            clearCart: () => set({ items: [] }),

            getCartTotal: () => {
                return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
            },

            getCartCount: () => {
                return get().items.reduce((count, item) => count + item.quantity, 0);
            }
        }),
        {
            name: 'mjr-footwear-cart', // Persist cart in localStorage
        }
    )
);

import React, { createContext, useContext, useState } from 'react';
import { useCRO } from './CROContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const { trackFunnelStep } = useCRO();
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const addToCart = (product, quantity = 1) => {
        trackFunnelStep('cart_abandoned');
        setCartItems(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
            }
            return [...prev, { ...product, quantity }];
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (id) => setCartItems(prev => prev.filter(item => item.id !== id));

    const updateQuantity = (id, delta) => {
        setCartItems(prev => prev.map(item => {
            if (item.id === id) {
                return { ...item, quantity: Math.max(1, item.quantity + delta) };
            }
            return item;
        }));
    };

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => {
            const priceNum = typeof item.price === 'string'
                ? parseFloat(item.price.replace(',', '.'))
                : item.price;
            return total + (priceNum * item.quantity);
        }, 0).toFixed(2).replace('.', ',');
    };

    const getCartCount = () => cartItems.reduce((total, item) => total + item.quantity, 0);

    const clearCart = () => setCartItems([]);

    const isShippingFree = () => {
        const hasTwoSame = cartItems.some(item => item.quantity >= 2);
        const totalNum = parseFloat(getCartTotal().replace(',', '.'));
        return hasTwoSame || totalNum >= 40;
    };

    return (
        <CartContext.Provider value={{
            cartItems, isCartOpen, setIsCartOpen, addToCart, removeFromCart, updateQuantity,
            getCartTotal, getCartCount, clearCart, isShippingFree
        }}>
            {children}
        </CartContext.Provider>
    );
};

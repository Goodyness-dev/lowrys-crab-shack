import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('lowrys_cart_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [fulfillmentType, setFulfillmentType] = useState(() => {
    return localStorage.getItem('lowrys_fulfillment_type') || 'curbside_pickup';
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [customizingItem, setCustomizingItem] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [lastCompletedOrder, setLastCompletedOrder] = useState(null);
  const [tipPercent, setTipPercent] = useState(15);

  useEffect(() => {
    try {
      localStorage.setItem('lowrys_cart_items', JSON.stringify(cartItems));
    } catch (e) {
      console.warn('Cart storage error:', e);
    }
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('lowrys_fulfillment_type', fulfillmentType);
  }, [fulfillmentType]);

  const addToCart = (item) => {
    setCartItems(prev => {
      const existingIdx = prev.findIndex(i => 
        i.name === item.name && 
        i.optionsKey === item.optionsKey
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += (item.quantity || 1);
        return updated;
      }
      return [...prev, { ...item, id: item.id || `item-${Date.now()}-${Math.random().toString(36).substr(2, 4)}` }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (itemId, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === itemId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const removeItem = (itemId) => {
    setCartItems(prev => prev.filter(i => i.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
    try {
      localStorage.removeItem('lowrys_cart_items');
    } catch (e) {}
  };

  const openCustomizer = (dish) => {
    setCustomizingItem(dish);
    setIsCustomizerOpen(true);
  };

  const closeCustomizer = () => {
    setIsCustomizerOpen(false);
    setCustomizingItem(null);
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const taxRate = 0.06;
  const tax = subtotal * taxRate;
  const tip = tipPercent > 0 ? subtotal * (tipPercent / 100) : 0;
  const total = subtotal + tax + tip;
  const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      updateQuantity,
      removeItem,
      clearCart,
      isCartOpen,
      setIsCartOpen,
      openCustomizer,
      closeCustomizer,
      isCustomizerOpen,
      customizingItem,
      isCheckoutOpen,
      setIsCheckoutOpen,
      lastCompletedOrder,
      setLastCompletedOrder,
      fulfillmentType,
      setFulfillmentType,
      tipPercent,
      setTipPercent,
      subtotal,
      tax,
      tip,
      total,
      itemCount
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

// import React, { createContext, useContext, useState } from 'react';

// const BasketContext = createContext();

// export const useBasket = () => useContext(BasketContext);

// export function BasketProvider({ children }) {
//   const [basket, setBasket] = useState([]);

//   const addItem = (product) => {
//     setBasket(prev => {
//       const existing = prev.find(p => p.id === product.id);
//       if (existing) {
//         return prev.map(p =>
//           p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
//         );
//       }
//       return [...prev, { ...product, quantity: 1 }];
//     });
//   };

//   const removeItem = (id) => {
//     setBasket(prev => prev.filter(p => p.id !== id));
//   };

//   const updateQty = (id, qty) => {
//     setBasket(prev =>
//       prev.map(p => p.id === id ? { ...p, quantity: qty } : p)
//     );
//   };

//   return (
//     <BasketContext.Provider value={{ basket, addItem, removeItem, updateQty }}>
//       {children}
//     </BasketContext.Provider>
//   );
// }


// src/context/basketContext.js
import React, { createContext, useContext, useMemo, useState, useCallback } from "react";

const BasketContext = createContext(undefined);

export function BasketProvider({ children }) {
  const [items, setItems] = useState([]); // each: { id, title, price, qty }

  const addItem = useCallback((rawProduct) => {
    if (!rawProduct || rawProduct.id == null) return;

    // normalize fields from either live API or offline data
    const product = {
      id: rawProduct.id,
      title: rawProduct.title ?? rawProduct.name ?? "Untitled",
      price: Number(rawProduct.price ?? 0),
    };

    setItems((prev) => {
      const idx = prev.findIndex((it) => it.id === product.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + 1 };
        return copy;
      }
      return [...prev, { ...product, qty: 1 }];
    });
  }, []);

  const removeItem = useCallback((id) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  }, []);

  const updateQty = useCallback((id, qty) => {
    const n = Number(qty);
    setItems((prev) => {
      if (!Number.isFinite(n) || n <= 0) return prev.filter((it) => it.id !== id);
      return prev.map((it) => (it.id === id ? { ...it, qty: n } : it));
    });
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const total = useMemo(
    () => items.reduce((sum, it) => sum + (Number(it.price) || 0) * (it.qty || 0), 0),
    [items]
  );

  const value = useMemo(
    () => ({ items, addItem, removeItem, updateQty, clear, total }),
    [items, addItem, removeItem, updateQty, clear, total]
  );

  return <BasketContext.Provider value={value}>{children}</BasketContext.Provider>;
}

export function useBasket() {
  const ctx = useContext(BasketContext);
  if (!ctx) {
    throw new Error(
      "useBasket must be used within a BasketProvider. Wrap your root (App) with <BasketProvider>."
    );
  }
  return ctx;
}



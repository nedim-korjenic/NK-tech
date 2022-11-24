import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);
  const [isDarkMode, setIsDarkMode] = useState(false);

  let foundProduct;
  let index;

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems?.find(
      (item) => item._id === product._id
    );

    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );

    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    if (checkProductInCart) {
      const updatedCartItems = cartItems?.map((cartProduct) => {
        if (cartProduct._id === product._id)
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
      });

      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }
    toast.success(`${qty} ${product.name} added to the cart!`);
  };

  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    setCartItems(cartItems.filter((item) => item !== foundProduct));
    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - foundProduct.price * foundProduct.quantity
    );
    setTotalQuantities(
      (prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity
    );
  };

  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((product) => product._id === id);

    if (value === "inc") {
      setCartItems(
        cartItems?.map((item) => {
          if (item === foundProduct) {
            return { ...foundProduct, quantity: foundProduct.quantity + 1 };
          } else return item;
        })
      );
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (value === "dec" && foundProduct.quantity > 1) {
      setCartItems(
        cartItems?.map((item) => {
          if (item === foundProduct) {
            return { ...foundProduct, quantity: foundProduct.quantity - 1 };
          } else return item;
        })
      );
      setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
    }
  };

  const incQty = () => {
    setQty((prev) => prev + 1);
  };

  const decQty = () => {
    setQty((prev) => {
      if (prev - 1 < 1) return 1;
      return prev - 1;
    });
  };

  const handleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuantity,
        onRemove,
        handleDarkMode,
        isDarkMode,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);

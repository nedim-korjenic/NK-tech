import React, { useRef } from "react";
import Link from "next/link";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import { toast } from "react-hot-toast";
import { useStateContext } from "../context/StateContext";
import { urlFor } from "../lib/client";
import getStripe from "../lib/getStripe";

const Cart = () => {
  const cartRef = useRef();
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    toggleCartItemQuantity,
    onRemove,
    isDarkMode
  } = useStateContext();

  const handleCheckout = async () => {
    const stripe = await getStripe();

    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItems),
    });

    if (response.statusCode === 500) return;

    const data = await response.json();

    toast.loading("Redirecting...");

    stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className={isDarkMode? "cart-container-dark":"cart-container"}>
        <button
          type="button"
          className="cart-heading"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft color={isDarkMode? "white":"black"}/>
          <span className="heading" style={{color: isDarkMode? "white":"black"}}>Your cart</span>
          <span className="cart-num-items">{`(${totalQuantities} items)`}</span>
        </button>
        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} color={isDarkMode? "white":"black"} />
            <h3 style={{color:isDarkMode? "white":"black"}}>Your shopping bag is empty!</h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn"
              >
                Continue shopping
              </button>
            </Link>
          </div>
        )}
        <div className="product-container">
          {cartItems.length >= 1 &&
            cartItems?.map((item, index) => (
              <div className="product" key={item._id}>
                <img
                  src={urlFor(item?.image[0])}
                  className="cart-product-image"
                />
                <div className="item-desc">
                  <div className="flex top">
                    <h5 style={{color:isDarkMode? "white":"black"}}>{item.name}</h5>
                    <h4 style={{color:isDarkMode? "white":"black"}}>${item.price}</h4>
                  </div>
                  <div className="flex bottom">
                    <div>
                      <p className="quantity-desc">
                        <span
                          className="minus"
                          style={{color:isDarkMode? "white":"black"}}
                          onClick={() =>
                            toggleCartItemQuantity(item._id, "dec")
                          }
                        >
                          <AiOutlineMinus color={isDarkMode? "white":"black"}/>
                        </span>
                        <span className="num" style={{color:isDarkMode? "white":"black"}}>
                          {item.quantity}
                        </span>
                        <span
                          className="plus"
                          onClick={() =>
                            toggleCartItemQuantity(item._id, "inc")
                          }
                        >
                          <AiOutlinePlus color={isDarkMode? "white":"black"}/>
                        </span>
                      </p>
                    </div>
                    <button
                      type="button"
                      className="remove-item"
                      onClick={() => onRemove(item)}
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3 style={{color:isDarkMode? "white":"black"}}>Subtotal:</h3>
              <h3 style={{color:isDarkMode? "white":"black"}}>${totalPrice}</h3>
            </div>
            <div className="btn-container">
              <Link href="/success">
              <button type="button" className="btn" onClick={()=>setShowCart(false)}>
                Order items
              </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

import React from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import { TiLightbulb } from "react-icons/ti";
import Cart from "./Cart";
import { useStateContext } from "../context/StateContext";
import vercel from "../public/logo.webp";
import Image from "next/image";

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities, handleDarkMode, isDarkMode } =
    useStateContext();
  return (
    <div className="navbar-container">
      <Link href="/">
        <div className="main-store-logo">
          <Image
            className="main-store-logo-image"
            src={vercel}
            width={90}
            height={90}
          />
        </div>
      </Link>
      {!showCart && (
        <div
          className="cart-icon-container"
          style={{
            display: "flex",
            flexDirection:'row',
            alignItems:'center'
          }}
        >
          <button
            className="lightBulb"
            onClick={handleDarkMode}
            style={{
              color: isDarkMode ? "gold" : "black",
              display: "flex",
              alignItems: "center",
              marginRight: "20px",
            }}
          >
            <TiLightbulb color={isDarkMode ? "gold" : "black"} />
          </button>
          <button
            type="button"
            className="cart-icon"
            style={{ color: isDarkMode ? "white" : "black" }}
            onClick={() => setShowCart(true)}
          >
            <AiOutlineShopping />
            <span className="cart-item-qty">{totalQuantities}</span>
          </button>
        </div>
      )}
      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;

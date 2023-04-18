import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import styles from "../styles/style";
import { CartItemCard, Footer, Header, Loader, ProductCard } from "../components";

const CartPage = () => {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <>
    
        <div>
          <Header  isProductPage={true} />
          <br />
          <br />
          <div className={`${styles.section}`}>
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
              {cartItems &&
                cartItems.map((i, index) => <CartItemCard cartItem={i} key={index} />)}
            </div>
            {cartItems && cartItems.length === 0 ? (
              <h1 className="text-center w-full pb-[100px] text-[20px]">
                No products Found in Cart!
              </h1>
            ) : null}
          </div>
          <Footer />
        </div>
    </>
  );
};

export default CartPage;

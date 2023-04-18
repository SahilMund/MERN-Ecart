import React, { useState } from "react";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import { Link } from "react-router-dom";

import styles from "../../styles/style";
import ProductCardModal from "../home/ProductCardModal";

import { MdRemoveShoppingCart } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { removeItemFromCart } from "../../redux/actions";

const CartItemCard = ({ cartItem }) => {
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);

  const data = cartItem.product;

  const d = data.name;
  const product_name = d.replace(/\s+/g, "-");

  const [count, setCount] = useState(cartItem.quantity);
  //   const [select, setSelect] = useState(false);

  const dispatch = useDispatch();

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const incrementCount = () => {
    setCount(count + 1);
  };

  const handleRemoveItemFromCart = () => {
    dispatch(removeItemFromCart(cartItem._id));
  }
  return (
    <>
      <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
        <div className="flex justify-end"></div>
        <Link to={`/product/${product_name}`}>
          <img
            // src={`${backend_url}${data.images && data.images[0]}`}
            src={`${data.image[0].url}`}
            alt=""
            className="w-full h-[170px] object-contain"
          />
        </Link>
        <Link to="/">
          <h5 className={`${styles.shop_name}`}>{data.shop.name}</h5>
        </Link>
        <Link to={`/product/${product_name}`}>
          <h4 className="pb-3 font-[500]">
            {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
          </h4>

          <div className="flex">
            <AiFillStar
              className="mr-2 cursor-pointer"
              size={20}
              color="#F6BA00"
            />
            <AiFillStar
              className="mr-2 cursor-pointer"
              size={20}
              color="#F6BA00"
            />
            <AiFillStar
              className="mr-2 cursor-pointer"
              size={20}
              color="#F6BA00"
            />
            <AiFillStar
              className="mr-2 cursor-pointer"
              color="#F6BA00"
              size={20}
            />
            <AiOutlineStar
              size={20}
              className="mr-2 cursor-pointer"
              color="#F6BA00"
            />
          </div>

          <div className="py-2 flex items-center justify-between">
            <div className="flex">
              <h5 className={`${styles.productDiscountPrice}`}>
                {data.discountPrice && data.discountPrice + "$"}
              </h5>
              <h4 className={`${styles.price}`}>
                {data.originalPrice && data.originalPrice + "$"}
              </h4>
            </div>
            <span className="font-[400] text-[17px] text-[#68d284]">
              {cartItem.quantity}
            </span>
          </div>
        </Link>

        <div>
          <button
            className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
            onClick={decrementCount}
          >
            -
          </button>
          <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
            {count}
          </span>
          <button
            className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
            onClick={incrementCount}
          >
            +
          </button>
        </div>

        {/* side options */}
        <div>
          {click ? (
            <AiFillHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => setClick(!click)}
              color={click ? "red" : "#333"}
              title="Remove from wishlist"
            />
          ) : (
            <AiOutlineHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => setClick(!click)}
              color={click ? "red" : "#333"}
              title="Add to wishlist"
            />
          )}
          <AiOutlineEye
            size={22}
            className="cursor-pointer absolute right-2 top-14"
            onClick={() => setOpen(!open)}
            color="#333"
            title="Quick view"
          />
          <MdRemoveShoppingCart
            size={25}
            className="cursor-pointer absolute right-2 top-24"
            onClick={handleRemoveItemFromCart}
            color="red"
            title="Remove From cart"
          />
          {open && <ProductCardModal setOpen={setOpen} data={data} />}
        </div>
      </div>
    </>
  );
};

export default CartItemCard;

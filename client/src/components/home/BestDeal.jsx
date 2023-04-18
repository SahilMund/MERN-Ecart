import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../styles/style";
import ProductCard from "./ProductCard";
import { categoriesData, productData } from "../../static/data";

const BestDeal = () => {
  const [data, setData] = useState([]);

const allProducts = productData;
  useEffect(() => {
    const firstFive = allProducts && allProducts.slice(0, 5);
    console.log(firstFive);
    setData(firstFive);
  }, [allProducts]);

  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Best Deals</h1>
        </div>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
          {data && data.map((i, index) => <ProductCard data={i} key={index} />)}
        </div>
      </div>
    </div>
  );
};

export default BestDeal;

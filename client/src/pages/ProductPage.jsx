
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import styles from "../styles/style";
import { Footer, Header, Loader, ProductCard } from "../components";

const ProductPage = () => {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const {allProduct,loading} = useSelector((state) => state.product);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (categoryData === null) {
      const d = allProduct;
      setData(d);
    } else {
      const d =
      allProduct && allProduct.filter((i) => i.category === categoryData);
      setData(d);
    }
  }, [allProduct]);

  return (
  <>
  {
    loading ? (
      <Loader />
    ) : (
      <div>
      <Header activeHeading={3} isProductPage={true} />
      <br />
      <br />
      <div className={`${styles.section}`}>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
          {data && data.map((i, index) => <ProductCard data={i} key={index} />)}
        </div>
        {data && data.length === 0 ? (
          <h1 className="text-center w-full pb-[100px] text-[20px]">
            No products Found!
          </h1>
        ) : null}
      </div>
      <Footer />
    </div>
    )
  }
  </>
  );
};

export default ProductPage;

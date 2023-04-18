import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { ProductDetails, SuggestedProduct } from "../components";
import { useSelector } from "react-redux";
import { Footer, Header } from "../components";

const ProductDetailsPage = () => {
  const { allProduct } = useSelector((state) => state.product);

  const { name } = useParams();
  console.log(name, allProduct);
  const [data, setData] = useState(null);
  const productName = name.replace(/-/g, " ");

  useEffect(() => {
    const data = allProduct && allProduct.find((i) => i.name === productName);
    setData(data);
  }, []);

  console.log(data, "in side product one name page");

  return (
    <div>
      <Header />
      <ProductDetails data={data} />
      {data && <SuggestedProduct data={data} />}
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;

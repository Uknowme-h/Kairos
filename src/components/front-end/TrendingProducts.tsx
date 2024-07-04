"use client";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";

interface IProduct {
  _id: string;
  imgSrc: string;
  fileKey: string;
  name: string;
  category: string;
  price: number;
}

const TrendingProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("/api/get_products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="container mt-32" id="Products">
      <div className="sm:flex justify-between items-center bg-[#a72f04] p-2 text-white">
        <h2 className="text-4xl font-medium">Our Products</h2>

        <div className="text-gray-300 flex gap-4 text-xl mt-4 sm:mt-0">
          <p className="text-gray-300 italic">
            “ A step towards a healthy future ”
          </p>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8">
        {products.map((item: IProduct) => (
          <ProductCard
            key={item._id}
            id={item._id}
            img={item.imgSrc}
            category={item.category}
            title={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default TrendingProducts;

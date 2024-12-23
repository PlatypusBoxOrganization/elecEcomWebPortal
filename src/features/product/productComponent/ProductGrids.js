import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllProducts, selectProductListStatus, fetchAllProductAsync } from "../productSlice";
import ProductCard from "./ProductCard";
import { ThreeDots } from "react-loader-spinner";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const ProductGrids = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const status = useSelector(selectProductListStatus);

  useEffect(() => {
    dispatch(fetchAllProductAsync());
  }, [dispatch]);

  return (
    <div className="lg:col-span-3 mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>

          <div className="max-w-7xl mx-auto">
            {status === "loading" ? (
              <div className="flex justify-center items-center h-64">
                <ThreeDots
                  visible={true}
                  height="80"
                  width="80"
                  color="rgb(239, 68, 68)"
                  radius="9"
                  ariaLabel="loading-products"
                />
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl text-gray-500">No products found</h3>
              </div>
            ) : (
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {products.map((product) => (
                  <motion.div key={product._id} variants={item}>
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductGrids;
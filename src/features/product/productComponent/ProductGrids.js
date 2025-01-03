import {useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectAllProducts,
  selectProductListStatus,
  fetchAllProductAsync,
} from "../productSlice";
import { ThreeDots } from "react-loader-spinner";
import ProductCard from "./ProductCard";
const ProductGrids =() => {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const status = useSelector(selectProductListStatus);

  useEffect(() => {
    // const pagination = { _page: page, _limit: 10 };
    dispatch(fetchAllProductAsync());
  }, [dispatch]);
    return (
      <div className="lg:col-span-3 mx-20">
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <h2 className="sr-only">Products</h2>

            <div className="max-w-7xl mx-auto px-4 py-8">
              {status === "loading" ? (
                <ThreeDots
                  visible={true}
                  height="80"
                  width="80"
                  color="rgb(79,70,229)"
                  radius="9"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              ) : null}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
 
export default ProductGrids;
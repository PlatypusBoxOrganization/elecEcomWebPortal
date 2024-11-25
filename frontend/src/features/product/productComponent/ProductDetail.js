import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductByIdAsync,
  selectProductById,
} from "../productSlice";
import { useParams } from "react-router-dom";
// import { addToCartAsync, selectedItems } from "../../cart/cartSlice";
import Rating from "../../../Utils/Rating";

const ProductDetail = () => {
     const product = useSelector(selectProductById);
  const dispatch = useDispatch();

  const params = useParams();
  useEffect(() => {
    console.log("Product ID from useParams:", params.id);
    dispatch(fetchProductByIdAsync(params.id));
  }, [dispatch, params.id]);
console.log("product in product detail", JSON.stringify(product, null, 2));
//   const handleCart = (e) => {
//     e.preventDefault();

//     if (items.findIndex((item) => item.product.id === product.id) < 0) {
//       const newItem = {
//         product: product.id,

//         quantity: 1,
//       };

//      //TO PREVENT PRODUCT ID TO BE EQUAL TO CART ITEM ID WE ARE DELETING THE PRODUCT ID AS IF DIFFERENT USER ORDER SAME PRODUCT WILL THROW ERROR
//     //   dispatch(addToCartAsync(newItem));
//     } else {
//       alert("item already added");
//     }
//   };
    return (
      <div className="bg-white">
        <div className="pt-6">
          {/* Product Name */}

          <div className="flex items-center">
            <h1 className="text-2xl ml-10 mb-10 font-bold tracking-tight text-gray-900 sm:text-3xl">
              {product.name}
            </h1>
          </div>
          {/* Product Image */}
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="aspect-h-1 aspect-w-8 hidden   lg:block">
              {/* <img
                src={`/images/${product.images[0].url}`}
                alt={product.name}
                className="h-full w-full p-10 max-w-2xl object-cover rounded-lg object-center"
              /> */}
            </div>
            <div className="mx-3 max-w-4xl">
              {/* Product price section */}
              <div className="Price align-items w-full flex flex-row ">
                <p className="mt-8 text-3xl font-medium text-gray-900">
                  Rs &nbsp;
                  {product.discountPrice}
                </p>
                <p className="mt-8 text-3xl pl-3 font-medium text-gray-500 line-through">
                  {product.price}Rs
                </p>
                <p className="mt-8 text-3xl pl-3 font-medium text-green-500 ">
                  {product.discountPercentage}% OFF
                </p>
              </div>

              <div className="w-full mt-6 flex items-center justify-between text-3xl">
                <div className="flex items-center">
                  <p>Rating: </p>
                  <p className="mr-4"> {product.rating}</p>
                  <Rating className="mr-4" value={product.rating} />
                  <p className="text-xl text-gray-700">
                    from {product.numReviews} Reviews
                  </p>
                </div>
              </div>

              <h3 className="text-3xl tracking-tight mt-10 text-gray-900">
                Description
              </h3>
              <div className="space-y-6">
                <p className="text-xl text-gray-700 mt-5">
                  {product.description}
                </p>
              </div>

              <h2 className="text-3xl tracking-tight mt-10 text-gray-900">
                highlights
              </h2>
              <div className="mt-4 space-y-6">
               {/* {product.specifications.map((spec) => (
                  <p key={spec}>{spec}</p>
                ))} */}
              </div>

              <div className="w-full">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  {/* Price */}
                  <div className="mt-6 lg:row-span-3  w-full lg:mt-0">
                    <div className="handleCartCase">
                      {product.stock <= 0 ? (
                        <p className="mt-10 pt-10 text-2xl pl-10 text-red-700">
                          OUT OF STOCK
                        </p>
                      ) : (
                        <div>
                          <button
                            // onClick={handleCart}
                            type="submit"
                            className="mt-40 w-4xl flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 "
                          >
                            Add to Cart
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
 
export default ProductDetail;
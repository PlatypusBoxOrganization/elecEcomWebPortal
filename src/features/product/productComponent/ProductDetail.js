import { useEffect, useState } from "react";
import { Heart, ShoppingCart, TruckIcon, RefreshCw } from "lucide-react";
import Wearable from "../../../Assets/Wearable.jpg"
import { useDispatch, useSelector } from "react-redux";
import { fetchProductByIdAsync, selectProductById } from "../productSlice";
import { useParams } from "react-router-dom";
import Rating from "../../../Utils/Rating";
const ProductDetail = () => {
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("white");

  const product = useSelector(selectProductById);
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(fetchProductByIdAsync(params.id));
  }, [dispatch, params.id]);

  // Handle case when product or product images are not available
  if (!product || !product.images || product.images.length === 0) {
    return <div>Loading product...</div>; // Display loading state if data is not available
  }

  const mainImage = product?.images[0].url; // Make sure images exists
  const otherImages = product?.images.slice(1); // Get other images

  return (
    <div className="max-w-7xl mx-auto p-8 font-montserrat">
      <h1 className="text-black text-2xl">
        <span className="text-gray-300">{product.category}</span>/{product.name}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="bg-gray-100 rounded-lg p-8">
            <img
              src={mainImage}
              alt={product.name}
              className="w-full object-contain"
            />
          </div>
          <div className="thumbnails mt-4 flex space-x-4">
            {otherImages.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={`Thumbnail ${index + 1}`}
                className="w-24 h-auto object-contain cursor-pointer"
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="mt-2 Rating flex inline-flex justify-between">
              <p className="pr-4">{product.rating}</p>
              <Rating value={product.rating} />
              <p className="mt-0 pl-3 text-sm text-gray-700">
                from {product.numReviews} Reviews
              </p>
            </div>
            <p className="text-2xl font-bold mt-4">{product.discountPrice}</p>
            <p className="mt-4 text-gray-600">
              {product.description || "Description not available."}
            </p>
          </div>

          {/* Color and Size Selection */}
          <div>
            <p className="font-semibold mb-2">Colours:</p>
            <div className="flex gap-2">
              {["white", "black"].map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-6 h-6 rounded-full border-2 ${
                    selectedColor === color
                      ? "border-blue-500"
                      : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <div>
            <p className="font-semibold mb-2">Size:</p>
            <div className="flex gap-2">
              {["XS", "S", "M", "L", "XL"].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded ${
                    selectedSize === size
                      ? "bg-red-500 text-white"
                      : "border-gray-300"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="flex gap-4">
            <div className="flex items-center border rounded">
              <button
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                className="px-4 py-2 border-r"
              >
                -
              </button>
              <span className="px-4 py-2">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 border-l"
              >
                +
              </button>
            </div>
            <button className="flex-1 bg-red-500 text-white py-2 px-4 rounded">
              Buy Now
            </button>
            <button className="p-2 border rounded">
              <Heart className="w-6 h-6" />
            </button>
          </div>

          {/* Delivery Info */}
          <div className="space-y-4 border-t pt-4">
            <div className="flex items-center gap-2">
              <TruckIcon className="w-6 h-6" />
              <div>
                <p className="font-semibold">Free Delivery</p>
                <p className="text-sm text-gray-600">
                  Enter your postal code for delivery availability
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <RefreshCw className="w-6 h-6" />
              <div>
                <p className="font-semibold">Return Delivery</p>
                <p className="text-sm text-gray-600">
                  Free 30 Days Delivery Returns. Details
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductDetail;
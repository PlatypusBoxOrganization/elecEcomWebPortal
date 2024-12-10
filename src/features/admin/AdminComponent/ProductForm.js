import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  createProductAsync,
  fetchProductByIdAsync,
  selectProductById,
  updateProductAsync,
} from "../../product/productSlice";
import { useEffect } from "react";

const ProductForm = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
 

  const selectedProduct = useSelector(selectProductById);

  useEffect(() => {
    if (params.id) {
      dispatch(fetchProductByIdAsync(params.id));
    }
  }, [dispatch, params.id]);

  useEffect(() => {
    if (selectedProduct && params.id) {
      setValue("name", selectedProduct.name);
      setValue("description", selectedProduct.description);
      setValue("highlights", selectedProduct.highlights);
      setValue("price", selectedProduct.price);
      setValue("numReviews",selectedProduct.numReviews) ; 
      setValue("rating", selectedProduct.rating);
      setValue("category", selectedProduct.category);
      setValue("stock", selectedProduct.stock);
      setValue("discountPercentage", selectedProduct.discountPercentage);
    }
  }, [selectedProduct, setValue]);

  const handleDelete = () => {
    const product = { ...selectedProduct };
    product.deleted = "true";
    dispatch(updateProductAsync(product));
  };

  const handleAdd = () => {
    const product = { ...selectedProduct };
    if (product.id) {
      product.deleted = "false";
      dispatch(updateProductAsync(product));
    } else {
      product.deleted = "false";
      dispatch(createProductAsync(product));
    }
  };

  return (
    <div className="ProductForm mx-20">
      <form
        noValidate
        onSubmit={handleSubmit((data) => {
          const formData = new FormData();
          formData.append("name", data.name);
          formData.append("description", data.description);
          formData.append("highlights", data.highlights);
          formData.append("category", data.category);
          formData.append("price", +data.price);
          formData.append("rating", +data.rating);
          formData.append("stock", +data.stock);
          formData.append("numReviews", +data.numReviews);
          formData.append("discountPercentage", +data.discountPercentage);
          formData.append("brand", data.brand);
        
          // Handle exactly five images
          if (data.image1) formData.append("images", data.image1[0]);
          if (data.image2) formData.append("images", data.image2[0]);
          if (data.image3) formData.append("images", data.image3[0]);
          if (data.image4) formData.append("images", data.image4[0]);
          if (data.image5) formData.append("images", data.image5[0]);

          if (params.id) {
            formData.append("id", params.id);
            dispatch(updateProductAsync(formData));
          } else {
            dispatch(createProductAsync(formData));
          }
          reset();
        })}
        encType="multipart/form-data"
      >
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Add Product
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Adding new product
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border border-black p-8">
            <div className="">
              {/* mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 */}
              <div className="px-8 mb-6">
                {/* sm:col-span-4 */}
                {/* PRODUCT NAME */}
                <label
                  htmlFor="productname"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register("name", {
                      required: "Product name is required",
                    })}
                    id="name"
                    className="w-full bg-gray-100 border-0 pl-5  py-1.5 pl-1 text-gray-900 "
                    placeholder="Enter th product name"
                  />
                  {errors.name?.message && (
                    <p className="text-red-500">{errors.name?.message}</p>
                  )}
                </div>
              </div>
              <div className="px-8 mb-6">
                {/* col-span-full */}
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    {...register("description", {
                      required: "Product description is required",
                    })}
                    rows="3"
                    className="block w-full rounded-md border-0 bg-gray-100 py-1.5 text-gray-900 shadow-sm  placeholder:text-gray-400  sm:text-sm sm:leading-6"
                  ></textarea>
                  {/* ring-gray-300  ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-indigo-600 */}
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write a few sentences about the product.
                </p>
                {errors.description?.message && (
                  <p className="text-red-500">{errors.description?.message}</p>
                )}
              </div>
              {/* Five Image Inputs */}
             
              <div className="px-8 mb-6">
                {/* grid grid-cols-1 md:grid-cols-2 gap-6 */}
                {Array.from({ length: 5 }).map((_, index) => (
                  <div className="flex flex-col space-y-2 " key={index}>
                    <label
                      htmlFor={`image${index + 1}`}
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Product Image {index + 1}
                    </label>

                    <div className="relative flex flex-col items-center justify-center border-2 border-dashed border-gray-400 h-15 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all duration-300 p-4 ">
                      {/* Placeholder or Image Preview */}
                      <div className="flex items-center justify-center w-full h-20">
                        <p className="text-sm text-gray-400">
                          No Image Selected
                        </p>
                      </div>

                      {/* Input Field */}
                      <input
                        type="file"
                        {...register(`image${index + 1}`, {
                          required: `Product image ${index + 1} is required`,
                        })}
                        id={`image${index + 1}`}
                        className="absolute inset-0 opacity-0 cursor-pointer "
                      />
                    </div>

                    {/* Error Message */}
                    {errors[`image${index + 1}`]?.message && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors[`image${index + 1}`]?.message}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border border-black p-8">
            <div class="w-full mb-6">
              <label
                for="category"
                class=" text-sm font-medium leading-6 text-gray-900"
              >
                Category
              </label>
              <div class="mt-2 w-full">
                <select
                  id="category"
                  {...register("category", {
                    required: "product category need to be selected",
                  })}
                  class=" w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm  sm:text-sm sm:leading-6 bg-gray-100"
                  // ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                >
                  <option>select</option>
                  <option>Audio</option>
                  <option>Gaming</option>
                  <option>Wearables</option>
                  <option>Computing</option>
                  <option>HomeAutomation</option>
                </select>
                {errors.category?.message && (
                  <p className="text-red-500">{errors.category?.message}</p>
                )}
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="brand"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Brand
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("brand", {
                    required: "Brand is required",
                  })}
                  id="brand"
                  className="w-full rounded-md border-0 bg-gray-100 py-1.5 pl-1 text-gray-900 "
                />
                {errors.brand?.message && (
                  <p className="text-red-500">{errors.brand?.message}</p>
                )}
              </div>
            </div>

            <div className="mb-6">
              {/* sm:col-span-2 sm:col-start-1 */}
              <label
                htmlFor="numReviews"
                className=" text-sm font-medium leading-6 text-gray-900"
              >
                Number of Reviews
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="numReviews"
                  {...register("numReviews", {
                    required: "Number of reviews is required",
                    min: 0,
                  })}
                  className="rounded-md bg-gray-100 w-full border-0 py-1.5 text-gray-900 shadow-sm  placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  // ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                />
                {errors.numReviews?.message && (
                  <p className="text-red-500">{errors.numReviews?.message}</p>
                )}
              </div>
            </div>

            <div class="mb-6">
              <label
                for="price"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Price
              </label>
              <div class="mt-2">
                <input
                  type="text"
                  id="price"
                  {...register("price", {
                    required: "product price is required",
                    min: 1,
                    max: 10000,
                  })}
                  class="w-full bg-gray-100 rounded-md border-0 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
                {errors.price?.message && (
                  <p className="text-red-500">{errors.price?.message}</p>
                )}
              </div>
            </div>

            <div class="mb-6">
              <label
                for="stock"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Stock
              </label>
              <div class="mt-2">
                <input
                  type="text"
                  {...register("stock", {
                    required: "product stock is required",
                    min: 0,
                    max: 10000,
                  })}
                  id="stock"
                  autocomplete="address-level1"
                  class="bg-gray-100 w-full  rounded-md border-0 py-1.5 text-gray-900 shadow-sm  placeholder:text-gray-400  sm:text-sm sm:leading-6"
                />
                {errors.stock?.message && (
                  <p className="text-red-500">{errors.stock?.message}</p>
                )}
              </div>
            </div>

            <div class="mb-6">
              <label
                for="discountPercentage"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                discount Percentage
              </label>
              <div class="mt-2">
                <input
                  type="text"
                  {...register("discountPercentage", {
                    required: "product stock is required",
                    min: 0,
                    max: 100,
                  })}
                  id="discountPercentage"
                  class="bg-gray-100 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.discountPercentage?.message && (
                <p className="text-red-500">
                  {errors.email?.discountPercentage}
                </p>
              )}
            </div>

            <div class="mb-6">
              <label
                for="discountPercentage"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Rating
              </label>
              <input
                type="text"
                {...register("rating", {
                  required: "product stock is required",
                  min: 0,
                  max: 100,
                })}
                id="rating"
                class="bg-gray-100 w-full  rounded-md border-0 py-1.5 text-gray-900 shadow-sm  placeholder:text-gray-400  sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>

        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12 px-10 mt-9 mx-20">
            <div className="my-6 flex items-center justify-center gap-x-6">
              <Link
                to={"/admin"}
                className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
              >
                {params.id ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;

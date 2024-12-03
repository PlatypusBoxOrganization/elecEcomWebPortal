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
      setValue("rating", selectedProduct.rating);
      setValue("category", selectedProduct.category);
      setValue("stock", selectedProduct.stcok);
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
    <div className="ProductForm">
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
          formData.append("discountPercentage", +data.discountPercentage);

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
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12 px-10 mt-9 mx-20">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Add Product
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Adding new product
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
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
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 "
                  />
                  {errors.name?.message && (
                    <p className="text-red-500">{errors.name?.message}</p>
                  )}
                </div>
              </div>
            
              {/* <div className="col-span-full">
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
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  ></textarea>
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write a few sentences about the product.
                </p>
                {errors.description?.message && (
                  <p className="text-red-500">{errors.description?.message}</p>
                )}
              </div> */}

              {/* Five Image Inputs */}
              {Array.from({ length: 5 }).map((_, index) => (
                <div className="col-span-full" key={index}>
                  <label
                    htmlFor={`image${index + 1}`}
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Product Image {index + 1}
                  </label>
                  <div className="mt-2">
                    <input
                      type="file"
                      {...register(`image${index + 1}`, {
                        required: `Product image ${index + 1} is required`,
                      })}
                      id={`image${index + 1}`}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 "
                    />
                    {errors[`image${index + 1}`]?.message && (
                      <p className="text-red-500">
                        {errors[`image${index + 1}`]?.message}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Add the rest of your form fields */}
            {/* ... */}
            <div class="sm:col-span-3">
              <label
                for="category"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Category
              </label>
              <div class="mt-2">
                <select
                  id="category"
                  {...register("category", {
                    required: "product category need to be selected",
                  })}
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
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
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div class="sm:col-span-2 sm:col-start-1">
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
                    class="block  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.price?.message && (
                    <p className="text-red-500">{errors.price?.message}</p>
                  )}
                </div>
              </div>

              <div class="sm:col-span-2">
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
                    class="block  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.stock?.message && (
                    <p className="text-red-500">{errors.stock?.message}</p>
                  )}
                </div>
              </div>

              <div class="sm:col-span-1">
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
                    class="block  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {errors.discountPercentage?.message && (
                  <p className="text-red-500">
                    {errors.email?.discountPercentage}
                  </p>
                )}
              </div>
            </div>
            <div class="mt-2">
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
                class="block  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            <div className="my-6 flex items-center justify-end gap-x-6">
              <Link
                to={"/admin"}
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
              >
                {params.id ? "Update Product" : "Add Product"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;

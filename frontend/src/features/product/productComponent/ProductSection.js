import { useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { FunnelIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllProducts,
  fetchProductByFilterAsync,
  selectTotalItems,
  selectProductListStatus,
} from "../productSlice";
import { Pagination } from "../../../Utils/Pagination";
import { MobileFilter } from "../../../Utils/MobileFilter";
import { DesktopFilter } from "../../../Utils/DesktopFilter";
import ProductGrids from "./ProductGrids";
const filters = [
  {
    id: "category",
    name: "Category",
    options: [
      { value: "Audio", label: "Audio", checked: false },
      { value: "Gaming", label: "Gaming", checked: false },
      { value: "Wearables", label: "Wearables", checked: true },
      { value: "Computing", label: "Computing", checked: false },
      { value: "Home Automation", label: "Home Automation", checked: false },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const ProductSection = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filter, setFilter] = useState({});
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState(""); // Add category state
  const [sort, setSort] = useState(""); // Add sort state
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const totalItems = useSelector(selectTotalItems);
  const status = useSelector(selectProductListStatus);

  // FUNCTION TO FILTER PRODUCT LIST
  const handleFilter = (e, section, option) => {
    const newFilter = { ...filter };
    if (e.target.checked) {
      newFilter[section.id] = option.value;
      if (section.id === "category") {
        setCategory(option.value); // Update category state
      }
    } else {
      delete newFilter[section.id];
      if (section.id === "category") {
        setCategory(""); // Clear category state
      }
    }
    setFilter(newFilter);
  };

  // FUNCTION FOR ADDING PAGINATION FUNCTIONALITY
  const handlePage = (page) => {
    setPage(page);
  };

  useEffect(() => {
    const params = { category, page, limit: 10, sort }; // Ensure category and sort are included
    dispatch(fetchProductByFilterAsync(params));
  }, [dispatch, category, page, sort]);

  useEffect(() => {
    setPage(1);
  }, [totalItems]);

  return (
    <div className="bg-white">
      <div>
        {/* MOBILE FILTER DIALOG */}
        <MobileFilter
          mobileFiltersOpen={mobileFiltersOpen}
          setMobileFiltersOpen={setMobileFiltersOpen}
          handleFilter={handleFilter}
          filters={filters}
        />
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              New Arrivals
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <Transition
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                ></Transition>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* DESKTOP FILTER */}
              <DesktopFilter handleFilter={handleFilter} filters={filters} />
              {/* PRODUCT GRID */}
              <div className="lg:col-span-3">
                <ProductGrids products={products} status={status} />
              </div>
            </div>
            <Pagination
              handlePage={handlePage}
              page={page}
              setPage={setPage}
              totalItems={totalItems}
            />
          </section>
        </main>
      </div>
    </div>
  );
};

export default ProductSection;

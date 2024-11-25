import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export const Pagination = ({ handlePage, page, setPage, totalItems }) => {
  const totalPage = Math.ceil(totalItems / 10);
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        {/* PREVIOUS PAGE LOGIC */}
        <div
          onClick={(e) => handlePage(page > 1 ? page - 1 : page)}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </div>

        {/* NEXT PAGE LOGIC */}
        <div
          onClick={(e) => handlePage(page < totalPage ? page + 1 : page)}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </div>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p class="text-sm text-gray-700">
            Showing <span class="font-medium">{(page - 1) * 10 + 1}</span>
            to{" "}
            <span class="font-medium">
              {page * 10 > totalItems ? totalItems : page * 10}{" "}
            </span>
            of
            <span class="font-medium"> {totalItems}</span>
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <div
              onClick={(e) => handlePage(page > 1 ? page - 1 : page)}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </div>

            {Array.from({ length: totalPage }).map((el, index) => (
              <div
                onClick={(e) => handlePage(index + 1)}
                aria-current="page"
                className={`relative cursor-pointer z-10 inline-flex items-center ${
                  index + 1 === page
                    ? "bg-indigo-600 text-white"
                    : "text-gray-400"
                } px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
              >
                {index + 1}
              </div>
            ))}

            <div
              onClick={(e) => handlePage(page < totalPage ? page + 1 : page)}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

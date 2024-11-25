import { Fragment } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { Bars3Icon, MagnifyingGlassCircleIcon, ShoppingCartIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { HeartIcon, MagnifyingGlassIcon, SwatchIcon } from "@heroicons/react/20/solid";
import { Hearts, MagnifyingGlass } from "react-loader-spinner";
// import { selectLoggedInUser } from "../features/auth/authSlice";
// import { selectedItems } from "../../features/cart/cartSlice";
// import { selectUserInfo } from "../features/user/userSlice";

const navigation = [
  
  { name: "About ", link: "/about", user: true },
  { name: "Contact", link: "/contact", user: true },
  { name: "Signup", link: "/signup", user: true },
  { name: "Login", link: "/login", user: true },
  // { name: "Admin", link: "/admin", admin: true },
  // { name: "Add Product", link: "/admin/product-form/", admin: true },
  // { name: "Orders", link: "/admin/orders", admin: true },
];

const dropdownLinks = [
  { name: "My Profile", link: "/profile" },
  { name: "My Orders", link: "/userOrders" },
  { name: "Logout", link: "/signout" },
];

const NavBar = () => {
  // const items = useSelector(selectedItems);
  // const userInfo = useSelector(selectUserInfo);

  const classNames = (...classes) => classes.filter(Boolean).join(" ");
  const navItemClasses = (current) =>
    classNames(
      current
        ? "bg-gray-900 text-black"
        : "text-gray-900  text-xl  hover:text-black",
      "rounded-md px-3 py-2 text-sm font-medium"
    );

  return (
    <>
      {/* {userInfo && ( */}
      <Disclosure as="nav" className="bg-white border-b-[1px]">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                {/* Logo and Navigation */}
                <div className="flex items-center">
                  <Link
                    to="/"
                    className="text-gray-900  text-2xl font-bold hover:text-black pl-20"
                  >
                    Exclusive
                  </Link>
                  <div className="hidden md:block ml-10 space-x-4">
                    {navigation
                      // .filter((item) => item[userInfo.role])
                      .map((item) => (
                        <Link
                          key={item.name}
                          to={item.link}
                          className={navItemClasses(item.current)}
                        >
                          {item.name}
                        </Link>
                      ))}
                  </div>
                </div>

                {/* Cart and Profile */}
                <div className="hidden md:flex items-center space-x-4">
                  <input
                    type="text"
                    placeholder="What are you looking for?"
                    class="w-full  pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  /> 
                  <MagnifyingGlassIcon className="h-10 w-10"></MagnifyingGlassIcon>

                  <Link to="/wishlist">
                    <button className="rounded-full  p-1 text-gray-900 bg-white hover:text-black">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                        />
                      </svg>
                    </button>
                  </Link>
                  <Link to="/cart">
                    <button className="rounded-full  p-1 text-gray-900 hover:text-black">
                      <ShoppingCartIcon className="h-6 w-6" />
                    </button>
                  </Link>

                  <Menu as="div" className="relative">
                    <MenuButton className="flex items-center rounded-full bg-gray-800 text-sm">
                      <img
                        className="h-8 w-8 rounded-full"
                        src="/images/def.png"
                        alt="User"
                      />
                    </MenuButton>
                    <Transition as={Fragment}>
                      <MenuItems className="absolute right-0 z-10 mt-2 w-48 bg-white rounded-md shadow-lg">
                        {dropdownLinks.map((link) => (
                          <Menu.Item key={link.name}>
                            {({ active }) => (
                              <Link
                                to={link.link}
                                className={classNames(
                                  active
                                    ? "bg-purple-600 text-white"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                {link.name}
                              </Link>
                            )}
                          </Menu.Item>
                        ))}
                      </MenuItems>
                    </Transition>
                  </Menu>
                </div>

                {/* Mobile Menu Button */}
                <DisclosureButton className="md:hidden rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white">
                  {open ? (
                    <XMarkIcon className="h-6 w-6" />
                  ) : (
                    <Bars3Icon className="h-6 w-6" />
                  )}
                </DisclosureButton>
              </div>
            </div>

            {/* Mobile Menu */}
            <DisclosurePanel className="md:hidden bg-gray-800">
              <div className="space-y-1 px-2">
                {navigation
                  // .filter((item) => item[userInfo.role])
                  .map((item) => (
                    <DisclosureButton
                      key={item.name}
                      as="a"
                      href={item.link}
                      className={navItemClasses(item.current)}
                    >
                      {item.name}
                    </DisclosureButton>
                  ))}
              </div>
              <div className="border-t border-gray-700 px-2">
                {dropdownLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.link}
                    className="block px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </DisclosurePanel>
          </>
        )}
      </Disclosure>
      {/* )} */}
    </>
  );
};

export default NavBar;

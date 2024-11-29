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
                {/* Logo */}
                <div className="flex items-center">
                  <Link
                    to="/"
                    className="text-gray-900 text-2xl font-bold hover:text-black"
                  >
                    Exclusive
                  </Link>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.link}
                      className={navItemClasses(item.current)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                {/* Icons */}
                <div className="hidden md:flex items-center space-x-4">
                  <input
                    type="text"
                    placeholder="What are you looking for?"
                    className="w-full pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <MagnifyingGlassIcon className="h-6 w-6 text-gray-500" />
                  <Link to="/wishlist">
                    <HeartIcon className="h-6 w-6 text-gray-500 hover:text-black" />
                  </Link>
                  <Link to="/cart">
                    <ShoppingCartIcon className="h-6 w-6 text-gray-500 hover:text-black" />
                  </Link>
                  <Menu as="div" className="relative">
                    <MenuButton>
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
                <Disclosure.Button className="md:hidden rounded-md bg-gray-200 p-2 text-gray-800 hover:bg-gray-300">
                  {open ? (
                    <XMarkIcon className="h-6 w-6" />
                  ) : (
                    <Bars3Icon className="h-6 w-6" />
                  )}
                </Disclosure.Button>
              </div>
            </div>

            {/* Mobile Menu */}
            <Disclosure.Panel className="md:hidden bg-gray-50">
              <div className="space-y-2 px-4">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as={Link}
                    to={item.link}
                    className="block text-gray-700 hover:bg-gray-200 px-3 py-2 rounded-md text-center"
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
              <div className="border-t border-gray-200 mt-2 px-4">
                {dropdownLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.link}
                    className="block text-gray-700 hover:bg-gray-200 px-3 py-2 rounded-md text-center"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      {/* )} */}
    </>
  );
};

export default NavBar;

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
import { Bars3Icon, ShoppingCartIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// import { selectLoggedInUser } from "../features/auth/authSlice";
// import { selectedItems } from "../../features/cart/cartSlice";
// import { selectUserInfo } from "../features/user/userSlice";

const navigation = [
  { name: "Electronic", link: "/", user: true },
  { name: "About Us", link: "/about", user: true },
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
        ? "bg-gray-900 text-white"
        : "text-gray-300 hover:bg-gray-700 hover:text-white",
      "rounded-md px-3 py-2 text-sm font-medium"
    );

  return (
    <>
      {/* {userInfo && ( */}
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  {/* Logo and Navigation */}
                  <div className="flex items-center">
                    <Link to="/">
                      <img
                        className="h-10 w-10 ml-5 -mt-3"
                        src="/images/logo.png"
                        alt="Logo"
                      />
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
                    <Link to="/cart">
                      <button className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white">
                        <ShoppingCartIcon className="h-6 w-6" />
                      </button>
                    </Link>
                   
                    <Menu as="div" className="relative">
                      <MenuButton className="flex items-center rounded-full bg-gray-800 text-sm">
                        <img
                          className="h-10 w-10 rounded-full"
                          src="/images/user.png"
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

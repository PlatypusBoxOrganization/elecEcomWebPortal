import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';

const CartPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = subtotal > 50000 ? 0 : 500;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <NavBar />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Shopping Cart</h1>

        <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          {/* Cart items */}
          <div className="lg:col-span-7">
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <h2 className="text-2xl font-medium text-gray-900 dark:text-white">Your cart is empty</h2>
                <p className="mt-4 text-gray-500 dark:text-gray-400">
                  Browse our collection of hearing aids and accessories
                </p>
                <Link
                  to="/products"
                  className="mt-6 inline-flex items-center justify-center rounded-md border border-transparent bg-red-600 dark:bg-red-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-red-700 dark:hover:bg-red-600"
                >
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <ul className="divide-y divide-gray-200 dark:divide-gray-700 border-t border-b border-gray-200 dark:border-gray-700">
                {cart.map((item) => (
                  <li key={item._id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                          <h3>{item.name}</h3>
                          <p className="ml-4">₹{(item.price * item.quantity).toLocaleString()}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{item.brand}</p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="flex items-center space-x-4">
                          <button
                            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                            onClick={() => dispatch({ type: 'cart/decrementQuantity', payload: item._id })}
                          >
                            <FaMinus className="h-4 w-4" />
                          </button>
                          <p className="text-gray-500 dark:text-gray-400">Qty {item.quantity}</p>
                          <button
                            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                            onClick={() => dispatch({ type: 'cart/incrementQuantity', payload: item._id })}
                          >
                            <FaPlus className="h-4 w-4" />
                          </button>
                        </div>

                        <button
                          type="button"
                          className="font-medium text-red-600 dark:text-red-400 hover:text-red-500 dark:hover:text-red-300"
                          onClick={() => dispatch({ type: 'cart/removeFromCart', payload: item._id })}
                        >
                          <FaTrash className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Order summary */}
          {cart.length > 0 && (
            <div className="mt-16 rounded-lg bg-gray-50 dark:bg-gray-800 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">Order summary</h2>

              <dl className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600 dark:text-gray-400">Subtotal</dt>
                  <dd className="text-sm font-medium text-gray-900 dark:text-white">₹{subtotal.toLocaleString()}</dd>
                </div>

                <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
                  <dt className="text-sm text-gray-600 dark:text-gray-400">Shipping</dt>
                  <dd className="text-sm font-medium text-gray-900 dark:text-white">
                    {shipping === 0 ? 'Free' : `₹${shipping.toLocaleString()}`}
                  </dd>
                </div>

                <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
                  <dt className="text-base font-medium text-gray-900 dark:text-white">Order total</dt>
                  <dd className="text-base font-medium text-gray-900 dark:text-white">₹{total.toLocaleString()}</dd>
                </div>
              </dl>

              <div className="mt-6">
                <button
                  type="button"
                  className="w-full rounded-md border border-transparent bg-red-600 dark:bg-red-500 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-red-700 dark:hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-gray-50 dark:focus:ring-offset-gray-900"
                >
                  Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;

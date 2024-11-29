import { ChevronRightIcon } from "@heroicons/react/solid";
import qr from "../Assets/QrCode.png";
import play from "../Assets/GooglePlay.png";
import appstore from "../Assets/QrCode.png";
import fb from "../Assets/Icon-Facebook.png";
import l from "../Assets/Icon-Linkedin.png";
import ig from "../Assets/icon-instagram.png";
import tw from "../Assets/Icon-Twitter.png";
import { Link } from "react-router-dom";
const Footer = () => {
    return (
      <footer className="bg-black text-white p-8 font-montserrat">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Exclusive Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-xl">Exclusive</h3>
            <p>Subscribe</p>
            <p className="text-sm">Get 10% off your first order</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent border border-white/30 rounded-l px-3 py-2 text-sm w-full focus:outline-none"
              />
              <button className="bg-white/10 border border-white/30 border-l-0 rounded-r px-2">
                <ChevronRightIcon className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Support Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-xl">Support</h3>
            <p className="text-sm">111 Bijoy sarani, Dhaka,</p>
            <p className="text-sm">DH 1515, Bangladesh.</p>
            <p className="text-sm">exclusive@gmail.com</p>
            <p className="text-sm">+88015-88888-9999</p>
          </div>

          {/* Account Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-xl">Account</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <p className="hover:underline">My Account</p>
              </li>
              <li>
                <p className="hover:underline">Login / Register</p>
              </li>
              <li>
                <p className="hover:underline">Cart</p>
              </li>
              <li>
                <p className="hover:underline">Wishlist</p>
              </li>
              <li>
                <p className="hover:underline">Shop</p>
              </li>
            </ul>
          </div>

          {/* Quick Link Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-xl">Quick Link</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <p className="hover:underline">Privacy Policy</p>
              </li>
              <li>
                <p className="hover:underline">Terms Of Use</p>
              </li>
              <li>
                <p className="hover:underline">FAQ</p>
              </li>
              <li>
                <p className="hover:underline">Contact</p>
              </li>
            </ul>
          </div>

          {/* Download App Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-xl">Download App</h3>
            <p className="text-sm">Save $3 with App New User Only</p>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white p-1 rounded">
                <img src={qr} alt="QR Code" className="w-full" />
              </div>
              <div className="flex flex-col justify-between">
                <a href="/#" target="_blank" rel="noopener noreferrer">
                  <img src={play} alt="Google Play" className="rounded" />
                </a>
                <a href="/#" target="_blank" rel="noopener noreferrer">
                  <img src={appstore} alt="App Store" className="rounded" />
                </a>
              </div>
            </div>
            <div className="flex space-x-4 mt-4">
              <a href="/#" target="_blank" rel="noopener noreferrer">
                <span className="w-6 h-6 text-xl">
                  <img src={fb} alt="Facebook" />
                </span>
              </a>
              <a href="/#" target="_blank" rel="noopener noreferrer">
                <span className="w-6 h-6 text-xl">
                  <img src={tw} alt="Twitter" />
                </span>
              </a>
              <a href="/#" target="_blank" rel="noopener noreferrer">
                <span className="w-6 h-6 text-xl">
                  <img src={ig} alt="Instagram" />
                </span>
              </a>
              <a href="/#" target="_blank" rel="noopener noreferrer">
                <span className="w-6 h-6 text-xl">
                  <img src={l} alt="LinkedIn" />
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 text-center text-sm text-gray-400">
          <p>© Copyright Rimel 2022. All rights reserved</p>
        </div>
      </footer>
    );
}
 
export default Footer;
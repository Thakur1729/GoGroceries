import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Circle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Useful Links */}
        <div>
          <h2 className="text-xl font-bold mb-4">Useful Links</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col gap-3">
              <a href="#" className="text-gray-600 hover:text-gray-900">About</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Careers</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Blog</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Press</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Lead</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Value</a>
            </div>
            <div className="flex flex-col gap-3">
              <a href="#" className="text-gray-600 hover:text-gray-900">Privacy</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Terms</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">FAQs</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Security</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Mobile</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Contact</a>
            </div>
            <div className="flex flex-col gap-3">
              <a href="#" className="text-gray-600 hover:text-gray-900">Partner</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Franchise</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Seller</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Warehouse</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Deliver</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Resources</a>
            </div>
          </div>
        </div>

        {/* Categories with see all link */}
        <div className="col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Categories</h2>
            <a href="#" className="text-green-600 hover:text-green-800">see all</a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col gap-3">
              <a href="#" className="text-gray-600 hover:text-gray-900">Vegetables & Fruits</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Cold Drinks & Juices</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Bakery & Biscuits</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Dry Fruits, Masala & Oil</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Paan Corner</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Pharma & Wellness</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Ice Creams & Frozen Desserts</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Beauty & Cosmetics</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Stationery Needs</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">E-Gift Cards</a>
            </div>
            <div className="flex flex-col gap-3">
              <a href="#" className="text-gray-600 hover:text-gray-900">Dairy & Breakfast</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Instant & Frozen Food</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Sweet Tooth</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Sauces & Spreads</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Organic & Premium</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Cleaning Essentials</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Personal Care</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Fashion & Accessories</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Toys & Games</a>
            </div>
            <div className="flex flex-col gap-3">
              <a href="#" className="text-gray-600 hover:text-gray-900">Munchies</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Tea, Coffee & Health Drinks</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Atta, Rice & Dal</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Chicken, Meat & Fish</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Baby Care</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Home & Office</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Pet Care</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Electronics & Electricals</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Print Store</a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer bottom with app buttons and social icons */}
      <div className="mt-12 border-t pt-8 flex flex-col md:flex-row justify-between items-center">
        <div className="text-gray-500 mb-4 md:mb-0">© Blink Commerce Private Limited, 2016-2025</div>
        
        <div className="flex items-center gap-4">
          <span className="text-gray-600 mr-2">Download App</span>
          <a href="#" className="bg-gray-800 text-white px-4 py-2 rounded flex items-center">
            <img src="/api/placeholder/24/24" alt="Apple App Store" className="mr-2" />
            Download on the App Store
          </a>
          <a href="#" className="bg-gray-800 text-white px-4 py-2 rounded flex items-center">
            <img src="/api/placeholder/24/24" alt="Google Play Store" className="mr-2" />
            Get it on Google Play
          </a>
        </div>

        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="#" className="text-gray-600 hover:text-gray-900">
            <Facebook size={24} />
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900">
            <Twitter size={24} />
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900">
            <Instagram size={24} />
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900">
            <Linkedin size={24} />
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900">
            {/* Using Circle as a replacement for Threads icon */}
            <div className="relative">
              <Circle size={24} />
              <span className="absolute inset-0 flex items-center justify-center text-xs font-bold">T</span>
            </div>
          </a>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-8 text-gray-500 text-sm">
        "Blinkit" is owned & managed by "Blink Commerce Private Limited" and is not related, linked or interconnected in whatsoever manner or nature, to "GROFFR.COM" which is a real estate services business operated by "Redstone Consultancy Services Private Limited".
      </div>
    </footer>
  );
};

export default Footer;
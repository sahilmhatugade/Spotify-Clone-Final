import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {/* Column 1 */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#" className="hover:underline">About</a></li>
            <li><a href="#" className="hover:underline">Jobs</a></li>
            <li><a href="#" className="hover:underline">For the Record</a></li>
          </ul>
        </div>

        {/* Column 2 */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Communities</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#" className="hover:underline">For Artists</a></li>
            <li><a href="#" className="hover:underline">Developers</a></li>
            <li><a href="#" className="hover:underline">Advertising</a></li>
            <li><a href="#" className="hover:underline">Investors</a></li>
            <li><a href="#" className="hover:underline">Vendors</a></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Useful links</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#" className="hover:underline">Support</a></li>
            <li><a href="#" className="hover:underline">Free Mobile App</a></li>
          </ul>
        </div>

        {/* Column 4 */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Spotify Plans</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#" className="hover:underline">Premium Individual</a></li>
            <li><a href="#" className="hover:underline">Premium Duo</a></li>
            <li><a href="#" className="hover:underline">Premium Family</a></li>
            <li><a href="#" className="hover:underline">Premium Student</a></li>
            <li><a href="#" className="hover:underline">Spotify Free</a></li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-8"></div>

      {/* Bottom Section */}
      <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm mt-4">
        {/* Legal Links */}
        <ul className="flex flex-wrap gap-4 mb-4 md:mb-0">
          <li><a href="#" className="hover:underline">Legal</a></li>
          <li><a href="#" className="hover:underline">Safety & Privacy Center</a></li>
          <li><a href="#" className="hover:underline">Privacy Policy</a></li>
          <li><a href="#" className="hover:underline">Cookies</a></li>
          <li><a href="#" className="hover:underline">About Ads</a></li>
          <li><a href="#" className="hover:underline">Accessibility</a></li>
        </ul>

        {/* Social Media Icons */}
        <div className="flex space-x-4">
          <a href="#" className="text-gray-400 hover:text-white">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            <i className="fab fa-facebook"></i>
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-400 text-sm mt-4">
        &copy; 2025 Spotify AB
      </div>
    </footer>
  );
};

export default Footer;

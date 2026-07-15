export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Society Pluss</h3>
            <p className="text-sm">Your trusted platform for buying, selling, and renting properties.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-blue-400">Home</a></li>
              <li><a href="/properties" className="hover:text-blue-400">Browse Properties</a></li>
              <li><a href="/about" className="hover:text-blue-400">About Us</a></li>
              <li><a href="/contact" className="hover:text-blue-400">Contact</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/faq" className="hover:text-blue-400">FAQ</a></li>
              <li><a href="/privacy" className="hover:text-blue-400">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-blue-400">Terms of Service</a></li>
              <li><a href="/help" className="hover:text-blue-400">Help Center</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>Email: info@societypluss.com</li>
              <li>Phone: +91 (0)1234-567890</li>
              <li>Address: Delhi, India</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2024 Society Pluss. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

import Link from "next/link";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <Link href="/" className="text-xl font-semibold text-gray-900">
                RestaurantSaaS
              </Link>

              <div className="flex gap-6">
                <Link
                  href="/"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Početna
                </Link>
                <Link
                  href="/privacy-policy"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Politika privatnosti
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {children}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center text-sm text-gray-500">
            © 2026 RestaurantSaaS. Sva prava zadržana.
          </div>
        </div>
      </footer>
    </div>
  );
}

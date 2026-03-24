export default async function Page() {
  return (
    <main className="flex-1">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-semibold mb-6 text-gray-900">
            Upravljaj rezervacijama bez stresa
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Kreiraj stranicu svog restorana, upravljaj rezervacijama i pruži
            gostima jednostavno i brzo iskustvo rezervisanja.
          </p>
          <button className="bg-gray-900 text-white px-8 py-4 rounded-lg text-lg hover:bg-gray-800 transition-colors">
            Kreiraj stranicu restorana
          </button>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="border border-gray-200 rounded-lg p-6 bg-white">
            <div className="w-12 h-12 bg-gray-200 rounded-lg mb-4"></div>
            <h3 className="text-lg font-medium mb-2 text-gray-900">
              Jednostavne rezervacije
            </h3>
            <p className="text-sm text-gray-600">
              Omogući gostima da brzo rezervišu sto uz intuitivan sistem.
            </p>
          </div>

          <div className="border border-gray-200 rounded-lg p-6 bg-white">
            <div className="w-12 h-12 bg-gray-200 rounded-lg mb-4"></div>
            <h3 className="text-lg font-medium mb-2 text-gray-900">
              Plan restorana
            </h3>
            <p className="text-sm text-gray-600">
              Organizuj raspored stolova i optimizuj prostor restorana.
            </p>
          </div>

          <div className="border border-gray-200 rounded-lg p-6 bg-white">
            <div className="w-12 h-12 bg-gray-200 rounded-lg mb-4"></div>
            <h3 className="text-lg font-medium mb-2 text-gray-900">
              Upravljanje menijem
            </h3>
            <p className="text-sm text-gray-600">
              Lako ažuriraj jelovnik i prikaži ponudu gostima online.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center border border-gray-200 rounded-lg p-12 bg-white">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">
            Spreman da počneš?
          </h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Pridruži se restoranima koji već koriste naš sistem za efikasno
            upravljanje rezervacijama.
          </p>
          <button className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
            Registruj se
          </button>
        </div>
      </div>
    </main>
  );
}

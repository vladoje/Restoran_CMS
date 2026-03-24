function Page() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl mb-8 text-gray-900">Politika privatnosti</h1>

      <div className="prose prose-gray max-w-none space-y-6">
        <section className="border-b border-gray-200 pb-6">
          <h2 className="text-2xl mb-4 text-gray-900">
            1. Podaci koje prikupljamo
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Prikupljamo podatke koje nam direktno dostavite, na primer prilikom
            kreiranja naloga, rezervacije ili kontaktiranja podrške. To može
            uključivati vaše ime, email adresu, broj telefona i preferencije
            vezane za rezervacije.
          </p>
        </section>

        <section className="border-b border-gray-200 pb-6">
          <h2 className="text-2xl mb-4 text-gray-900">
            2. Kako koristimo vaše podatke
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Prikupljene podatke koristimo za:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
            <li>obradu i upravljanje rezervacijama</li>
            <li>slanje potvrda i podsetnika</li>
            <li>unapređenje naših usluga i korisničkog iskustva</li>
            <li>komunikaciju u vezi sa vašim nalogom</li>
            <li>ispunjavanje zakonskih obaveza</li>
          </ul>
        </section>

        <section className="border-b border-gray-200 pb-6">
          <h2 className="text-2xl mb-4 text-gray-900">3. Deljenje podataka</h2>
          <p className="text-gray-700 leading-relaxed">
            Ne prodajemo vaše lične podatke. Vaše podatke možemo podeliti sa
            restoranom kod kog pravite rezervaciju, kao i sa partnerima koji nam
            pomažu u funkcionisanju platforme. Svi treći subjekti su dužni da
            štite vaše podatke u skladu sa ovom politikom.
          </p>
        </section>

        <section className="border-b border-gray-200 pb-6">
          <h2 className="text-2xl mb-4 text-gray-900">
            4. Bezbednost podataka
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Primjenjujemo odgovarajuće tehničke i organizacione mere kako bismo
            zaštitili vaše podatke od neovlašćenog pristupa, izmene, otkrivanja
            ili uništenja. Ipak, nijedan način prenosa putem interneta nije
            potpuno bezbedan.
          </p>
        </section>

        <section className="border-b border-gray-200 pb-6">
          <h2 className="text-2xl mb-4 text-gray-900">5. Vaša prava</h2>
          <p className="text-gray-700 leading-relaxed mb-4">Imate pravo da:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
            <li>pristupite svojim podacima</li>
            <li>ispravite netačne podatke</li>
            <li>zatražite brisanje podataka</li>
            <li>se odjavite sa marketinških poruka</li>
            <li>preuzmete svoje podatke</li>
          </ul>
        </section>

        <section className="border-b border-gray-200 pb-6">
          <h2 className="text-2xl mb-4 text-gray-900">6. Kolačići (cookies)</h2>
          <p className="text-gray-700 leading-relaxed">
            Koristimo kolačiće i slične tehnologije kako bismo unapredili vaše
            iskustvo na platformi. Podešavanja kolačića možete kontrolisati u
            vašem browseru.
          </p>
        </section>

        <section className="border-b border-gray-200 pb-6">
          <h2 className="text-2xl mb-4 text-gray-900">7. Izmene politike</h2>
          <p className="text-gray-700 leading-relaxed">
            Ovu politiku privatnosti možemo povremeno ažurirati. Sve izmene će
            biti objavljene na ovoj stranici uz ažuriran datum poslednje izmene.
          </p>
        </section>

        <section>
          <h2 className="text-2xl mb-4 text-gray-900">8. Kontakt</h2>
          <p className="text-gray-700 leading-relaxed">
            Ako imate pitanja u vezi sa ovom politikom privatnosti ili načinom
            na koji obrađujemo podatke, kontaktirajte nas:
          </p>
          <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <p className="text-gray-700">Email: privacy@restaurantsaas.com</p>
            <p className="text-gray-700">
              Adresa: 123 Main Street, City, State 12345
            </p>
          </div>
        </section>

        <div className="mt-8 text-sm text-gray-500">
          Poslednje ažuriranje: 18. mart 2026.
        </div>
      </div>
    </div>
  );
}

export default Page;

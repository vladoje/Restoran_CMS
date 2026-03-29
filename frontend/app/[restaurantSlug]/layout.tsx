import Footer from "../_components/Footer";
import Header from "../_components/Header";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ restaurantSlug: string }>;
}) {
  // console.log(await params);
  const { restaurantSlug } = await params;

  // console.log(restaurantSlug);

  return (
    <div className="min-h-screen text-gray-800 flex flex-col bg-gray-50">
      <Header slug={restaurantSlug} />

      <main className="flex-1">{children}</main>

      <Footer slug={restaurantSlug} />
    </div>
  );
}

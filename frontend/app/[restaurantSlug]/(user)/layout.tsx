import Footer from "../../_components/Footer";
import Header from "../../_components/Header";

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
    <div
      className={`min-h-screen text-${globalStyles.text} flex flex-col bg-${globalStyles.bg}`}
    >
      <Header slug={restaurantSlug} />

      <main className="flex-1">{children}</main>

      <Footer slug={restaurantSlug} />
    </div>
  );
}
export const globalStyles = {
  bg: "white",
  primary: "gray-900",
  secondary: "gray-200",
  surface: "gray-50",
  text: "gray-600",
};

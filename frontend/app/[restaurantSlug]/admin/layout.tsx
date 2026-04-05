import AdminFooter from "../../_components/AdminFooter";
import AdminHeader from "../../_components/AdminHeader";

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
      <AdminHeader slug={restaurantSlug} />

      <main className="flex-1">{children}</main>

      <AdminFooter slug={restaurantSlug} />
    </div>
  );
}

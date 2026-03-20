import Footer from "@/app/_components/Footer";
import Header from "@/app/_components/Header";
import Link from "next/link";
import {
  FaAddressBook,
  FaCalendarDay,
  FaFilePowerpoint,
} from "react-icons/fa6";

function Page() {
  const menuItems = [
    {
      path: "/privacy-policy",
      label: "Privatnost",
      icon: <FaFilePowerpoint />,
    },
    { path: "/profile", label: "Profil", icon: <FaAddressBook /> },

    { path: "/reservation", label: "Rezervacije", icon: <FaCalendarDay /> },
  ];
  return (
    <div className="h-dvh  bg-gray-50 ">
      <Header />

      <div className="w-full mt-4 px-4  pb-12">
        {/* SIDEBAR */}
        <div
          className={`bg-white   transition-all duration-300   h-fit max-h-[80vh]`}
          /* h-fit sprečava da sidebar ide do dna ako ima malo linkova */
        >
          <nav className="flex-1 py-4 overflow-y-auto">
            <ul className="space-y-2 px-2">
              {menuItems.map((item) => {
                const active = location.pathname === item.path;
                return (
                  <li
                    key={item.path}
                    className="border border-gray-200 shadow-sm "
                  >
                    <Link
                      href={item.path}
                      className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                        active
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                      }`}
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span className="text-lg">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Page;

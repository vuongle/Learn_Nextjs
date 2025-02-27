import Menu from "@/components/Menu";
import NavBar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex">
      {/* LEFT */}
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%]">
        <Link href="/" className="flex items-center justify-center gap-2">
          <Image
            src="/logo.png"
            alt="Logo"
            width={32}
            height={32}
            className=""
          />
          <span className="hidden lg:block">School Management</span>
        </Link>

        <Menu />
      </div>

      {/* RIGHT */}
      <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-gray-100 overflow-scroll flex flex-col">
        <NavBar />
        {children}
      </div>
    </div>
  );
}

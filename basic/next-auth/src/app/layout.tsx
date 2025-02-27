import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import NavbarClientSide from "@/components/navbar-client";
import NavbarServerSide from "@/components/navbar-server";

export const metadata: Metadata = {
  title: "Server Action",
  description:
    "Use server action with useFormStatus, useFormState and Error Handling",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <html lang="en">
        <body>
          {/* <NavbarClientSide /> */}
          <NavbarServerSide />
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "~/auth";
import { handleSignOut } from "@/actions/auth-action";

//
// This component shows how to use next-auth to access session data in the server component
//
export default async function NavbarServerSide() {
  const session = await auth();
  console.log(session);

  return (
    <nav className="flex justify-between items-center py-3 px-4 bg-white shadow-md">
      <Link href="/" className="text-xl font-bold">
        NextAuth.js
      </Link>
      {!session ? (
        <Link href="/auth/signin">
          <Button variant="default">Sign In</Button>
        </Link>
      ) : (
        <form action={handleSignOut}>
          <Button variant="default" type="submit">
            Sign Out
          </Button>
        </form>
      )}
    </nav>
  );
}

import LogoutButton from "@/components/logout-button";
import { ModeToggle } from "@/components/ui/toggle-theme";
import Link from "next/link";

export function Header() {
  return (
    <header className="py-8">
      <ul>
        <li>
          <Link href="/login">Đăng Nhập</Link>
        </li>
        <li>
          <Link href="/register">Đăng Ký</Link>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
      <ModeToggle />
    </header>
  );
}

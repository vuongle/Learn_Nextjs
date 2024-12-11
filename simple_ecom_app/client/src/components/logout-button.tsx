/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import authApi from "@/api-requests/auth-api-request";
import { Button } from "@/components/ui/button";
import { handleApiError } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await authApi.logoutInternally();
      router.push("/login");
    } catch (error) {
      handleApiError(error as any);
    }
  };
  return (
    <Button size={"sm"} onClick={handleLogout}>
      Đăng Xuất
    </Button>
  );
}

"use client";

import { sessionToken } from "@/lib/http-client";
import { useState } from "react";

export default function AppProvider({
  children,
  initialSessionToken = "",
}: {
  children: React.ReactNode;
  initialSessionToken?: string;
}) {
  useState(() => {
    // only set in client side
    if (typeof window !== "undefined") {
      sessionToken.value = initialSessionToken;
    }
  });

  return <>{children}</>;
}

"use client";

import accountApi from "@/api-requests/account-api-request";
import { useEffect } from "react";

//
// In the client Profile component, learn:
// - how to read session token in context
//

export default function ProfileComponent() {
  useEffect(() => {
    const fetchProfile = async () => {
      const me = await accountApi.meClient();
      console.log("client profile: ", me);
    };

    fetchProfile();
  }, []);
  return <div></div>;
}

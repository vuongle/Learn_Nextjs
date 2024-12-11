import accountApi from "@/api-requests/account-api-request";
import ProfileComponent from "@/app/me/components/profile";
import { cookies } from "next/headers";

//
// In the server Profile component, learn:
// - how to make a request to external backend API inside a server component
// - how to get token from cookies in server component. In the server component, token is aways read from cookies (not from context).
//

export default async function Profile() {
  const cookieStore = await cookies();
  const token = cookieStore.get("sessionToken");

  // send a GET request to external backend API for get profile
  const res = await accountApi.me(token?.value || "");

  return (
    <>
      Profile,
      <h1>{res?.payload?.data?.email}</h1>
      <ProfileComponent />
    </>
  );
}

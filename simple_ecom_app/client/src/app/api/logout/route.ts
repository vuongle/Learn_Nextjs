/* eslint-disable @typescript-eslint/no-explicit-any */
import authApi from "@/api-requests/auth-api-request";
import { cookies } from "next/headers";

/**
 * Path: /api/logout
 * @param _request
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(_request: Request) {
  // handle session token is expired
  const req = await _request.json();
  const force = req.force as boolean | undefined;
  if (force) {
    await forceLogout();
  }

  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sessionToken");
  if (!sessionToken) {
    return Response.json(
      { message: "No authentication token" },
      {
        status: 401,
      }
    );
  }

  // send a POST request to external backend API(running on port 4000)
  try {
    const result = await authApi.logout(sessionToken.value);
    return Response.json(result.payload, {
      status: 200,
      headers: {
        // Delete session token in cookie
        "Set-Cookie": `sessionToken=; Path=/; Max-Age=0`,
      },
    });
  } catch (error: any) {
    return Response.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

const forceLogout = async () => {
  return Response.json(
    {
      message: "Forced logout",
    },
    {
      status: 200,
      headers: {
        // Delete session token in cookie
        "Set-Cookie": `sessionToken=; Path=/; Max-Age=0`,
      },
    }
  );
};

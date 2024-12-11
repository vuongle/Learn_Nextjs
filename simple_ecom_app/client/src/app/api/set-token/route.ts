/**
 * Handles a POST request to nextjs server's API (running on port 3000). Not a request to
 * external backend API.
 *
 * Logic: Set token to cookie before returning response to client (browser).
 *
 * Path: /api/set-token
 * @param request
 * @returns
 */
export async function POST(request: Request) {
  const res = await request.json();
  const sesseionToken = res.sessionToken as string;
  if (!sesseionToken) {
    return Response.json(
      { message: "No authentication token" },
      {
        status: 400,
        headers: {
          "Set-Cookie": `sessionToken=; Path=/; HttpOnly; Secure; SameSite=None; Domain=${process.env.DOMAIN}`,
        },
      }
    );
  }

  return Response.json(res, {
    status: 200,
    headers: {
      "Set-Cookie": `sessionToken=${sesseionToken}; Path=/;HttpOnly`,
    },
  });
}

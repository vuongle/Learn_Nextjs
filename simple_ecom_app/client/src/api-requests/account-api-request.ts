import http from "@/lib/http-client";
import { AccountResType } from "@/lib/schemaValidations/account.schema";

const accountApi = {
  // this api used in server component
  me: (sessionToken: string) =>
    http.get<AccountResType>("/account/me", {
      headers: { Authorization: `Bearer ${sessionToken}` },
    }),
  // this api used in client component. do not need to pass the session token because it is done in
  // http-client
  meClient: () => http.get<AccountResType>("/account/me"),
};

export default accountApi;

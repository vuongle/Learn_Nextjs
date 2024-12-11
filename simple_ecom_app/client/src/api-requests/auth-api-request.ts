import { envConfig } from "@/lib/configs";
import http from "@/lib/http-client";
import {
  LoginBodyType,
  LoginResType,
  RegisterBodyType,
  RegisterResType,
} from "@/lib/schemaValidations/auth.schema";
import { MessageResType } from "@/lib/schemaValidations/common.schema";

const authApi = {
  // Defines apis to external backend
  login: (body: LoginBodyType) => http.post<LoginResType>("/auth/login", body),
  register: (body: RegisterBodyType) =>
    http.post<RegisterResType>("/auth/register", body),
  logout: (sesseionToken: string) =>
    http.post<MessageResType>(
      "/auth/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${sesseionToken}`,
        },
      }
    ),

  // Defines apis to nextjs server
  setToken: (body: { sessionToken: string }) =>
    http.post("/api/set-token", body, {
      baseUrl: envConfig.NEXT_PUBLIC_NEXT_SERVER_ENDPOINT,
    }),
  logoutInternally: () =>
    http.post<MessageResType>(
      "/api/logout",
      {},
      {
        baseUrl: envConfig.NEXT_PUBLIC_NEXT_SERVER_ENDPOINT,
      }
    ),
};

export default authApi;

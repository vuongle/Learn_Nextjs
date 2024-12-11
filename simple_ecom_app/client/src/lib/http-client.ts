/* eslint-disable @typescript-eslint/no-explicit-any */
import { envConfig } from "@/lib/configs";
import { LoginResType } from "@/lib/schemaValidations/auth.schema";

/**
 * Define a custom options type that combines RequestInit and a new property baseUrl
 */
type CustomOptions = RequestInit & {
  baseUrl?: string;
};

const ENTITY_ERR_STATUS = 422;
const AUTH_ERR_STATUS = 401;

type EntityErrPayload = {
  message: string;
  errors: {
    field: string;
    message: string;
  }[];
};

/**
 * Define a custom error class that extends the built-in Error class
 */
export class HttpError extends Error {
  status: number;
  payload: {
    message: string;
    [key: string]: any;
  };

  constructor({ status, payload }: { status: number; payload: any }) {
    super("Http Error");
    this.status = status;
    this.payload = payload;
  }
}

/**
 * Define a custom error class that extends the HttpError class and handles form errors
 */
export class EntityError extends HttpError {
  status: 422;
  payload: EntityErrPayload;

  constructor({ status, payload }: { status: 422; payload: EntityErrPayload }) {
    super({ status, payload });

    this.status = status;
    this.payload = payload;
  }
}

/**
 * Define a class for setting and getting the session token. This is a singleton class.
 * The purpose of this class is to action as an interceptor: set/get or remove here only, not in many places.
 * And apis in client components do not need to pass the session token as a parameter
 */
class SessionToken {
  private token = "";

  get value() {
    return this.token;
  }

  set value(token: string) {
    if (typeof window === "undefined") {
      throw new Error("Cannot set session token on server");
    }
    this.token = token;
  }
}
export const sessionToken = new SessionToken();

/**
 * Define a generic function to make HTTP requests
 * @param method
 * @param url
 * @param options
 * @returns
 */
const request = async <Response>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  options?: CustomOptions | undefined
) => {
  const body = options?.body ? JSON.stringify(options.body) : undefined;
  const baseHeaders = {
    "Content-Type": "application/json",
    Authorization: sessionToken.value ? `Bearer ${sessionToken.value}` : "",
  };

  // baseUrl has 3 use cases:
  // 1. if do not pass the baseUrl or set undefined, use from envConfig.NEXT_PUBLIC_API_ENDPOINT
  //    -> means that calls to external backend API
  // 2. if pass the baseUrl, use the baseUrl
  //    -> means that calls to either external backend API or nextjs server
  // 3. if set the baseUrl = ''
  //    -> means that calls to nextjs server
  const baseUrl = options?.baseUrl || envConfig.NEXT_PUBLIC_API_ENDPOINT;
  const fullUrl = url.startsWith("/")
    ? `${baseUrl}${url}`
    : `${baseUrl}/${url}`;
  const res = await fetch(fullUrl, {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers,
    } as any,
    body,
    method,
  });

  const payload: Response = await res.json();
  const data = {
    status: res.status,
    payload,
  };

  // Handle errors
  if (!res.ok) {
    // handle errors regarding to form
    if (data.status === ENTITY_ERR_STATUS) {
      throw new EntityError(
        data as {
          status: 422;
          payload: EntityErrPayload;
        }
      );
    } else if (data.status === AUTH_ERR_STATUS) {
      if (typeof window !== "undefined") {
        await fetch("/api/logout", {
          method: "POST",
          body: JSON.stringify({ force: true }),
          headers: {
            ...baseHeaders,
          },
        });

        sessionToken.value = "";
        location.href = "/login";
      }
    } else {
      throw new HttpError(data);
    }
  }

  // handle response after checking errors
  // if url is login or register -> set session token to context api here
  // else if the url is logout -> remove session token from context api
  // this helps not to set or remove in other places
  if (typeof window !== "undefined") {
    if (["/auth/login", "/auth/register"].includes(url)) {
      sessionToken.value = (payload as LoginResType).data.token;
    } else if ("/auth/logout".includes(url)) {
      sessionToken.value = "";
    }
  }

  return data;
};

/**
 * Create an instance of the http client object.
 */
const http = {
  /**
   * Send a GET request to the specified URL.
   * @param url The URL of the request.
   * @param options Additional options for the request.
   * @returns A Promise that resolves with the response of the request.
   */
  get<Response>(
    url: string,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("GET", url, options);
  },

  /**
   * Send a POST request to the specified URL.
   * @param url The URL of the request.
   * @param body The body of the request.
   * @param options Additional options for the request, excluding the body.
   * @returns A Promise that resolves with the response of the request.
   */
  post<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("POST", url, { ...options, body });
  },

  /**
   * Send a PUT request to the specified URL.
   * @param url The URL of the request.
   * @param body The body of the request.
   * @param options Additional options for the request, excluding the body.
   * @returns A Promise that resolves with the response of the request.
   */
  put<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("PUT", url, { ...options, body });
  },

  /**
   * Send a DELETE request to the specified URL.
   * @param url The URL of the request.
   * @param body The body of the request.
   * @param options Additional options for the request, excluding the body.
   * @returns A Promise that resolves with the response of the request.
   */
  delete<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("DELETE", url, { ...options, body });
  },
};

export default http;

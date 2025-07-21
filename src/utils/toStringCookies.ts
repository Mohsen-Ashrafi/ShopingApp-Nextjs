import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export function toStringCookies(cookies: ReadonlyRequestCookies): string {
  const accessToken = cookies.get("accessToken");
  const refreshToken = cookies.get("refreshToken");

  let cookieString = "";
  if (accessToken) {
    cookieString += `${accessToken.name}=${accessToken.value}; `;
  }
  if (refreshToken) {
    cookieString += `${refreshToken.name}=${refreshToken.value}; `;
  }

  return cookieString;
}

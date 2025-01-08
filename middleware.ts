import { NextResponse, NextRequest } from "next/server";
import { isAuthorizedRequest, refreshTokenRequest } from "./api/serverRequests";
import { cookies } from "next/headers";
import { parseHeadersSetCookie } from "./app/lib/parseHeadersSetCookie";

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  let isAuthorized;

  // проверяем жизнеспособность access-token
  try {
    const isAuthorizedResponce = await isAuthorizedRequest(request.headers);

    if (isAuthorizedResponce.success) {
      isAuthorized = true;
    }

    const accessTokenIsExpired = isAuthorizedResponce.error?.code === 498;
    if (accessTokenIsExpired) {
      try {
        // перезапрашиваем access токен по refresh токену
        const { result, headersSetCookie } = await refreshTokenRequest(
          request.headers
        );
        const refreshTokenResultSuccess = result.success && headersSetCookie;
        if (refreshTokenResultSuccess) {
          const {
            accessTokenValue,
            accessTokenPath,
            accessTokenSameSite,
            refreshTokenValue,
            refreshTokenPath,
            refreshTokenSameSite,
          } = parseHeadersSetCookie(headersSetCookie);

          cookieStore.set({
            name: "access-token",
            value: accessTokenValue,
            path: accessTokenPath,
            sameSite: accessTokenSameSite,
          });
          cookieStore.set({
            name: "refresh-token",
            value: refreshTokenValue,
            path: refreshTokenPath,
            sameSite: refreshTokenSameSite,
          });
          isAuthorized = true;
        } else {
          isAuthorized = false;
        }
      } catch (e) {
        console.error(e);
        isAuthorized = false;
      }
    }
    
  } catch (e) {
    console.error(e);
    isAuthorized = false;
  }

  // If the user is authenticated, continue as normal
  if (isAuthorized) {
    return NextResponse.next();
  }

  // Redirect to login page if not authenticated
  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: ["/todos", "/aims"],
};

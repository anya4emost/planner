import { NextResponse, NextRequest } from "next/server";
import { isAuthorizedRequest, refreshTokenRequest } from "./api/serverRequests";
import { cookies } from "next/headers";
import { parseHeadersSetCookie } from "./app/lib/parseHeadersSetCookie";

export async function middleware(request: NextRequest) {
  console.log("in middleware request", request);
  const cookieStore = await cookies();
  let isAuthorized;
  let newHeadersSetCookie;

  // проверяем жизнеспособность access-token
  try {
    const isAuthorizedResponce = await isAuthorizedRequest(request.headers);
console.log("isAuthorizedResponce", isAuthorizedResponce);
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
        console.log("request.headers", request.headers.get('cookie'));
        console.log("headersSetCookie", headersSetCookie);
        console.log("result", result);
        const refreshTokenResultSuccess = result.success && headersSetCookie;
        if (refreshTokenResultSuccess) {
          const {
            accessTokenValue,
            accessTokenPath,
            refreshTokenValue,
            refreshTokenPath,
          } = parseHeadersSetCookie(headersSetCookie);

          cookieStore.set({
            name: "access-token",
            value: accessTokenValue,
            path: accessTokenPath,
            sameSite: "lax",
            httpOnly: true,
          });
          cookieStore.set({
            name: "refresh-token",
            value: refreshTokenValue,
            path: refreshTokenPath,
            sameSite: "lax",
            httpOnly: true,
          });
          isAuthorized = true;
          newHeadersSetCookie = headersSetCookie;
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
    console.log("isAuthorized");
    // если сделан рефреш токена, то нужно в текущий запрос подставить новые токены
    if (newHeadersSetCookie) {
      return NextResponse.redirect(request.nextUrl, {
        headers: {
          "Set-Cookie": newHeadersSetCookie,
        },
      });
    }
      
    return NextResponse.next();
  }

  // Redirect to login page if not authenticated
  console.log("to login");
  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: ["/todos", "/aims", "/api/aims", "/events", "/planning", "/main"],
};

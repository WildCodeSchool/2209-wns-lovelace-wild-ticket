import { ExpressContext } from "apollo-server-express";
import { parse } from "cookie";

const MAX_AGE_BASE = 1000 * 60 * 60 * 12; // 12 hours
const MAX_AGE_REMEMBER_ME = 1000 * 60 * 60 * 24 * 30; // 30 days

export const setSessionIdInCookie = (
  ctx: ExpressContext,
  sessionId: string,
  rememberMe: boolean
) => {
  let maxAge = MAX_AGE_BASE;
  if (rememberMe) {
    maxAge = MAX_AGE_REMEMBER_ME;
  }
  ctx.res.cookie("sessionId", sessionId, {
    httpOnly: true,
    secure: true,
    sameSite: true,
    maxAge: maxAge,
  });
};

export const getSessionIdInCookie = (
  ctx: ExpressContext
): string | undefined => {
  const rawCookies = ctx.req.headers.cookie;
  if (!rawCookies) {
    return undefined;
  }
  const parsedCookies = parse(rawCookies);
  return parsedCookies.sessionId;
};

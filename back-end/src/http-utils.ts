import { ExpressContext } from "apollo-server-express";
import { parse } from "cookie";

const MAX_AGE = 1000 * 60;

export const setSessionIdInCookie = (
  ctx: ExpressContext,
  sessionId: string
) => {
  ctx.res.cookie("sessionId", sessionId, {
    httpOnly: true,
    secure: true,
    sameSite: true,
    maxAge: MAX_AGE,
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

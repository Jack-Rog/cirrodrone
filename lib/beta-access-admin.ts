import { timingSafeEqual } from "node:crypto";

export const BETA_ACCESS_ADMIN_COOKIE = "cirro-beta-access-admin";

export function getBetaAccessAdminToken() {
  return process.env.BETA_ACCESS_ADMIN_TOKEN ?? null;
}

export function isBetaAccessAdminTokenValid(candidate: string) {
  const expected = getBetaAccessAdminToken();

  if (!expected) {
    return false;
  }

  const expectedBuffer = Buffer.from(expected);
  const candidateBuffer = Buffer.from(candidate);

  if (expectedBuffer.length !== candidateBuffer.length) {
    return false;
  }

  return timingSafeEqual(expectedBuffer, candidateBuffer);
}

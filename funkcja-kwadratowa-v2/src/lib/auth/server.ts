import { createNeonAuth } from "@neondatabase/auth/next/server";

const baseUrl = process.env.NEON_AUTH_BASE_URL;
const secret = process.env.NEON_AUTH_COOKIE_SECRET;

if (!baseUrl) throw new Error("Brak zmiennej środowiskowej NEON_AUTH_BASE_URL");
if (!secret || secret.length < 32) throw new Error("NEON_AUTH_COOKIE_SECRET musi mieć co najmniej 32 znaki");

export const auth = createNeonAuth({
  baseUrl,
  cookies: {
    secret,
    sessionDataTtl: 300,
  },
});

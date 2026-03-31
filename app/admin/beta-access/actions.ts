"use server";

import { z } from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  BETA_ACCESS_ADMIN_COOKIE,
  isBetaAccessAdminTokenValid,
} from "@/lib/beta-access-admin";

const loginSchema = z.object({
  token: z.string().min(1),
});

export async function authenticateBetaAccess(formData: FormData) {
  const parsed = loginSchema.safeParse({
    token: formData.get("token"),
  });

  if (!parsed.success) {
    redirect("/admin/beta-access?error=missing-token");
  }

  if (!isBetaAccessAdminTokenValid(parsed.data.token)) {
    redirect("/admin/beta-access?error=invalid-token");
  }

  const cookieStore = await cookies();
  cookieStore.set(BETA_ACCESS_ADMIN_COOKIE, parsed.data.token, {
    httpOnly: true,
    maxAge: 60 * 60 * 8,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  redirect("/admin/beta-access");
}

export async function signOutBetaAccess() {
  const cookieStore = await cookies();
  cookieStore.delete(BETA_ACCESS_ADMIN_COOKIE);
  redirect("/admin/beta-access");
}

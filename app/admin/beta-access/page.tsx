import Link from "next/link";
import { cookies } from "next/headers";
import {
  ArrowLeft,
  LogOut,
  Mail,
  RefreshCcw,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CirroLogo } from "@/components/brand/cirro-logo";
import { authenticateBetaAccess, signOutBetaAccess } from "./actions";
import { buttonVariants } from "@/lib/button-styles";
import {
  BETA_ACCESS_ADMIN_COOKIE,
  getBetaAccessAdminToken,
  isBetaAccessAdminTokenValid,
} from "@/lib/beta-access-admin";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { cn } from "@/lib/utils";

type BetaAccessAdminPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

type BetaAccessInquiryRow = {
  audiences: string[];
  created_at: string;
  current_fleets: string[];
  email: string;
  id: string;
  name: string;
  notes: string | null;
  pain_point: string;
  source: string;
  status: string;
  why_beta_access: string;
};

const formatter = new Intl.DateTimeFormat("en-AU", {
  dateStyle: "medium",
  timeStyle: "short",
});

function formatErrorMessage(error?: string) {
  if (error === "invalid-token") {
    return "That access token did not match.";
  }

  if (error === "missing-token") {
    return "Enter the beta inbox token to continue.";
  }

  return null;
}

function formatDate(value: string) {
  return formatter.format(new Date(value));
}

export default async function BetaAccessAdminPage({
  searchParams,
}: BetaAccessAdminPageProps) {
  const { error } = await searchParams;
  const cookieStore = await cookies();
  const token = getBetaAccessAdminToken();
  const sessionToken = cookieStore.get(BETA_ACCESS_ADMIN_COOKIE)?.value ?? "";
  const isAuthenticated = token ? isBetaAccessAdminTokenValid(sessionToken) : false;

  let inquiries: BetaAccessInquiryRow[] = [];
  let loadError: string | null = null;

  if (isAuthenticated) {
    const supabase = getSupabaseAdminClient();

    if (!supabase) {
      loadError =
        "Supabase admin credentials are not configured yet. Add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SECRET_KEY first.";
    } else {
      const result = await supabase
        .from("beta_access_inquiries")
        .select(
          "id, created_at, name, email, audiences, current_fleets, pain_point, why_beta_access, source, status, notes"
        )
        .order("created_at", { ascending: false })
        .limit(100);

      if (result.error) {
        console.error("[Cirro] Failed to load beta access inbox", result.error);
        loadError = "We could not load the inbox right now. Try refreshing in a moment.";
      } else {
        inquiries = result.data as BetaAccessInquiryRow[];
      }
    }
  }

  const totalRequests = inquiries.length;
  const newRequests = inquiries.filter((entry) => entry.status === "new").length;
  const uniqueEmails = new Set(inquiries.map((entry) => entry.email.toLowerCase())).size;

  return (
    <div className="min-h-screen bg-white text-slate-950">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(118,171,208,0.18),transparent_24%),radial-gradient(circle_at_86%_18%,rgba(130,85,35,0.1),transparent_18%),linear-gradient(180deg,#fbfdff_0%,#f3f7fb_42%,#ffffff_100%)]" />

        <main className="section-shell relative py-8 sm:py-10 lg:py-12">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link aria-label="Cirro home" className="inline-flex" href="/">
              <CirroLogo size={46} wordmark={false} />
            </Link>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                className={cn(
                  buttonVariants({ size: "sm", variant: "outline" }),
                  "border-white/85 bg-white/84 text-primary hover:bg-white"
                )}
                href="/"
              >
                <ArrowLeft className="size-4" />
                Back home
              </Link>

              {isAuthenticated ? (
                <form action={signOutBetaAccess}>
                  <button
                    className={cn(
                      buttonVariants({ size: "sm", variant: "outline" }),
                      "border-white/85 bg-white/84 text-primary hover:bg-white"
                    )}
                    type="submit"
                  >
                    <LogOut className="size-4" />
                    Lock inbox
                  </button>
                </form>
              ) : null}
            </div>
          </div>

          <div className="mx-auto flex max-w-6xl flex-col gap-8 pb-8 pt-10 lg:gap-10 lg:pt-14">
            <section className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(49,100,130,0.14)] bg-white/86 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 shadow-[0_18px_44px_-34px_rgba(22,40,65,0.28)]">
                {isAuthenticated ? (
                  <ShieldCheck className="size-3.5 text-primary" />
                ) : (
                  <ShieldAlert className="size-3.5 text-amber-700" />
                )}
                Beta inbox
              </div>

              <h1 className="mt-5 text-balance font-display text-4xl font-extrabold tracking-[-0.06em] text-slate-950 sm:text-5xl">
                Review incoming beta access requests.
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
                This page reads directly from Supabase so you can review fresh pilot and developer interest without leaving the app.
              </p>
            </section>

            {!token ? (
              <Card className="max-w-3xl border-amber-200/80 bg-white/92">
                <CardHeader>
                  <CardTitle>Set an inbox access token first</CardTitle>
                  <CardDescription>
                    Add <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">BETA_ACCESS_ADMIN_TOKEN</code> to
                    <code className="ml-1 rounded bg-slate-100 px-1.5 py-0.5 text-xs">.env.local</code> and your deployed env vars. This keeps the inbox private without needing a full auth system.
                  </CardDescription>
                </CardHeader>
              </Card>
            ) : !isAuthenticated ? (
              <Card className="max-w-2xl bg-white/92">
                <CardHeader>
                  <CardTitle>Unlock the beta inbox</CardTitle>
                  <CardDescription>
                    Enter your private admin token to see the latest submissions.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form action={authenticateBetaAccess} className="space-y-4">
                    <div className="space-y-2">
                      <label
                        className="text-sm font-semibold tracking-[-0.01em] text-slate-900"
                        htmlFor="token"
                      >
                        Admin token
                      </label>
                      <Input
                        autoComplete="current-password"
                        className="border-slate-300 bg-white"
                        id="token"
                        name="token"
                        placeholder="Paste the inbox access token"
                        type="password"
                      />
                    </div>

                    {formatErrorMessage(error) ? (
                      <p className="text-sm font-medium text-destructive">
                        {formatErrorMessage(error)}
                      </p>
                    ) : null}

                    <button className={buttonVariants({ size: "lg" })} type="submit">
                      <ShieldCheck className="size-4" />
                      Open inbox
                    </button>
                  </form>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <Card className="bg-white/92">
                    <CardHeader>
                      <CardDescription>Total requests</CardDescription>
                      <CardTitle className="text-3xl">{totalRequests}</CardTitle>
                    </CardHeader>
                  </Card>
                  <Card className="bg-white/92">
                    <CardHeader>
                      <CardDescription>New requests</CardDescription>
                      <CardTitle className="text-3xl">{newRequests}</CardTitle>
                    </CardHeader>
                  </Card>
                  <Card className="bg-white/92">
                    <CardHeader>
                      <CardDescription>Unique emails</CardDescription>
                      <CardTitle className="text-3xl">{uniqueEmails}</CardTitle>
                    </CardHeader>
                  </Card>
                </div>

                {loadError ? (
                  <Card className="border-amber-200/80 bg-white/92">
                    <CardHeader>
                      <CardTitle>Inbox unavailable</CardTitle>
                      <CardDescription>{loadError}</CardDescription>
                    </CardHeader>
                  </Card>
                ) : null}

                {!loadError ? (
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm text-slate-500">
                      Showing the latest {totalRequests} submissions from <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">beta_access_inquiries</code>.
                    </p>
                    <Link
                      className={cn(
                        buttonVariants({ size: "sm", variant: "outline" }),
                        "border-white/85 bg-white/90 text-primary hover:bg-white"
                      )}
                      href="/admin/beta-access"
                    >
                      <RefreshCcw className="size-4" />
                      Refresh
                    </Link>
                  </div>
                ) : null}

                {!loadError && inquiries.length === 0 ? (
                  <Card className="bg-white/92">
                    <CardHeader>
                      <CardTitle>No requests yet</CardTitle>
                      <CardDescription>
                        When someone submits the beta form, it will show up here automatically.
                      </CardDescription>
                    </CardHeader>
                  </Card>
                ) : null}

                {!loadError ? (
                  <div className="grid gap-4">
                    {inquiries.map((entry) => (
                      <Card className="bg-white/94" key={entry.id}>
                        <CardHeader className="gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <div className="space-y-2">
                            <CardTitle className="text-xl">{entry.name}</CardTitle>
                            <CardDescription className="flex flex-wrap items-center gap-2 text-sm">
                              <a
                                className="inline-flex items-center gap-1 text-primary hover:underline"
                                href={`mailto:${entry.email}`}
                              >
                                <Mail className="size-3.5" />
                                {entry.email}
                              </a>
                              <span className="text-slate-400">/</span>
                              <span>{formatDate(entry.created_at)}</span>
                            </CardDescription>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            <Badge
                              className="border-slate-200 bg-slate-100 text-slate-700"
                              variant="outline"
                            >
                              {entry.status}
                            </Badge>
                            {entry.audiences.map((audience) => (
                              <Badge
                                className="border-primary/18 bg-primary/8 text-primary"
                                key={`${entry.id}-${audience}`}
                                variant="outline"
                              >
                                {audience}
                              </Badge>
                            ))}
                          </div>
                        </CardHeader>

                        <CardContent className="grid gap-5 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
                          <div className="space-y-4">
                            <div>
                              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                                Current fleets
                              </p>
                              <div className="mt-2 flex flex-wrap gap-2">
                                {entry.current_fleets.map((fleet) => (
                                  <Badge
                                    className="border-slate-200 bg-white text-slate-700"
                                    key={`${entry.id}-${fleet}`}
                                    variant="outline"
                                  >
                                    {fleet}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <div>
                              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                                Source
                              </p>
                              <p className="mt-2 text-sm leading-6 text-slate-600">{entry.source}</p>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div>
                              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                                Biggest pain
                              </p>
                              <p className="mt-2 text-sm leading-7 text-slate-700">{entry.pain_point}</p>
                            </div>

                            <div>
                              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                                Why they want access
                              </p>
                              <p className="mt-2 text-sm leading-7 text-slate-700">
                                {entry.why_beta_access}
                              </p>
                            </div>

                            {entry.notes ? (
                              <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                                  Notes
                                </p>
                                <p className="mt-2 text-sm leading-7 text-slate-700">{entry.notes}</p>
                              </div>
                            ) : null}
                          </div>
                        </CardContent>

                        <CardFooter className="justify-between gap-3 text-xs text-slate-500">
                          <span className="truncate">Request ID: {entry.id}</span>
                          <span>{entry.audiences.length} audience tag(s)</span>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

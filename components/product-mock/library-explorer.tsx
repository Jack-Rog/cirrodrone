"use client";

import * as React from "react";
import Link from "next/link";
import {
  Search,
  Settings2,
  SquareTerminal,
  UploadCloud,
} from "lucide-react";

import { AppCard, getAppVisual } from "@/components/product-mock/app-card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { buttonVariants } from "@/lib/button-styles";
import { appCategories } from "@/lib/mock-data/apps";
import type { AppCategorySlug, MockApp } from "@/lib/types";
import { cn } from "@/lib/utils";

type LibraryExplorerProps = {
  apps: MockApp[];
};

const sortOptions = [
  { value: "featured", label: "Featured first" },
  { value: "name", label: "Alphabetical" },
];

function sortApps(apps: MockApp[], sortBy: string) {
  if (sortBy === "name") {
    return [...apps].sort((a, b) => a.title.localeCompare(b.title));
  }

  return [...apps].sort((a, b) => Number(b.featured) - Number(a.featured));
}

export function LibraryExplorer({ apps }: LibraryExplorerProps) {
  const [query, setQuery] = React.useState("");
  const [activeCategory, setActiveCategory] = React.useState<AppCategorySlug | "all">(
    "all"
  );
  const [sortBy, setSortBy] = React.useState("featured");
  const deferredQuery = React.useDeferredValue(query);

  const normalizedQuery = deferredQuery.trim().toLowerCase();
  const filteredApps = sortApps(
    apps.filter((app) => {
      const matchesCategory =
        activeCategory === "all" ? true : app.category === activeCategory;
      const haystack =
        `${app.title} ${app.summary} ${app.workflowSummary} ${app.operatorStory}`.toLowerCase();

      return matchesCategory && haystack.includes(normalizedQuery);
    }),
    sortBy
  );

  const featuredApp = filteredApps[0] ?? apps[0];
  const visual = featuredApp ? getAppVisual(featuredApp) : null;

  return (
    <div className="grid gap-10 xl:grid-cols-[16rem_minmax(0,1fr)]">
      <aside className="hidden xl:flex xl:flex-col xl:gap-6 xl:pt-6">
        <div className="rounded-[2rem] border border-white/80 bg-white/78 p-6 shadow-[0_20px_40px_-34px_rgba(32,47,63,0.45)]">
          <p className="font-display text-2xl font-extrabold tracking-[-0.04em] text-foreground">
            Pilot Console
          </p>
          <p className="mt-1 text-[0.68rem] font-semibold tracking-[0.24em] text-muted-foreground uppercase">
            Fleet management
          </p>

          <div className="mt-8 grid gap-2 text-sm text-muted-foreground">
            <div className="rounded-[1.25rem] px-4 py-3">Dashboard</div>
            <div className="rounded-[1.25rem] bg-primary/6 px-4 py-3 font-medium text-primary">
              App Store
            </div>
            <div className="rounded-[1.25rem] px-4 py-3">Flight Logs</div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/80 bg-white/78 p-6 shadow-[0_20px_40px_-34px_rgba(32,47,63,0.45)]">
          <p className="text-xs font-semibold tracking-[0.22em] text-muted-foreground uppercase">
            Storage status
          </p>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
            <div className="primary-gradient h-full w-[65%] rounded-full" />
          </div>
          <p className="mt-3 text-sm text-muted-foreground">6.5 GB of 10 GB used</p>
          <Link className={cn(buttonVariants({ size: "lg" }), "mt-6 w-full rounded-full")} href="/product/runtime-preview">
            New Mission
          </Link>
        </div>
      </aside>

      <div className="space-y-10">
        {featuredApp && visual ? (
          <section className="relative overflow-hidden rounded-[2.8rem] bg-slate-950 p-8 text-white shadow-[0_34px_80px_-42px_rgba(15,23,42,0.9)] sm:p-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(167,214,251,0.24),transparent_24%),linear-gradient(90deg,rgba(15,23,42,0.12),transparent)]" />
            <div className="relative grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div>
                <p className="text-[0.68rem] font-semibold tracking-[0.24em] text-white/60 uppercase">
                  Featured release
                </p>
                <h2 className="mt-4 font-display text-5xl font-extrabold tracking-[-0.06em] text-balance sm:text-6xl">
                  {featuredApp.title}
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                  {featuredApp.summary}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    className={cn(
                      buttonVariants({ size: "lg", variant: "outline" }),
                      "rounded-full border-white/20 bg-white text-slate-950 hover:bg-slate-100"
                    )}
                    href={`/product/app/${featuredApp.slug}`}
                  >
                    View details
                  </Link>
                  <Link
                    className={cn(
                      buttonVariants({ size: "lg", variant: "secondary" }),
                      "rounded-full bg-white/12 text-white hover:bg-white/18"
                    )}
                    href="/product/runtime-preview"
                  >
                    Watch runtime preview
                  </Link>
                </div>
              </div>

              <div className={cn("relative overflow-hidden rounded-[2.4rem] p-6", visual.mediaClass)}>
                <div className="absolute -right-8 -top-8 size-40 rounded-full bg-white/35 blur-3xl" />
                <div className="relative">
                  <p className="text-[0.68rem] font-semibold tracking-[0.24em] text-muted-foreground uppercase">
                    {visual.chip}
                  </p>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-[1.5rem] border border-white/70 bg-white/72 p-4 text-slate-900">
                      <p className="font-display text-xl font-extrabold tracking-tight">
                        {visual.featureTitle}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {featuredApp.workflowSummary}
                      </p>
                    </div>
                    <div className="rounded-[1.5rem] border border-white/70 bg-slate-950/82 p-4 text-white">
                      <p className="font-display text-xl font-extrabold tracking-tight">
                        {featuredApp.outputPanelTitle}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-300">
                        {featuredApp.outputPanelSummary}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : null}

        <section>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <span className="section-kicker">Product concept / app library</span>
              <h1 className="font-display text-4xl font-extrabold tracking-[-0.05em] text-balance sm:text-5xl">
                Discover custom drone workflows as runnable app concepts
              </h1>
              <p className="max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
                Search the library, browse mission types, and move into app detail
                pages that feel much closer to a real storefront than a concept-only
                grid.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_15rem] lg:w-[34rem]">
              <div className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  className="pl-11"
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search ecosystem..."
                  value={query}
                />
              </div>
              <Select onValueChange={(value) => setSortBy(value ?? "featured")} value={sortBy}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose sorting" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <Tabs
              onValueChange={(value) =>
                setActiveCategory(value as AppCategorySlug | "all")
              }
              value={activeCategory}
            >
              <TabsList className="h-auto flex-wrap rounded-full bg-white/70 p-1.5" variant="default">
                <TabsTrigger value="all">All</TabsTrigger>
                {appCategories.map((category) => (
                  <TabsTrigger key={category.slug} value={category.slug}>
                    {category.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className="flex items-center gap-3 rounded-full border border-white/80 bg-white/70 px-4 py-3 text-sm text-muted-foreground">
              <Settings2 className="size-4" />
              {filteredApps.length} workflows in this view
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 2xl:grid-cols-3">
            {filteredApps.map((app) => (
              <AppCard app={app} key={app.slug} />
            ))}
          </div>
        </section>

        <section className="primary-gradient relative overflow-hidden rounded-[2.6rem] p-8 text-primary-foreground shadow-[0_30px_60px_-36px_rgba(34,88,118,0.85)] sm:p-10">
          <div className="absolute inset-0 opacity-15 soft-grid" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-[0.68rem] font-semibold tracking-[0.24em] text-primary-foreground/70 uppercase">
                Join the developer ecosystem
              </p>
              <h2 className="mt-4 font-display text-4xl font-extrabold tracking-[-0.04em]">
                Bring a real app into the Cirro runtime story
              </h2>
              <p className="mt-4 text-base leading-7 text-primary-foreground/78">
                Access the intake flow, share the repo, and help shape the next
                generation of drone software packaging.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Link
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "rounded-full border-white/20 bg-white text-primary hover:bg-slate-50"
                )}
                href="/submit-repo"
              >
                <UploadCloud className="size-4" />
                Submit repo
              </Link>
              <Link
                className={cn(
                  buttonVariants({ size: "lg", variant: "secondary" }),
                  "rounded-full bg-white/12 text-primary-foreground hover:bg-white/18"
                )}
                href="/design-partner"
              >
                <SquareTerminal className="size-4" />
                Apply for access
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

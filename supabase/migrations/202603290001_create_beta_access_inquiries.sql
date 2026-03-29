create extension if not exists pgcrypto;

create table if not exists public.beta_access_inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  audiences text[] not null check (cardinality(audiences) > 0),
  current_fleets text[] not null check (cardinality(current_fleets) > 0),
  pain_point text not null,
  why_beta_access text not null,
  source text not null,
  status text not null default 'new',
  notes text
);

create index if not exists beta_access_inquiries_created_at_idx
  on public.beta_access_inquiries (created_at desc);

create index if not exists beta_access_inquiries_status_idx
  on public.beta_access_inquiries (status);

create index if not exists beta_access_inquiries_email_idx
  on public.beta_access_inquiries (email);

alter table public.beta_access_inquiries enable row level security;

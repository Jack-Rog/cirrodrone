# Supabase Setup For Beta Access

This repo can persist beta-access requests straight into Supabase so you can review submissions in the Supabase dashboard without building an admin panel.

## What this stores

Each submission writes one row into `public.beta_access_inquiries` with:

- `created_at`
- `name`
- `email`
- `audiences[]`
- `current_fleets[]`
- `pain_point`
- `why_beta_access`
- `source`
- `status`
- `notes`

## 1. Create a Supabase project

1. Create a project in Supabase.
2. Open `SQL Editor`.
3. Run the SQL from [202603290001_create_beta_access_inquiries.sql](../supabase/migrations/202603290001_create_beta_access_inquiries.sql).

You can also keep that file as the source of truth if you later add Supabase CLI locally.

## 2. Copy the required credentials

From `Settings -> API` in Supabase, copy:

- `Project URL`
- `service_role` key

Use the `service_role` key only on the server. Do not expose it in client code.

## 3. Add environment variables

Create `.env.local` from [.env.example](../.env.example) and set:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

Optional fallback only if you still want webhook-based capture when Supabase is not configured:

```bash
EARLY_ACCESS_WEBHOOK_URL=https://your-webhook.example
```

Behavior order in this repo:

1. If Supabase env vars exist, beta requests are inserted into Supabase.
2. If Supabase is not configured but `EARLY_ACCESS_WEBHOOK_URL` exists, the webhook is used.
3. If neither backend is configured, submissions succeed in demo mode and are logged locally.

## 4. Run locally

```bash
pnpm install
pnpm dev
```

Submit the beta form at `/beta-access`.

## 5. Review submissions

In Supabase, open:

- `Table Editor`
- table: `beta_access_inquiries`

This is the simplest "inbox" for reviewing the form submissions.

## 6. Add the same env vars in production

If you deploy on Vercel, add the same values in:

- `Project Settings -> Environment Variables`

Use:

- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

## Notes

- The app uses a server-only Supabase client in [admin.ts](../lib/supabase/admin.ts).
- The insert happens inside [forms.ts](../lib/actions/forms.ts).
- The table has row-level security enabled, but this flow uses the server-side `service_role` key for inserts.

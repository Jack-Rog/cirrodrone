"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Code2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

import { FieldMessage } from "@/components/forms/field-message";
import { DroneIcon } from "@/components/icons/cirro-icons";
import { BetaAccessButton } from "@/components/ui/beta-access-button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitEarlyAccess } from "@/lib/actions/forms";
import {
  earlyAccessAudienceOptions,
  earlyAccessFleetOptions,
  genericBetaAccessContent,
  isEarlyAccessFleet,
  normalizeEarlyAccessAudiences,
  type EarlyAccessAudience,
} from "@/lib/early-access";
import type { EarlyAccessLeadInput } from "@/lib/types";
import { cn } from "@/lib/utils";

type BetaAccessFormValues = {
  audiences: string[];
  currentFleets: string[];
  email: string;
  name: string;
  painPoint: string;
  whyBetaAccess: string;
};

const audienceIcons = {
  pilot: DroneIcon,
  developer: Code2,
} satisfies Record<EarlyAccessAudience, React.ComponentType<{ className?: string; size?: number }>>;

const fieldClassName =
  "border-slate-300 bg-white shadow-none focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/10";

function createBetaAccessSchema() {
  return z
    .object({
      audiences: z
        .array(z.string())
        .min(1, "Tell us whether you are a pilot, developer, or both."),
      name: z.string().min(2, "Please share your name."),
      email: z.email("Please enter a valid email address."),
      currentFleets: z
        .array(z.string())
        .min(1, "Choose at least one fleet you currently fly.")
        .refine((value) => value.every(isEarlyAccessFleet), "Choose valid fleets from the list."),
      painPoint: z.string().min(12, "Tell us where the biggest pain is right now."),
      whyBetaAccess: z.string().min(12, "Tell us why you want beta access."),
    })
    .superRefine((value, context) => {
      const audiences = normalizeEarlyAccessAudiences(value.audiences);

      if (audiences.length !== value.audiences.length || audiences.length === 0) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Choose at least one valid beta access path.",
          path: ["audiences"],
        });
        return;
      }
    });
}

export function BetaAccessForm({
  initialAudiences = [],
}: {
  initialAudiences?: EarlyAccessAudience[];
}) {
  const router = useRouter();
  const [serverMessage, setServerMessage] = React.useState("");
  const [isPending, startTransition] = React.useTransition();
  const normalizedInitialAudiences = normalizeEarlyAccessAudiences(initialAudiences);
  const schema = React.useMemo(() => createBetaAccessSchema(), []);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = useForm<BetaAccessFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      audiences: normalizedInitialAudiences,
      name: "",
      email: "",
      currentFleets: [],
      painPoint: "",
      whyBetaAccess: "",
    },
  });

  React.useEffect(() => {
    register("audiences");
  }, [register]);

  const watchedAudiences = useWatch({
    control,
    defaultValue: normalizedInitialAudiences,
    name: "audiences",
  });
  const selectedAudiences = normalizeEarlyAccessAudiences(watchedAudiences);
  const submitLabel = genericBetaAccessContent.submitLabel;

  function toggleAudience(audience: EarlyAccessAudience) {
    const nextAudiences = selectedAudiences.includes(audience)
      ? selectedAudiences.filter((value) => value !== audience)
      : [...selectedAudiences, audience];

    setServerMessage("");
    setValue("audiences", nextAudiences, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  }

  const onSubmit = handleSubmit((values) => {
    setServerMessage("");
    startTransition(async () => {
      const audiences = normalizeEarlyAccessAudiences(values.audiences);
      const result = await submitEarlyAccess({
        audiences,
        currentFleets: values.currentFleets as EarlyAccessLeadInput["currentFleets"],
        email: values.email,
        name: values.name,
        painPoint: values.painPoint as EarlyAccessLeadInput["painPoint"],
        whyBetaAccess: values.whyBetaAccess,
      });

      if (result.fieldErrors) {
        for (const [field, messages] of Object.entries(result.fieldErrors)) {
          if (messages?.[0]) {
            setError(field as keyof BetaAccessFormValues, {
              message: messages[0],
            });
          }
        }
      }

      if (result.status === "success" && result.redirectTo) {
        router.push(result.redirectTo);
        return;
      }

      setServerMessage(result.message);
    });
  });

  return (
    <div className="rounded-[2.2rem] border border-white/80 bg-white/92 p-6 shadow-[0_30px_80px_-42px_rgba(22,40,65,0.26)] sm:p-8">
      <div className="mb-6 sm:mb-8">
        <h2 className="mt-2 font-display text-3xl font-extrabold tracking-[-0.05em] text-slate-950">
          Request beta access
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
          {genericBetaAccessContent.formDescription}
        </p>
      </div>

      <form className="space-y-5" onSubmit={onSubmit}>
        <fieldset className="space-y-3">
          <legend className="text-sm font-semibold text-slate-900">
            Are you a Pilot or Developer?
          </legend>
          <p className="text-sm leading-6 text-slate-500">Choose one or both.</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {earlyAccessAudienceOptions.map((option) => {
              const Icon = audienceIcons[option.value];
              const selected = selectedAudiences.includes(option.value);

              return (
                <button
                  aria-pressed={selected}
                  className={cn(
                    "flex min-h-[3.75rem] cursor-pointer items-center gap-3 rounded-[1.2rem] border px-4 py-3 text-left shadow-[0_16px_36px_-32px_rgba(22,40,65,0.22)] transition hover:-translate-y-0.5",
                    selected
                      ? "border-primary/40 bg-[linear-gradient(135deg,rgba(49,100,130,0.12),rgba(130,85,35,0.08))] text-slate-950 shadow-[0_20px_40px_-28px_rgba(22,40,65,0.28)]"
                      : "border-[rgba(49,100,130,0.14)] bg-[rgba(248,251,255,0.92)] text-slate-700 hover:border-[rgba(49,100,130,0.28)] hover:bg-white"
                  )}
                  key={option.value}
                  onClick={() => toggleAudience(option.value)}
                  type="button"
                >
                  <span
                    className={cn(
                      "inline-flex shrink-0 rounded-[0.95rem] border p-2.5 shadow-[0_14px_28px_-22px_rgba(22,40,65,0.28)]",
                      selected
                        ? "border-primary/15 bg-white text-primary"
                        : "border-white/80 bg-white/90 text-slate-700"
                    )}
                  >
                    <Icon className="size-5" />
                  </span>
                  <span className="font-display text-lg font-extrabold tracking-[-0.04em]">
                    {option.label}
                  </span>
                </button>
              );
            })}
          </div>
          <FieldMessage message={errors.audiences?.message} />
        </fieldset>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="beta-access-name">Name</Label>
            <Input
              autoComplete="name"
              className={fieldClassName}
              id="beta-access-name"
              placeholder="Jack Pilot"
              {...register("name")}
            />
            <FieldMessage message={errors.name?.message} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="beta-access-email">Email</Label>
            <Input
              autoComplete="email"
              className={fieldClassName}
              id="beta-access-email"
              placeholder="jack@team.io"
              type="email"
              {...register("email")}
            />
            <FieldMessage message={errors.email?.message} />
          </div>
        </div>

        <fieldset className="space-y-3">
          <legend className="text-sm font-semibold text-slate-900">Current platforms</legend>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 xl:grid-cols-4">
            {earlyAccessFleetOptions.map((fleet) => (
              <label
                className="flex cursor-pointer items-center gap-2 rounded-[1rem] border border-[rgba(49,100,130,0.14)] bg-[rgba(248,251,255,0.92)] px-3 py-2.5 text-xs font-medium text-slate-700 shadow-[0_16px_36px_-32px_rgba(22,40,65,0.22)] transition hover:border-[rgba(49,100,130,0.28)] hover:bg-white sm:text-sm"
                htmlFor={`fleet-${fleet.value}`}
                key={fleet.value}
              >
                <Checkbox
                  id={`fleet-${fleet.value}`}
                  value={fleet.value}
                  {...register("currentFleets")}
                />
                <span>{fleet.label}</span>
              </label>
            ))}
          </div>
          <FieldMessage message={errors.currentFleets?.message} />
        </fieldset>

        <div className="space-y-2">
          <Label htmlFor="beta-access-pain-point">What is the biggest pain right now?</Label>
          <Textarea
            className={fieldClassName}
            id="beta-access-pain-point"
            placeholder="Describe the friction you are hitting with your current setup, workflow, or deployment path."
            rows={4}
            {...register("painPoint")}
          />
          <FieldMessage message={errors.painPoint?.message} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="beta-access-why-beta">Why do you want beta access now?</Label>
          <Textarea
            className={fieldClassName}
            id="beta-access-why-beta"
            placeholder={genericBetaAccessContent.textareaPlaceholder}
            rows={4}
            {...register("whyBetaAccess")}
          />
          <FieldMessage message={errors.whyBetaAccess?.message} />
        </div>

        <div className="space-y-3">
          <p aria-live="polite" className="text-sm text-muted-foreground">
            {serverMessage ||
              "If your setup looks like a strong fit, we will follow up directly."}
          </p>
          <BetaAccessButton className="w-full" disabled={isPending} size="lg" type="submit">
            {isPending ? "Capturing request..." : submitLabel}
          </BetaAccessButton>
        </div>
      </form>
    </div>
  );
}

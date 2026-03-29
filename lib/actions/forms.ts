"use server";

import { z } from "zod";

import type {
  DesignPartnerApplicationInput,
  EarlyAccessLeadInput,
  FormActionState,
  RepoSubmissionInput,
} from "@/lib/types";
import {
  isEarlyAccessFleet,
  normalizeEarlyAccessAudiences,
} from "@/lib/early-access";

const earlyAccessSchema = z.object({
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
}).superRefine((value, context) => {
  const audiences = normalizeEarlyAccessAudiences(value.audiences);

  if (audiences.length !== value.audiences.length || audiences.length === 0) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Choose at least one valid beta access path.",
      path: ["audiences"],
    });
  }
});

const repoSubmissionSchema = z.object({
  repoUrl: z.url("Please enter a valid GitHub repo URL."),
  workflowGoal: z.string().min(12, "Tell us what you are trying to deploy."),
  firmware: z.string().min(2, "Choose your drone or firmware."),
  controlStyle: z.enum(["mission-first", "mixed", "continuous"]),
  usesVideo: z.enum(["yes", "no"]),
  painPoint: z.string().min(16, "Tell us where deployment gets painful."),
  wantsDesignPartner: z.enum(["yes", "no"]),
});

const designPartnerSchema = z.object({
  name: z.string().min(2, "Please share your name."),
  email: z.email("Please enter a valid email address."),
  role: z.string().min(2, "Please tell us your role."),
  repoOrWorkflowLink: z.string().min(8, "Share a repo or workflow link."),
  buildDescription: z.string().min(16, "Tell us what you are building."),
  packagingMotivation: z
    .string()
    .min(20, "Tell us why you want to help shape the packaging standard."),
  willingToTestPilotBuilds: z.enum(["yes", "no"]),
});

function getFieldErrors(result: z.ZodError) {
  return result.flatten().fieldErrors;
}

export async function submitEarlyAccess(
  payload: EarlyAccessLeadInput
): Promise<FormActionState> {
  const parsed = earlyAccessSchema.safeParse(payload);

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please fix the highlighted fields and try again.",
      fieldErrors: getFieldErrors(parsed.error),
    };
  }

  const webhookUrl = process.env.EARLY_ACCESS_WEBHOOK_URL;
  const audiences = normalizeEarlyAccessAudiences(parsed.data.audiences);
  const serializedAudiences = audiences.join(",");
  const redirectTo =
    audiences.length === 1
      ? `/thank-you?type=early-access&audience=${audiences[0]}`
      : `/thank-you?type=early-access&audiences=${serializedAudiences}`;
  const source = `cirro-beta-access-${audiences.join("-")}`;

  if (!webhookUrl) {
    console.info("[Cirro] Mock early access capture", {
      ...parsed.data,
      audiences,
    });
    return {
      status: "success",
      message: "Thanks. Your request was captured in demo mode.",
      redirectTo,
    };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...parsed.data,
        audiences,
        source,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      return {
        status: "error",
        message: "We could not capture your request just now. Please try again.",
      };
    }
  } catch (error) {
    console.error("[Cirro] Early access webhook failed", error);
    return {
      status: "error",
      message: "We could not capture your request just now. Please try again.",
    };
  }

  return {
    status: "success",
    message: "Thanks. Your request is on the list.",
    redirectTo,
  };
}

export async function submitRepoSubmission(
  payload: RepoSubmissionInput
): Promise<FormActionState> {
  const parsed = repoSubmissionSchema.safeParse(payload);

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please review the form and try again.",
      fieldErrors: getFieldErrors(parsed.error),
    };
  }

  console.info("[Cirro] Mock repo submission", parsed.data);

  return {
    status: "success",
    message: "Your repo submission was captured in mock mode.",
    redirectTo: "/thank-you?type=repo",
  };
}

export async function submitDesignPartnerApplication(
  payload: DesignPartnerApplicationInput
): Promise<FormActionState> {
  const parsed = designPartnerSchema.safeParse(payload);

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please review the form and try again.",
      fieldErrors: getFieldErrors(parsed.error),
    };
  }

  console.info("[Cirro] Mock design partner application", parsed.data);

  return {
    status: "success",
    message: "Your application was captured in mock mode.",
    redirectTo: "/thank-you?type=design-partner",
  };
}

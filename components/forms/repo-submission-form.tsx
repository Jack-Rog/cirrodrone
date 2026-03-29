"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { FieldMessage } from "@/components/forms/field-message";
import { submitRepoSubmission } from "@/lib/actions/forms";
import type { RepoSubmissionInput } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const repoSubmissionSchema = z.object({
  repoUrl: z.url("Please enter a valid GitHub repo URL."),
  workflowGoal: z.string().min(12, "Tell us what you are trying to deploy."),
  firmware: z.string().min(2, "Choose your drone or firmware."),
  controlStyle: z.enum(["mission-first", "mixed", "continuous"]),
  usesVideo: z.enum(["yes", "no"]),
  painPoint: z.string().min(16, "Tell us where deployment gets painful."),
  wantsDesignPartner: z.enum(["yes", "no"]),
});

const firmwareOptions = [
  "PX4",
  "PX4 + companion computer",
  "PX4 research stack",
  "MAVSDK prototype",
];

export function RepoSubmissionForm() {
  const router = useRouter();
  const [serverMessage, setServerMessage] = React.useState<string>("");
  const [isPending, startTransition] = React.useTransition();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm<RepoSubmissionInput>({
    resolver: zodResolver(repoSubmissionSchema),
    defaultValues: {
      repoUrl: "",
      workflowGoal: "",
      firmware: "PX4",
      controlStyle: "mission-first",
      usesVideo: "no",
      painPoint: "",
      wantsDesignPartner: "yes",
    },
  });

  const onSubmit = handleSubmit((values) => {
    setServerMessage("");
    startTransition(async () => {
      const result = await submitRepoSubmission(values);

      if (result.fieldErrors) {
        for (const [field, messages] of Object.entries(result.fieldErrors)) {
          if (messages?.[0]) {
            setError(field as keyof RepoSubmissionInput, {
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
    <Card className="surface-panel surface-panel-dark rounded-[1.75rem] py-0">
      <CardHeader className="space-y-3 border-b border-border/70 py-6">
        <span className="section-kicker w-fit">Single-page intake</span>
        <CardTitle className="font-display text-2xl font-semibold tracking-tight">
          Submit a GitHub repo
        </CardTitle>
        <CardDescription className="max-w-2xl leading-7">
          This flow is intentionally lightweight. Tell Cirro what you are trying to
          deploy, where it hurts today, and whether you want design partner access.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 py-6">
        <div className="rounded-2xl border border-border/70 bg-muted/50 p-4 text-sm text-muted-foreground">
          This submission is mocked for validation purposes. After submit, the site
          sends you to a founder-follow-up state instead of a real backend queue.
        </div>

        <form className="space-y-5" onSubmit={onSubmit}>
          <div className="space-y-2">
            <Label htmlFor="repo-url">GitHub repo URL</Label>
            <Input
              id="repo-url"
              placeholder="https://github.com/org/mission-workflow"
              type="url"
              {...register("repoUrl")}
            />
            <FieldMessage message={errors.repoUrl?.message} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="workflow-goal">What are you trying to deploy?</Label>
            <Textarea
              id="workflow-goal"
              placeholder="A PX4 orchard scan, a roof inspection capture flow, a perimeter sweep..."
              rows={4}
              {...register("workflowGoal")}
            />
            <FieldMessage message={errors.workflowGoal?.message} />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Drone / firmware</Label>
              <Controller
                control={control}
                name="firmware"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose firmware" />
                    </SelectTrigger>
                    <SelectContent>
                      {firmwareOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldMessage message={errors.firmware?.message} />
            </div>

            <div className="space-y-2">
              <Label>Control style</Label>
              <Controller
                control={control}
                name="controlStyle"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose control style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mission-first">Mission-first</SelectItem>
                      <SelectItem value="mixed">Mixed</SelectItem>
                      <SelectItem value="continuous">Continuous</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldMessage message={errors.controlStyle?.message} />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Uses video?</Label>
              <Controller
                control={control}
                name="usesVideo"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose yes or no" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldMessage message={errors.usesVideo?.message} />
            </div>

            <div className="space-y-2">
              <Label>Interested in design partner access?</Label>
              <Controller
                control={control}
                name="wantsDesignPartner"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose yes or no" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldMessage message={errors.wantsDesignPartner?.message} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="pain-point">Current pain point</Label>
            <Textarea
              id="pain-point"
              placeholder="What breaks today: setup drift, compatibility guesswork, repeated manual steps?"
              rows={4}
              {...register("painPoint")}
            />
            <FieldMessage message={errors.painPoint?.message} />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              {serverMessage ||
                "After submit, Cirro asks you to book a founder call and optionally apply as a design partner."}
            </p>
            <Button disabled={isPending} size="lg" type="submit">
              {isPending ? "Submitting..." : "Submit repo"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

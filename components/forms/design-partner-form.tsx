"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { FieldMessage } from "@/components/forms/field-message";
import { submitDesignPartnerApplication } from "@/lib/actions/forms";
import type { DesignPartnerApplicationInput } from "@/lib/types";
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

export function DesignPartnerForm() {
  const router = useRouter();
  const [serverMessage, setServerMessage] = React.useState<string>("");
  const [isPending, startTransition] = React.useTransition();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm<DesignPartnerApplicationInput>({
    resolver: zodResolver(designPartnerSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "",
      repoOrWorkflowLink: "",
      buildDescription: "",
      packagingMotivation: "",
      willingToTestPilotBuilds: "yes",
    },
  });

  const onSubmit = handleSubmit((values) => {
    setServerMessage("");
    startTransition(async () => {
      const result = await submitDesignPartnerApplication(values);

      if (result.fieldErrors) {
        for (const [field, messages] of Object.entries(result.fieldErrors)) {
          if (messages?.[0]) {
            setError(field as keyof DesignPartnerApplicationInput, {
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
        <span className="section-kicker w-fit">Founder-led selection</span>
        <CardTitle className="font-display text-2xl font-semibold tracking-tight">
          Apply as a design partner
        </CardTitle>
        <CardDescription className="max-w-2xl leading-7">
          This should feel selective. Cirro is looking for technical co-creators who
          can pressure-test packaging assumptions and help narrow the first runtime.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 py-6">
        <div className="rounded-2xl border border-border/70 bg-accent/35 p-4 text-sm text-muted-foreground">
          The application flow is mocked, but the qualification logic is real:
          founder collaboration, packaging insight, and willingness to test pilot
          builds matter more than generic beta interest.
        </div>

        <form className="space-y-5" onSubmit={onSubmit}>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="partner-name">Name</Label>
              <Input id="partner-name" {...register("name")} />
              <FieldMessage message={errors.name?.message} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="partner-email">Email</Label>
              <Input id="partner-email" type="email" {...register("email")} />
              <FieldMessage message={errors.email?.message} />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="partner-role">Role</Label>
              <Input
                id="partner-role"
                placeholder="Developer, operator, researcher, founder"
                {...register("role")}
              />
              <FieldMessage message={errors.role?.message} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="partner-link">Repo / workflow link</Label>
              <Input
                id="partner-link"
                placeholder="https://github.com/org/workflow"
                {...register("repoOrWorkflowLink")}
              />
              <FieldMessage message={errors.repoOrWorkflowLink?.message} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="partner-build">What are you building?</Label>
            <Textarea
              id="partner-build"
              placeholder="Describe the workflow, aircraft context, and the operator problem behind it."
              rows={4}
              {...register("buildDescription")}
            />
            <FieldMessage message={errors.buildDescription?.message} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="partner-motivation">
              Why do you want to help shape the packaging standard?
            </Label>
            <Textarea
              id="partner-motivation"
              placeholder="Tell Cirro what packaging or deployment gap you want solved."
              rows={5}
              {...register("packagingMotivation")}
            />
            <FieldMessage message={errors.packagingMotivation?.message} />
          </div>

          <div className="space-y-2">
            <Label>Willing to test pilot builds?</Label>
            <Controller
              control={control}
              name="willingToTestPilotBuilds"
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
            <FieldMessage message={errors.willingToTestPilotBuilds?.message} />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              {serverMessage ||
                "Strong fits will be nudged toward direct founder collaboration and a closer design partnership."}
            </p>
            <Button disabled={isPending} size="lg" type="submit">
              {isPending ? "Submitting..." : "Apply for design partner access"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BetaAccessPage } from "@/components/marketing/beta-access-page";
import {
  earlyAccessAudienceValues,
  genericBetaAccessContent,
  isEarlyAccessAudience,
} from "@/lib/early-access";

type BetaAccessPageProps = {
  params: Promise<{
    audience: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return earlyAccessAudienceValues.map((audience) => ({ audience }));
}

export async function generateMetadata({
  params,
}: BetaAccessPageProps): Promise<Metadata> {
  const { audience } = await params;

  if (!isEarlyAccessAudience(audience)) {
    return {};
  }

  return {
    title: genericBetaAccessContent.heading,
    description: genericBetaAccessContent.supportCopy,
  };
}

export default async function BetaAccessAudiencePage({
  params,
}: BetaAccessPageProps) {
  const { audience } = await params;

  if (!isEarlyAccessAudience(audience)) {
    notFound();
  }

  return <BetaAccessPage preferredAudience={audience} />;
}

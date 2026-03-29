import type { Metadata } from "next";

import { BetaAccessPage } from "@/components/marketing/beta-access-page";
import { genericBetaAccessContent } from "@/lib/early-access";

export const metadata: Metadata = {
  title: genericBetaAccessContent.heading,
  description: genericBetaAccessContent.supportCopy,
};

export default function BetaAccessIndexPage() {
  return <BetaAccessPage />;
}

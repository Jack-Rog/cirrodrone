import { redirect } from "next/navigation";

export default function RuntimePreviewRedirectPage() {
  redirect("/pilot/apps/cirro-inspect/live");
}

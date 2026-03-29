import { redirect } from "next/navigation";

export default function SubmitRepoRedirectPage() {
  redirect("/developer/console/connect-repo");
}

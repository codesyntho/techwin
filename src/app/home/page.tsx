import { redirect } from "next/navigation";

export default function HomeRedirect() {
  // Permanently redirect /home to /
  redirect("/");
}

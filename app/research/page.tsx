import { notFound } from "next/navigation";
import Portfolio from "@/app/Portfolio";

// Keep Research available while developing, but hidden in production.
export default function Page() {
  if (process.env.NODE_ENV !== "development") notFound();
  return <Portfolio key="research" activeTab="research" />;
}

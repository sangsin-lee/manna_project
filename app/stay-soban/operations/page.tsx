import type { Metadata } from "next";
import OperationsDashboard from "./OperationsDashboard";

export const metadata: Metadata = {
  title: "스테이소반 운영",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

export default function OperationsPage() {
  return <OperationsDashboard />;
}

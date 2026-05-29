import { createFileRoute } from "@tanstack/react-router";
import { makeStub } from "./passes";

export const Route = createFileRoute("/audit")({
  head: () => ({ meta: [{ title: "Audit Trail · Sentry-Ops" }] }),
  component: makeStub("Audit trail", "Immutable log of every gate event, approval, and override."),
});

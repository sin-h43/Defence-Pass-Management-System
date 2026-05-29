import { createFileRoute } from "@tanstack/react-router";
import { makeStub } from "./passes";

export const Route = createFileRoute("/clearance")({
  head: () => ({ meta: [{ title: "Clearance Levels · Sentry-Ops" }] }),
  component: makeStub("Clearance levels", "Configure visitor clearance bands and approver matrices."),
});

// AUDIT-ADD: 2026-06-10 - TASK 2 slug redirect
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/logo-design-uae")({
  beforeLoad: () => {
    throw redirect({ to: "/services/logo-design", statusCode: 301 });
  },
  component: () => null,
});

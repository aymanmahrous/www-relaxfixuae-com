// AUDIT-ADD: 2026-06-10 - TASK 2 slug redirect
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/motion-graphics-abu-dhabi")({
  beforeLoad: () => {
    throw redirect({ to: "/services/motion-graphics", statusCode: 301 });
  },
  component: () => null,
});

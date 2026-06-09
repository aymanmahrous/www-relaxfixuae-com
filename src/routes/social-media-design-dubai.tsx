// AUDIT-ADD: 2026-06-10 - TASK 2 slug redirect
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/social-media-design-dubai")({
  beforeLoad: () => {
    throw redirect({ to: "/services/social-media-dubai", statusCode: 301 });
  },
  component: () => null,
});

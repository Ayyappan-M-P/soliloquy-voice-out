import { createFileRoute } from "@tanstack/react-router";
import { SoliloqySite } from "@/components/soliloqy-site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SOLILOQY — From Inner Voice to Outer Resonance" },
      { name: "description", content: "A joyful community for solo thinkers, quirky creators, unfinished ideas, and honest inner dialogue." },
      { property: "og:title", content: "SOLILOQY — The Open Monologue" },
      { property: "og:description", content: "Speak your mind. We're listening." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

// IMPORTANT: Replace this placeholder. See ./README.md for routing conventions.
function Index() {
  return <SoliloqySite />;
}

import DocStepCard from "@/components/docs/DocStepCard";
import { getDocPhase } from "@/lib/docs/content";
import Link from "next/link";

export default async function DocsPhasePage({
  params,
}: {
  params: Promise<{ phaseId: string }>;
}) {
  const { phaseId } = await params;
  const phase = getDocPhase(phaseId);

  if (!phase) {
    return (
      <p className="text-sm text-ink-muted">This phase doesn&apos;t exist.</p>
    );
  }

  const isGuide = phase.id === "guide";

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-serif text-xl font-semibold text-ink">
          {isGuide ? phase.title : `Phase ${phase.index}: ${phase.title}`}
        </h2>
        <p className="text-sm text-ink-muted mt-1">
          {isGuide ? (
            <>
              A practical walkthrough of UX Launchsite&apos;s own features,
              alongside the methodology manual.
            </>
          ) : (
            <>
              Step-by-step execution manual — pair this with the matching
              workspace templates in{" "}
              <Link href="/" className="text-accent hover:underline">
                your projects
              </Link>
              .
            </>
          )}
        </p>
      </div>
      <div className="flex flex-col gap-4">
        {phase.steps.map((step) => (
          <DocStepCard key={step.id} step={step} />
        ))}
      </div>
    </div>
  );
}

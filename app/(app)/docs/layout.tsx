import DocsSidebar from "@/components/docs/DocsSidebar";
import OnThisPage from "@/components/docs/OnThisPage";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row flex-1 min-w-0">
      <DocsSidebar />
      <div className="flex-1 min-w-0">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-4 sm:py-6 flex gap-8">
          <div className="flex-1 min-w-0">{children}</div>
          <OnThisPage />
        </div>
      </div>
    </div>
  );
}

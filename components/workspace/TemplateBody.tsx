import { getDeliverableConfig } from "@/lib/workflow/config";

import DocCanvas from "@/components/templates/DocCanvas";
import TableEditor from "@/components/templates/TableEditor";
import ScriptBuilder from "@/components/templates/ScriptBuilder";
import GroupBoard from "@/components/templates/GroupBoard";
import PersonaBuilder from "@/components/templates/PersonaBuilder";
import ImpactEffortMatrix from "@/components/templates/ImpactEffortMatrix";
import SitemapTree from "@/components/templates/SitemapTree";
import TaskFlowMapper from "@/components/templates/TaskFlowMapper";
import UserFlowGenerator from "@/components/templates/UserFlowGenerator";
import ChecklistEditor from "@/components/templates/ChecklistEditor";
import PrinciplesCard from "@/components/templates/PrinciplesCard";

export default function TemplateBody({
  config,
  data,
  onChange,
}: {
  config: NonNullable<ReturnType<typeof getDeliverableConfig>>;
  data: unknown;
  onChange: (data: unknown) => void;
}) {
  switch (config.type) {
    case "doc":
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return <DocCanvas sections={config.doc!.sections} data={data as any} onChange={onChange} />;
    case "table":
      return (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <TableEditor columns={config.table!.columns} data={data as any} onChange={onChange} />
      );
    case "script":
      return (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <ScriptBuilder sections={config.script!.sections} data={data as any} onChange={onChange} />
      );
    case "groupboard":
      return (
        <GroupBoard
          itemLabel={config.groupboard!.itemLabel}
          groupLabel={config.groupboard!.groupLabel}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data={data as any}
          onChange={onChange}
        />
      );
    case "persona":
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return <PersonaBuilder data={data as any} onChange={onChange} />;
    case "matrix2x2":
      return (
        <ImpactEffortMatrix
          xLabel={config.matrix2x2!.xLabel}
          yLabel={config.matrix2x2!.yLabel}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data={data as any}
          onChange={onChange}
        />
      );
    case "sitemap":
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return <SitemapTree data={data as any} onChange={onChange} />;
    case "taskflow":
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return <TaskFlowMapper data={data as any} onChange={onChange} />;
    case "userflow":
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return <UserFlowGenerator data={data as any} onChange={onChange} />;
    case "checklist":
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return <ChecklistEditor data={data as any} onChange={onChange} />;
    case "principles":
      return (
        <PrinciplesCard
          max={config.principles?.max ?? 4}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data={data as any}
          onChange={onChange}
        />
      );
    default:
      return null;
  }
}

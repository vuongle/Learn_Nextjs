import ChartHeader from "@/components/ChartHeader";
import CountChart from "@/components/CountChart";
import CountChartLegend from "@/components/CountChartLegend";
import prisma from "@/lib/prisma";
import React from "react";

export default async function CountChartContainer() {
  // get count of boys and girls, group by sex field
  const data = await prisma.student.groupBy({
    by: ["sex"],
    _count: true,
  });
  const boys = data.find((d) => d.sex === "MALE")?._count || 0;
  const girls = data.find((d) => d.sex === "FEMALE")?._count || 0;

  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
      {/* TITLE */}
      <ChartHeader title="Student" />

      {/* CHART */}
      <CountChart boys={boys} girls={girls} />

      {/* BOTTOM: show legends */}
      <CountChartLegend boys={boys} girls={girls} />
    </div>
  );
}

import React from "react";

export default function CountChartLegend({
  boys,
  girls,
}: {
  boys: number;
  girls: number;
}) {
  return (
    <div className="flex justify-center gap-16">
      <div className="flex flex-col gap-1">
        <div className="w-5 h-5 bg-lamaSky rounded-full" />
        <h1 className="font-bold">{boys}</h1>
        <h2 className="text-xs text-gray-300">
          Boys ({Math.round((boys / (boys + girls)) * 100)}%)
        </h2>
      </div>

      <div className="flex flex-col gap-1">
        <div className="w-5 h-5 bg-lamaYellow rounded-full" />
        <h1 className="font-bold">{girls}</h1>
        <h2 className="text-xs text-gray-300">
          Girls ({Math.round((girls / (boys + girls)) * 100)}%)
        </h2>
      </div>
    </div>
  );
}

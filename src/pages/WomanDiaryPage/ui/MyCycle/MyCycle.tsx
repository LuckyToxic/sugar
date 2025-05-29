import dayjs from "dayjs";

export interface Cycle {
  start: string;
  end: string | null;
}

interface MyCycleProps{
    cycles:Cycle[]
}

export default function MyCycle({ cycles }:MyCycleProps) {
  // Оставляем только завершённые циклы
  const finishedCycles = cycles.filter((c) => c.end);

  // Previous cycle length
  let previousCycleLength: string | number = "-";
  if (finishedCycles.length >= 2) {
    const last = finishedCycles[finishedCycles.length - 1];
    const prev = finishedCycles[finishedCycles.length - 2];
    previousCycleLength = dayjs(last.start).diff(dayjs(prev.start), "day");
  }

  // Length of previous periods
  let previousPeriodLength: string|number = "-";
  if (finishedCycles.length) {
    const last = finishedCycles[finishedCycles.length - 1];
    previousPeriodLength = dayjs(last.end).diff(dayjs(last.start), "day") + 1;
  }

  // Cycle length variation
  let minCycle: string | number = "-";
  let maxCycle: string | number = "-";
  if (finishedCycles.length >= 2) {
    const lengths = finishedCycles
      .slice(1)
      .map((c, i) =>
        dayjs(c.start).diff(dayjs(finishedCycles[i].start), "day")
      );
    minCycle = Math.min(...lengths);
    maxCycle = Math.max(...lengths);
  }

  return (
    <div className="mt-4">
      <h2 className="font-[600] text-[20px] ml-2 mb-3 tracing-[0.5px]">My cycle</h2>
      <div className="bg-white py-4 px-4 rounded-lg flex flex-col gap-4">
        <div className="flex items-center justify-between border-b-2 border-gray-100 pb-2.5">
          <div className="flex gap-2">
            <img src="media/woman-diary/drop.svg" alt="drop" className="mb-1"/>
            <div className="flex flex-col">
              <span className="text-black/60 text-[13px]">
                Previous cycle length
              </span>
              <span className="text-[#6147C6] text-[17px] font-semibold">
                {previousCycleLength !== "-"
                  ? `${previousCycleLength} days`
                  : "-"}
              </span>
            </div>
          </div>
          <span className="text-[#86EFB0] text-[17px] flex items-center gap-1">
            Norm ✓
          </span>
        </div>
        <div className="flex items-center justify-between border-b-2 border-gray-100 pb-2">
          <div className="flex gap-2">
            <img src="media/woman-diary/drop.svg" alt="drop" className="mb-1"/>
            <div className="flex flex-col gap-1">
              <span className="text-black/60 text-[13px]">
                Length of previous periods
              </span>
              <span className="text-[#6147C6] font-semibold text-base">
                {previousPeriodLength !== "-"
                  ? `${previousPeriodLength} days`
                  : "-"}
              </span>
            </div>
          </div>
          <span className="text-[#86EFB0] text-[17px] flex items-center gap-1">
            Norm ✓
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            <img
              src="media/woman-diary/clock.svg"
              alt="clock"
            />
            <div className="flex flex-col gap-1">
              <span className="text-black/60 text-[13px]">
                Cycle length variation
              </span>
              <span className="text-[#6147C6] font-semibold text-base">
                {minCycle !== "-" && maxCycle !== "-"
                  ? `${minCycle}-${maxCycle} days`
                  : "-"}
              </span>
            </div>
          </div>
          <span className="text-[#86EFB0] text-[17px] flex items-center gap-1">
            Norm ✓
          </span>
        </div>
      </div>
    </div>
  );
}

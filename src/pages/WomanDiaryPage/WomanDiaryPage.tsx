import dayjs from "dayjs";
import { useState } from "react";
import CalendarHeader from "./ui/CalendarHeader/CalendarHeader";
import MyCycle from "./ui/MyCycle/MyCycle";
import CycleStory from "./ui/CycleStory/CycleStory";

const initialCycles = [
  { start: "2025-02-23", end: "2025-02-27" },
  { start: "2025-03-21", end: "2025-03-25" },
  { start: "2025-05-27", end: null },
];

export default function WomanDiaryPage() {
  // cycles — основной источник данных
  const [cycles, setCycles] = useState(initialCycles);
  const today = dayjs();

  // Текущий цикл — последний в массиве
  const currentCycle = cycles[cycles.length - 1];

  // Завершить текущий цикл
  const handleMarkPeriod = () => {
    if (!currentCycle.end) {
      setCycles((prev) =>
        prev.map((c, idx) =>
          idx === prev.length - 1
            ? { ...c, end: today.format("YYYY-MM-DD") }
            : c
        )
      );
    }
  };

  // Начать новый цикл (только если предыдущий завершён и сегодня после end)
  const handleStartNew = () => {
    if (currentCycle.end && today.isAfter(dayjs(currentCycle.end), "day")) {
      setCycles((prev) => [
        ...prev,
        { start: today.format("YYYY-MM-DD"), end: null },
      ]);
    }
  };

  return (
    <div className="h-screen-dynamic-minus-header flex flex-col tracking-[0.5px]">
      <CalendarHeader
        cycle={currentCycle}
        today={today}
        onMarkPeriod={handleMarkPeriod}
        onStartNew={handleStartNew}
      />
      <div className="bg-[#F7F7F7] flex-1 -mt-6 pt-5 px-5 overflow-y-auto hide-scrollbar">
        <MyCycle cycles={cycles} />
        <CycleStory cycles={cycles} today={today} />
      </div>
    </div>
  );
}

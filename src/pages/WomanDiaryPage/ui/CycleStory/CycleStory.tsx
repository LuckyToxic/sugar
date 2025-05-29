import dayjs, { Dayjs } from "dayjs";
import { Cycle } from "../MyCycle/MyCycle";

interface CycleStory {
  cycles: Cycle[];
  today: Dayjs;
}

export default function CycleStory({ cycles, today }: CycleStory) {
  // Показываем сначала текущий цикл (если не завершён), потом завершённые циклы в обратном порядке
  const items = [...cycles].reverse();

  return (
    <div className="mt-2">
      <h2 className="font-[600] text-[20px] mx-2 mb-2">Cycle story</h2>
      <div className="bg-white flex flex-col p-4 px-4 gap-3 rounded-lg">
        {items.map((cycle, idx) => {
          const isCurrent = !cycle.end;
          const start = dayjs(cycle.start).format("DD MMM").toLowerCase();
          const end = cycle.end
            ? dayjs(cycle.end).format("DD MMM").toLocaleLowerCase()
            : null;
          const length = cycle.end
            ? dayjs(cycle.end).diff(dayjs(cycle.start), "day") + 1
            : today.diff(dayjs(cycle.start), "day") + 1;
          return (
            <div
              key={idx}
              className="border-b-2 border-gray-100 last:border-none last:pb-0 pb-3"
            >
              <div className="flex items-center gap-4">
                <img src="media/woman-diary/clock.svg" alt="" />
                <div>
                  <span className={`font-[500] text-[17px] text-[#6147C6]`}>
                    {isCurrent ? "Current cycle:" : ""}
                    {` ${length} days`}
                  </span>
                  <div className="text-[13px] text-gray-500">
                    {isCurrent ? `started ${start}` : `${start} - ${end}`}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

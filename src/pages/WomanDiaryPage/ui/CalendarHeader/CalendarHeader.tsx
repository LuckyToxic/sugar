import dayjs, { Dayjs } from "dayjs";

interface Cycle {
  start: string;
  end: string | null;
}

interface CalendarHeaderProps {
  today: Dayjs;
  cycle: Cycle;
  onMarkPeriod: () => void;
  onStartNew: () => void;
}

export default function CalendarHeader({
  today,
  cycle,
  onMarkPeriod,
  onStartNew,
}: CalendarHeaderProps) {
  const weekStart = today.startOf("week").add(1, "day");
  const weekDays = Array.from({ length: 7 }, (_, i) => weekStart.add(i, "day"));

  const isStart = (date: Dayjs) => date.isSame(dayjs(cycle.start), "day");
  const isToday = (date: Dayjs) => date.isSame(today, "day");
  const isEnd = (date: Dayjs) =>
    cycle.end && date.isSame(dayjs(cycle.end), "day");

  const cycleDays = cycle.end
    ? dayjs(cycle.end).diff(dayjs(cycle.start), "day") + 1
    : today.diff(dayjs(cycle.start), "day") + 1;

  const canStartNew = cycle.end && today.isAfter(dayjs(cycle.end), "day");

  return (
    <div className="rounded-b-3xl">
      <div className="relative flex items-center justify-center mb-2">
        <span className="text-[24px] text-white">{today.format("D MMMM")}</span>
      </div>

      {/* Неделя */}
      <div className="flex justify-around mb-4 px-4">
        {weekDays.map((date, idx) => {
          let dayClass =
            "flex flex-col items-center px-3 py-2 rounded-md leading-[1.2]";
          if (isStart(date) || isEnd(date)) {
            dayClass += " bg-[#FF668D] text-white font-bold";
          } else if (isToday(date)) {
            dayClass += " bg-white text-violet-600 font-bold";
          } else {
            dayClass += " text-white";
          }
          return (
            <div key={idx} className={dayClass}>
              <span>{date.format("DD")}</span>
              <span>{date.format("dd")}</span>
            </div>
          );
        })}
      </div>
      <div
        className="relative pb-4 rounded-b-3xl z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(97,71,198,0) 0%, #6147C6 10%, #6147C6 100%)",
        }}
      >
        {/* Текущий день цикла */}
        <div className="text-center text-white">menses:</div>
        <div className="text-center text-[24px] mb-2 text-white">
          {cycleDays}th day
        </div>

        {/* Кнопка */}
        <div className="flex justify-center mb-2">
          {!cycle.end ? (
            <button
              onClick={onMarkPeriod}
              className="bg-[#FF668D] hover:bg-pink-500 transition text-white text-[13px] rounded-lg px-4 py-1"
            >
              mark your period
            </button>
          ) : (
            <button
              onClick={onStartNew}
              disabled={!canStartNew}
              className={`text-[13px] rounded-lg px-4 py-1 ${
                canStartNew
                  ? "bg-[#FF668D] hover:bg-pink-500 text-white"
                  : "bg-[#FF668D]/50 text-white/50 cursor-not-allowed"
              }`}
            >
              start new period
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

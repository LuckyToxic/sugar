import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// Форматирование заголовка с Today/Yesterday
function formatHeader(date: Date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const selected = new Date(date);
  selected.setHours(0, 0, 0, 0);

  const diffTime = today.getTime() - selected.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  const formattedDate = selected.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  if (diffDays === 0) {
    return `Today, ${formattedDate}`;
  } else if (diffDays === 1) {
    return `Yesterday, ${formattedDate}`;
  } else {
    return formattedDate;
  }
}

interface DiaryHeaderProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export function CheckupHeader({
  selectedDate,
  onDateChange,
}: DiaryHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4 relative">
      <div className="text-[24px] font-[500] text-[#674EC8]">
        {formatHeader(selectedDate)}
      </div>
      <div className="relative">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => onDateChange(date as Date)}
          dateFormat="dd MMMM, yyyy"
          maxDate={new Date()}
          customInput={
            <span className="material-icons">
              <img src="media/calendar.svg" alt="calendar" />
            </span>
          }
          popperPlacement="bottom-end"
        />
      </div>
    </div>
  );
}

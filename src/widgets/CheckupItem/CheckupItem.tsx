import {
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
  LeadingActions,
  Type as ListType,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";

type CheckupItemProps = {
  title: string;
  img: string;
  isPast: boolean;
  time: string;
};

export default function CheckupItem({
  title,
  img,
  isPast,
  time,
}: CheckupItemProps) {
  const containerClass = isPast ? "bg-[#6147C61A]" : "bg-white";

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => alert(`Edit "${title}"`)}>
        <div
          className="bg-[#6147C6] min-w-[57px] h-full flex items-center justify-center rounded-l-[10px]"
          style={{ justifyContent: "center" }}
        >
          <img src="media/checkup/edit.svg" alt="Edit" className="w-5 h-5" />
        </div>
      </SwipeAction>
    </LeadingActions>
  );

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction onClick={() => alert(`Delete "${title}"`)}>
        <div
          className="bg-[#FF3B30] w-[73px] h-full flex items-center justify-center rounded-r-[10px]"
          style={{ justifyContent: "center" }}
        >
          <img
            src="media/checkup/trash.svg"
            alt="Delete"
            className="w-5 h-5 object-contain"
          />
        </div>
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <div className="rounded-[10px] overflow-hidden">
      {" "}
      {/* Внешняя обёртка с radius */}
      <SwipeableList
        type={ListType.IOS}
        style={{ height: "auto", flex: "0 0 auto" }}
      >
        <SwipeableListItem
          leadingActions={leadingActions()}
          trailingActions={trailingActions()}
        >
          <div
            className={`w-full h-[72px] p-2.5 pr-3 flex gap-4 ${containerClass}`}
          >
            <div className="min-w-[52px] flex items-center justify-center">
              <img src={img} alt={title} />
            </div>

            <div className="grow flex flex-col text-[17px] leading-[22px] font-semibold gap-2 w-full">
              <span className="text-[#282828] tracking-[-0.41px]">{title}</span>

              <div className="flex justify-between">
                <span className="text-[#6147C6]">17 April, {time}</span>
                <span className="text-[13px] leading-[22px] tracking-[-0.41px] font-semibold text-[#B6B6B6]">
                  Tomorrow
                </span>
              </div>
            </div>
          </div>
        </SwipeableListItem>
      </SwipeableList>
    </div>
  );
}

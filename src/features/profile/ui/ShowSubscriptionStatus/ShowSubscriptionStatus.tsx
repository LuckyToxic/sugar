import { CustomRadio } from "../../../../shared/ui/CustomRadio/CustomRadio";

interface ShowSubscriptionStatusProps {
  active: boolean;
  days: number;
}

export default function ShowSubscriptionStatus({
  active,
  days,
}: ShowSubscriptionStatusProps) {
  return (
    <div className="rounded-xl bg-white shadow px-4 pt-2 pb-4 flex flex-col gap-2">
      <div className="flex items-center justify-between border-b pb-2">
        <span className="font-[500]">Subscription active</span>
        <CustomRadio checked={active} />
      </div>
      <div className="flex justify-between text-[13px]">
        <span className="text-gray-500 ">
          the subscription expires in {days} days{" "}
        </span>
        <span
          className="h-[17px] font-[500] border-b border-[#6147C6] text-[#6147C6] "
        >
          increase plan
        </span>
      </div>
    </div>
  );
}

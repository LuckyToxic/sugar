import { useAppSelector } from "@/shared/hooks/reduxHooks";

type InfoItemProps = {
  label: string;
  value: null | number | undefined | string;
  unit: string;
};

function InfoItem({ label, value, unit }: InfoItemProps) {
  return (
    <div className="flex flex-col grow justify-center items-center text-center">
      <span className="text-[#F7F7F7] text-[17px] font-medium leading-[22px] opacity-50">
        {label}
      </span>
      <span className="text-white text-[24px] font-semibold leading-[30px]">
        {value ?? "-"}
        <span className="text-[17px] ml-1">{unit}</span>
      </span>
    </div>
  );
}

export function InfoCard() {
  const user = useAppSelector((state) => state.user.user);
  return (
    <div className="flex w-full relative gap-4 min-h-[78px] bg-[#6147C6] rounded-[11px] p-3 justify-between items-start">
      <InfoItem label="Growth" value={user?.weight} unit="cm" />
      <Divider />
      <InfoItem label="Weight" value={user?.weight} unit="kg" />
      <Divider />
      <InfoItem label="Diabetes" value={user?.diabetic_type} unit="type" />
    </div>
  );
}

function Divider() {
  return <div className="h-full w-[2px] bg-white" />;
}

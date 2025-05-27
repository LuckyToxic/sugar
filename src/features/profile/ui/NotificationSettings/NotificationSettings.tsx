import { CustomSwitch } from "../../../../shared/ui/CustomSwitch/CustomSwitch";

interface NotificationSettingsProps{
  activeChannel:string | null
  onChange:(channel:string) => void
}

export function NotificationSettings({ activeChannel, onChange }:NotificationSettingsProps) {
  return (
    <div className=" rounded-xl bg-white shadow px-4 pb-2 flex flex-col gap-2">
      {["Telegram", "WhatsApp", "Push"].map((channel) => (
        <div
          key={channel}
          className="flex justify-between items-center border-b last:border-b-0 py-2"
        >
          <span className="text-black font-[500]">{channel}</span>
          <CustomSwitch
            checked={activeChannel === channel}
            onChange={() => onChange(channel)}
            thumbColor="#ffffff"
            thumbCheckedColor="#ffffff"
            trackColor="#868686"
            trackCheckedColor="#6147C6"
            thumbSize="19px" // уменьшенный размер бегунка
            trackWidth="38px" // уменьшенная ширина трека
            trackHeight="24px" // уменьшенная высота трека
          />
        </div>
      ))}
    </div>
  );
}
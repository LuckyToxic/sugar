import { useAppSelector } from "@/shared/hooks/reduxHooks";

export function MedicalCardHeader() {
  const user = useAppSelector((state) => state.user.user);

  return (
    <div className="flex relative gap-4 mb-9">
      <div className="min-w-[89px] h-[89px]">
        <img
          className="w-full h-full rounded-full"
          src={user?.user_photo || "media/user-icon.svg"}
        ></img>
      </div>
      <div className="grow flex flex-col justify-between mb-[1px]">
        <div className="text-[24px] font-semibold">
          {user?.first_name || user?.last_name
            ? `${user.first_name ?? ""} ${user.last_name ?? ""}`.trim()
            : user?.tg_username || user?.email || "Unknown"}
        </div>
        <div className="flex justify-between">
          <div className="flex gap-4">
            <div className="flex flex-col">
              <span className="text-[13px] text-[#282828] font-semibold opacity-50 h-[22px]">
                Gender
              </span>
              <span className="text-[17px] text-[#282828] font-semibold">
                {user?.gender || "-"}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] text-[#282828] font-semibold opacity-50 h-[22px]">
                Age
              </span>
              <span className="text-[17px] text-[#282828] font-semibold">
                {user?.date_of_birth || "-"}
              </span>
            </div>
          </div>
          <div className="flex gap-4 items-end mb-1">
            {/* <div className="w-[34px] h-[34px] rounded-full bg-[#8A83F3] flex justify-center items-center">
              <img src="media/medical-card/edit.svg"></img>
            </div> */}
            <div className="w-[34px] h-[34px] rounded-full bg-[#8A83F3] flex justify-center items-center">
              <img src="media/medical-card/download.svg"></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

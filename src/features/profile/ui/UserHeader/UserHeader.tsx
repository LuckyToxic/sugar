import type { User } from "../../../../entities/user/model";

interface UserHeaderProps {
  user: User | null;
}

export default function UserHeader({ user }: UserHeaderProps) {
  return (
    <div className="w-full flex items-center border-b-2 gap-4 pb-4">
      {user?.photo_url ? (
        <span className="w-20 h-20 rounded-full">
          <img
            src={user?.photo_url}
            alt="user photo"
            className="w-20 rounded-full border-4 border-[#3D2E76]"
          />
        </span>
      ) : (
        <span className="w-20 h-20">
          <img
            src="media/user-icon.svg"
            alt="user icon"
            className="w-20 h-20 rounded-full bg-[#6147C6]"
          />
        </span>
      )}
      <div className="flex-1 flex items-start">
        <div>
          <div className="font-semibold">
            {user?.first_name || "Guest"} {user?.last_name}
          </div>
          <div className="text-[14px] text-gray-500">
            @{user?.username || "Username"}
          </div>
        </div>
      </div>
    </div>
  );
}

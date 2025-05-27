import { CustomRadio } from "../../../../shared/ui/CustomRadio/CustomRadio";

export interface ConnectedProfile {
  id: string;
  name: string;
  icon: React.ReactNode
  data:string
  confirmed: boolean;
}

interface ShowAccountLinkingProps {
  profiles: ConnectedProfile[];
  onToggleConfirm?: (id: string) => void;
}

export function ShowAccountLinking({ profiles }: ShowAccountLinkingProps) {
  return (
    <div className="rounded-xl bg-white shadow px-4 py-2 flex flex-col gap-4">
      {profiles.map(({ id, icon,data, confirmed }) => (
        <div
          key={id}
          className="flex items-center justify-between border-b last:border-b-0 pb-2"
        >
          <div className="flex items-center gap-3">
            {icon}
            <div>
              <div className="font-semibold text-black">{data}</div>
            </div>
          </div>
          <CustomRadio checked={confirmed} />
        </div>
      ))}
    </div>
  );
}

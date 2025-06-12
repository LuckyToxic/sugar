import { useAppSelector } from "@/shared/hooks/reduxHooks";
import { CockpitCard } from "@/widgets/CockpitCard/Cockpit";

export function Cockpit() {
  const user = useAppSelector((state) => state.user.user);
  return (
    <div>
      <h1 className="text-[24px] font-semibold mt-7 mb-4">Cockpit</h1>
      <div className="w-full gap-2 flex">
        <CockpitCard
          title="Weight"
          date="22 march"
          value={`${user?.weight || "-"} kg`}
          bgImage="media/medical-card/weight.svg"
          bgPosition="center"
        />
        <CockpitCard
          title="Glucose level"
          date="22 march"
          value={`${user?.cir || "-"} ${user?.glucose_unit}`}
          bgImage="media/medical-card/glucose.svg"
          bgPosition="right bottom"
        />
        <CockpitCard
          title="Blood pressure"
          date="22 march"
          value="- sys/dia"
          bgImage="media/medical-card/heart.svg"
          bgPosition="right bottom"
        />
      </div>
    </div>
  );
}

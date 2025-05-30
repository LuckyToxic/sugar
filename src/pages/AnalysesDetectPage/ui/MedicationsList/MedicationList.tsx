import { Button } from "@/shared/ui/Button/Button";

interface Medication {
  title: string;
}

interface MedicationListProps {
  medications: Medication[];
}

export default function MedicationList({ medications }: MedicationListProps) {
  return (
    <div className="flex flex-col justify-between min-h-0 gap-4 px-5 pt-3 tracking-[0.5px] flex-1">
      <div className="flex flex-col gap-4 min-h-0">
        <h2 className="text-white text-[20px] font-[500]">Recognised:</h2>
        <div className="flex flex-col gap-2 min-h-0 overflow-y-auto hide-scrollbar">
          {medications.map((medication, index) => (
            <div
              key={index}
              className="flex text-white gap-4 w-full items-center rounded-lg border-2 border-[#FFFFFF80] bg-white/10 p-4"
              style={{
                backdropFilter: "blur(20px)",
              }}
            >
              <span>
                <img src="media/medication.svg" alt="medication" />
              </span>
              <div className="text-[17px]">{medication.title}</div>
            </div>
          ))}
        </div>
      </div>
      <Button className="text-white tex-[17px]">Send</Button>
    </div>
  );
}

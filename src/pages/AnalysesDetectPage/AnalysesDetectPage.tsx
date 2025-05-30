import CameraWidget from "@/widgets/CameraWidget/CameraWidget";
import { useState } from "react";
import MedicationList from "./ui/MedicationsList/MedicationList";

const mockMedications = [
  { title: "Paracetamol" },
  { title: "Strepsisls" },
  { title: "Arbidol" },
  { title: "Ibuprofen" },
  { title: "Mucaltin" },
  { title: "Sinupred" },
];

export default function AnalysesDetectPage() {
  const [photo, setPhoto] = useState<string | null>(null);
  return (
    <div className="h-screen-dynamic-minus-header">
      {!photo && <CameraWidget onCapture={setPhoto} />}
      {photo && (
        <div className="flex flex-col h-full pb-8">
          <div className="w-full h-[42%]">
            <img
              src={photo}
              alt="recipe"
              className="w-full h-full object-cover"
            />
          </div>
         <MedicationList medications={mockMedications}/>
        </div>
      )}
    </div>
  );
}

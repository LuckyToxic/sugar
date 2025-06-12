import { RecognisedAnalysesCard } from "@/widgets/RecognisedAnalysesCard/RecognisedAnalysesCard";

export function RecognisedAnalyses() {
  return (
    <div>
      <h1 className="text-[24px] font-semibold mt-6 mb-4">
        Recognised analyses
      </h1>
      <div className="w-full gap-2 flex flex-col">
        <RecognisedAnalysesCard title={"Paracetamol"} />
        <RecognisedAnalysesCard title={"Paracetamol"} />
        <RecognisedAnalysesCard title={"Paracetamol"} />
      </div>
    </div>
  );
}

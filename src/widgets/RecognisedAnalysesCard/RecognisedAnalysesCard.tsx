interface RecognisedAnalysesCardProps {
  title: string;
}

export function RecognisedAnalysesCard({ title }: RecognisedAnalysesCardProps) {
  return (
    <div className="bg-[#FFFFFF] rounded-[10px] flex h-[61px] w-full text-[#6147C6] text-[17px] font-semibold items-center px-5 py-2 gap-3">
      <div>
        <img src="media/medical-card/pills.svg"></img>
      </div>
      <div>{title}</div>
    </div>
  );
}

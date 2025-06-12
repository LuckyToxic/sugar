import { AppDispatch } from "@/app/store/store";
import { Cockpit } from "./ui/Cockpit/Cockpit";
import { InfoCard } from "./ui/InfoCard/InfoCard";
import { MedicalCardHeader } from "./ui/MedicalCardHeader/MedicalCardHeader";
import { RecognisedAnalyses } from "./ui/RecognisedAnalyses/RecognisedAnalyses";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserThunk } from "@/entities/user/api/userApi";

export default function MedicalCardPage() {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserThunk());
  }, []);

  return (
    <div className="w-full flex flex-col h-screen-dynamic-minus-header overflow-y-auto bg-[#F8F8F8] p-6">
      <MedicalCardHeader />
      <InfoCard />
      <Cockpit />
      <RecognisedAnalyses />
    </div>
  );
}

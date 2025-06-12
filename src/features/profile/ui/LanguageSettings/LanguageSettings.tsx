import { CustomRadio } from "../../../../shared/ui/CustomRadio/CustomRadio";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import { updateUserLangThunk } from "@/entities/user/api/updateLang";

const languageMap: Record<string, string> = {
  ru_RU: "Русский",
  en_US: "English",
  pl_PL: "Polski",
  de_DE: "Deutsch",
};

export function LanguageSettings() {
  const dispatch = useAppDispatch();
  const lang = useAppSelector((state) => state.user.user?.sub_data.lang);
  const languageCodes = Object.keys(languageMap);

  function onChange(languageCode: string) {
    dispatch(updateUserLangThunk(languageCode));
  }

  return (
    <div className="rounded-xl bg-white shadow px-4 pb-2 flex flex-col gap-2">
      {languageCodes.map((code) => (
        <div
          key={code}
          className="flex justify-between items-center border-b last:border-b-0 py-1 cursor-pointer"
          onClick={() => onChange(code)}
        >
          <span className="text-black font-[500]">{languageMap[code]}</span>
          <CustomRadio checked={lang === code} />
        </div>
      ))}
    </div>
  );
}

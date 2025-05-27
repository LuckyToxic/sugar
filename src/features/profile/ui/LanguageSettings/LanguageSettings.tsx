import { CustomRadio } from "../../../../shared/ui/CustomRadio/CustomRadio";

interface LanguageSettingsProps {
  activeLanguage: string;
  onChange: (language: string) => void;
}

export function LanguageSettings({
  activeLanguage,
  onChange,
}: LanguageSettingsProps) {
  const languages = ["Русский", "English", "Polski", "Deutsch"];

  return (
    <div className="rounded-xl bg-white shadow px-4 pb-2 flex flex-col gap-2">
      {languages.map((language) => (
        <div
          key={language}
          className="flex justify-between items-center border-b last:border-b-0 py-1 cursor-pointer"
          onClick={() => onChange(language)}
        >
          <span className="text-black font-[500]">{language}</span>
          <CustomRadio
            checked={activeLanguage === language}
            onChange={() => onChange(language)}
          />
        </div>
      ))}
    </div>
  );
}

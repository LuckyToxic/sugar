import { Nutrients } from "../../types";

interface NutrientsSummeryProps {
  nutrients: Nutrients;
}

const summaryItems = [
  { label: "Sugar", key: "sugar", unit: "gr" },
  { label: "Glycemic index", key: "glycemicIndex", unit: "" },
  { label: "Protein-fat units", key: "proteinFatUnits", unit: "gr" },
  { label: "Insulin", key: "insulin", unit: "gr" },
  {
    label: "Glucose before",
    key: "glucoseBefore",
    unit: "mmol/L",
    defaultValue: "-mmol/L",
  },
  {
    label: "Glucose after",
    key: "glucoseAfter",
    unit: "mmol/L",
    defaultValue: "+mmol/L",
  },
  { label: "Physical activity", key: "physicalActivity", unit: "" },
];

export default function NutrientsSummery({ nutrients }: NutrientsSummeryProps) {
  
  return (
    <div className="bg-[#674EC8] rounded-xl mb-4 shadow-lg">
      <div className="flex items-center text-white justify-between p-4 font-[500] leading-[1.3]">
        <div className="flex flex-col items-center">
          <div className="text-[22px]">{nutrients.calories}</div>
          <div className="text-[18px]">Calories</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-[22px]">{nutrients.protein.toFixed(1)}</div>
          <div className="text-[18px]">Protein</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-[22px]">{nutrients.fats.toFixed(1)}</div>
          <div className="text-[18px]">Fats</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-[22px]">{nutrients.carbs.toFixed(1)}</div>
          <div className="text-[18px]">Carbs</div>
        </div>
      </div>
      <div className="flex flex-col gap-1 bg-white p-4 rounded-b-xl text-[14px]">
        {summaryItems.map(({ label, key, unit, defaultValue }) => (
          <div
            key={key}
            className="flex justify-between items-center border-b border-gray-100 pb-1 last:border-none"
          >
            <div className="flex gap-2">
              <span className="w-6">
                <img
                  src={`media/diary/${label.toLowerCase().replace(/\s+/g, "-")}.svg`}
                  alt={label.toLowerCase()}
                />
              </span>
              <span className="font-[500] tracking-[0.5px]">{label}</span>
            </div>
            <span className="text-[#6147C6] font-[500]">
              {nutrients[key as keyof Nutrients] !== undefined &&
              nutrients[key as keyof Nutrients] !== null
                ? typeof nutrients[key as keyof Nutrients] === "number"
                  ? (nutrients[key as keyof Nutrients] as number).toFixed(1)
                  : nutrients[key as keyof Nutrients]
                : defaultValue || ""}{' '}
              {unit}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

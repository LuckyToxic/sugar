import { FoodItem } from "./types";

export const getNutrients = (products: FoodItem[]) => {
  const totals = {
    calories: 0,
    protein: 0,
    fats: 0,
    carbs: 0,
    sugar: 0,
    glycemicIndex: 0,
    proteinFatUnits: 0,
    insulin: 0,
    glucoseBefore: "",
    glucoseAfter: "",
    physicalActivity: "Low",
  };

  if (!products || products.length === 0) return totals;

  for (const product of products) {
    totals.calories += product.calories || 0;

    product.extra.forEach(({ label, value }) => {
      const normalizedLabel = label.toLowerCase().replace(/-/g, " ").trim();

      switch (normalizedLabel) {
        case "protein":
          totals.protein += Number(value) || 0;
          break;
        case "fats":
          totals.fats += Number(value) || 0;
          break;
        case "carbs":
          totals.carbs += Number(value) || 0;
          break;
        case "sugar":
          totals.sugar += Number(value) || 0;
          break;
        case "glycemic index":
          totals.glycemicIndex += Number(value) || 0;
          break;
        case "protein fat units":
        case "protein-fat units":
          totals.proteinFatUnits += Number(value) || 0;
          break;
        case "insulin":
          totals.insulin += Number(value) || 0;
          break;
        case "glucose before":
          if (value) totals.glucoseBefore = String(value);
          break;
        case "glucose after":
          if (value) totals.glucoseAfter = String(value);
          break;
        case "physical activity":
          if (value) totals.physicalActivity = String(value);
          break;
      }
    });
  }

  return totals;
};

export interface Nutrients {
  calories: number;
  protein: number;
  fats: number;
  carbs: number;
  sugar: number;
  glycemicIndex: number;
  proteinFatUnits: number;
  insulin: number;
  glucoseBefore?: string;
  glucoseAfter?: string;
  physicalActivity: string;
}

export interface ExtraItem {
  label: string;
  value: number | string;
  unit?: string;
}

export interface FoodItem {
  id: number;
  name: string;
  details: string;
  calories: number;
  extra: ExtraItem[];
}

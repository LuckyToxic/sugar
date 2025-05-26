export interface ExtraItem {
  label: string;
  value: string;
  unit: string;
  icon?: string;
}

export interface Product {
  name: string;
  details?: string;
  calories?: number;
  extra: ExtraItem[];
}
  
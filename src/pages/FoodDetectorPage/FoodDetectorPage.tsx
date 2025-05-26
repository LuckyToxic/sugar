import { useState } from "react";
import CameraWidget from "../../widgets/CameraWidget/CameraWidget";
import { Button } from "../../shared/ui/Button/Button";
import ProductDetails from "../../widgets/ProductDetails/ProductDetails";
import ProductList from "../../widgets/ProductList/ProductList";
import type { Product } from "../../entities/product/model";

const mockProducts = [
  {
    name: "Chicken",
    details: "Chicken, 78 g",
    extra: [
      { label: "Gram", value: "78", icon: "weight", unit: "gr" },
      { label: "Calories", value: "134", icon: "fire", unit: "calories" },
      { label: "Protein", value: "16.0", icon: "protein", unit: "gr" },
      { label: "Fats", value: "14.0", icon: "fats", unit: "gr" },
      { label: "Carbs", value: "0.0", icon: "carbs", unit: "gr" },
      { label: "Sugar", value: "0.0", icon: "sugar", unit: "gr" },
      { label: "Glycemic index", value: "0", icon: "glycemic", unit: "" },
      { label: "Protein-fat units", value: "2.1", icon: "pfu", unit: "gr" },
    ],
  },
  {
    name: "Eggs",
    details: "Eggs, 60 g",
    extra: [
      { label: "Gram", value: "60", icon: "weight", unit: "gr" },
      { label: "Calories", value: "88", icon: "fire", unit: "calories" },
      { label: "Protein", value: "7.0", icon: "protein", unit: "gr" },
      { label: "Fats", value: "6.0", icon: "fats", unit: "gr" },
      { label: "Carbs", value: "1.0", icon: "carbs", unit: "gr" },
      { label: "Sugar", value: "1.0", icon: "sugar", unit: "gr" },
      { label: "Glycemic index", value: "0", icon: "glycemic", unit: "" },
      { label: "Protein-fat units", value: "1.3", icon: "pfu", unit: "gr" },
    ],
  },
  {
    name: "Avocado",
    details: "Avocado, 55 g",
    extra: [
      { label: "Gram", value: "55", icon: "weight", unit: "gr" },
      { label: "Calories", value: "110", icon: "fire", unit: "calories" },
      { label: "Protein", value: "1.0", icon: "protein", unit: "gr" },
      { label: "Fats", value: "10.0", icon: "fats", unit: "gr" },
      { label: "Carbs", value: "5.0", icon: "carbs", unit: "gr" },
      { label: "Sugar", value: "0.0", icon: "sugar", unit: "gr" },
      { label: "Glycemic index", value: "10", icon: "glycemic", unit: "" },
      { label: "Protein-fat units", value: "0.2", icon: "pfu", unit: "gr" },
    ],
  },
  {
    name: "Tomato",
    details: "Tomato, 45 g",
    extra: [
      { label: "Gram", value: "45", icon: "weight", unit: "gr" },
      { label: "Calories", value: "18", icon: "fire", unit: "calories" },
      { label: "Protein", value: "1.0", icon: "protein", unit: "gr" },
      { label: "Fats", value: "0.0", icon: "fats", unit: "gr" },
      { label: "Carbs", value: "4.0", icon: "carbs", unit: "gr" },
      { label: "Sugar", value: "3.0", icon: "sugar", unit: "gr" },
      { label: "Glycemic index", value: "15", icon: "glycemic", unit: "" },
      { label: "Protein-fat units", value: "0", icon: "pfu", unit: "gr" },
    ],
  },
  {
    name: "Cucumber",
    details: "Cucumber, 30 g",
    extra: [
      { label: "Gram", value: "30", icon: "weight", unit: "gr" },
      { label: "Calories", value: "12", icon: "fire", unit: "calories" },
      { label: "Protein", value: "0.0", icon: "protein", unit: "gr" },
      { label: "Fats", value: "0.0", icon: "fats", unit: "gr" },
      { label: "Carbs", value: "2.0", icon: "carbs", unit: "gr" },
      { label: "Sugar", value: "1.0", icon: "sugar", unit: "gr" },
      { label: "Glycemic index", value: "15", icon: "glycemic", unit: "" },
      { label: "Protein-fat units", value: "0", icon: "pfu", unit: "gr" },
    ],
  },
  {
    name: "Bread",
    details: "Bread, 50 g",
    extra: [
      { label: "Gram", value: "50", icon: "weight", unit: "gr" },
      { label: "Calories", value: "120", icon: "fire", unit: "calories" },
      { label: "Protein", value: "4.0", icon: "protein", unit: "gr" },
      { label: "Fats", value: "1.0", icon: "fats", unit: "gr" },
      { label: "Carbs", value: "24.0", icon: "carbs", unit: "gr" },
      { label: "Sugar", value: "2.0", icon: "sugar", unit: "gr" },
      { label: "Glycemic index", value: "70", icon: "glycemic", unit: "" },
      { label: "Protein-fat units", value: "0.2", icon: "pfu", unit: "gr" },
    ],
  },
];
export default function FoodDetectorPage() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [selectedProductIndex, setSelectedProductIndex] = useState<
    number | null
  >(null);
  const [products, setProducts] = useState<Product[]>(mockProducts);

  const handleSaveProduct = (updateProduct: Product) => {
    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.name === updateProduct.name ? updateProduct : p
      )
    );
  };

  const handleDeleteProduct = (index: number) => {
    setProducts((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="h-screen-dynamic-minus-header">
      {!photo && <CameraWidget onCapture={setPhoto} />}
      {photo && selectedProductIndex === null && (
        <div className="w-full h-full pb-8 flex flex-col justify-between">
          <div className="flex flex-col flex-1 overflow-hidden">
            <div className="w-full h-[54%]">
              <img
                src={photo}
                alt="food"
                className="w-full h-full object-cover"
              />
            </div>
            <ProductList
              products={products}
              onSelect={setSelectedProductIndex}
              onDelete={handleDeleteProduct}
            />
          </div>
          <div className="flex justify-center w-full px-3.5">
            <Button className="text-white w-full max-w-[400px] font-[400]">
              Add to diary
            </Button>
          </div>
        </div>
      )}
      {photo && selectedProductIndex !== null && (
        <ProductDetails
          product={products[selectedProductIndex]}
          photo={photo}
          onSave={handleSaveProduct}
          onSaveAll={() => setSelectedProductIndex(null)}
        />
      )}
    </div>
  );
}

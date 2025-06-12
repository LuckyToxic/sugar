import { useEffect, useState } from "react";
import CameraWidget from "../../widgets/CameraWidget/CameraWidget";
import { Button } from "../../shared/ui/Button/Button";
import ProductDetails from "../../widgets/ProductDetails/ProductDetails";
import ProductList from "../../widgets/ProductList/ProductList";
import type { Product } from "../../entities/product/model";
import DiaryEntryModal from "./ui/DiaryEnterModal/DiaryEntryModal";
import { checkFood } from "@/api/checkFood";

// const mockProducts = [
//   {
//     name: "Chicken",
//     details: "Chicken, 78 g",
//     extra: [
//       { label: "Gram", value: 78, icon: "weight", unit: "gr" },
//       { label: "Calories", value: 134, icon: "fire", unit: "calories" },
//       { label: "Protein", value: 16.0, icon: "protein", unit: "gr" },
//       { label: "Fats", value: 14.0, icon: "fats", unit: "gr" },
//       { label: "Carbs", value: 0.0, icon: "carbs", unit: "gr" },
//       { label: "Sugar", value: 0.0, icon: "sugar", unit: "gr" },
//       { label: "Glycemic index", value: 0, icon: "glycemic", unit: "" },
//       { label: "Protein-fat units", value: 2.1, icon: "pfu", unit: "gr" },
//     ],
//   },
//   {
//     name: "Eggs",
//     details: "Eggs, 60 g",
//     extra: [
//       { label: "Gram", value: 60, icon: "weight", unit: "gr" },
//       { label: "Calories", value: 88, icon: "fire", unit: "calories" },
//       { label: "Protein", value: 7.0, icon: "protein", unit: "gr" },
//       { label: "Fats", value: 6.0, icon: "fats", unit: "gr" },
//       { label: "Carbs", value: 1.0, icon: "carbs", unit: "gr" },
//       { label: "Sugar", value: 1.0, icon: "sugar", unit: "gr" },
//       { label: "Glycemic index", value: 0, icon: "glycemic", unit: "" },
//       { label: "Protein-fat units", value: 1.3, icon: "pfu", unit: "gr" },
//     ],
//   },
//   {
//     name: "Avocado",
//     details: "Avocado, 55 g",
//     extra: [
//       { label: "Gram", value: 55, icon: "weight", unit: "gr" },
//       { label: "Calories", value: 110, icon: "fire", unit: "calories" },
//       { label: "Protein", value: 1.0, icon: "protein", unit: "gr" },
//       { label: "Fats", value: 10.0, icon: "fats", unit: "gr" },
//       { label: "Carbs", value: 5.0, icon: "carbs", unit: "gr" },
//       { label: "Sugar", value: 0.0, icon: "sugar", unit: "gr" },
//       { label: "Glycemic index", value: 10, icon: "glycemic", unit: "" },
//       { label: "Protein-fat units", value: 0.2, icon: "pfu", unit: "gr" },
//     ],
//   },
//   {
//     name: "Tomato",
//     details: "Tomato, 45 g",
//     extra: [
//       { label: "Gram", value: 45, icon: "weight", unit: "gr" },
//       { label: "Calories", value: 18, icon: "fire", unit: "calories" },
//       { label: "Protein", value: 1.0, icon: "protein", unit: "gr" },
//       { label: "Fats", value: 0.0, icon: "fats", unit: "gr" },
//       { label: "Carbs", value: 4.0, icon: "carbs", unit: "gr" },
//       { label: "Sugar", value: 3.0, icon: "sugar", unit: "gr" },
//       { label: "Glycemic index", value: 15, icon: "glycemic", unit: "" },
//       { label: "Protein-fat units", value: 0, icon: "pfu", unit: "gr" },
//     ],
//   },
//   {
//     name: "Cucumber",
//     details: "Cucumber, 30 g",
//     extra: [
//       { label: "Gram", value: 30, icon: "weight", unit: "gr" },
//       { label: "Calories", value: 12, icon: "fire", unit: "calories" },
//       { label: "Protein", value: 0.0, icon: "protein", unit: "gr" },
//       { label: "Fats", value: 0.0, icon: "fats", unit: "gr" },
//       { label: "Carbs", value: 2.0, icon: "carbs", unit: "gr" },
//       { label: "Sugar", value: 1.0, icon: "sugar", unit: "gr" },
//       { label: "Glycemic index", value: 15, icon: "glycemic", unit: "" },
//       { label: "Protein-fat units", value: 0, icon: "pfu", unit: "gr" },
//     ],
//   },
//   {
//     name: "Bread",
//     details: "Bread, 50 g",
//     extra: [
//       { label: "Gram", value: 50, icon: "weight", unit: "gr" },
//       { label: "Calories", value: 120, icon: "fire", unit: "calories" },
//       { label: "Protein", value: 4.0, icon: "protein", unit: "gr" },
//       { label: "Fats", value: 1.0, icon: "fats", unit: "gr" },
//       { label: "Carbs", value: 24.0, icon: "carbs", unit: "gr" },
//       { label: "Sugar", value: 2.0, icon: "sugar", unit: "gr" },
//       { label: "Glycemic index", value: 70, icon: "glycemic", unit: "" },
//       { label: "Protein-fat units", value: 0.2, icon: "pfu", unit: "gr" },
//     ],
//   },
// ];
export default function FoodDetectorPage() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [selectedProductIndex, setSelectedProductIndex] = useState<
    number | null
  >(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isDiaryOpen, setDiaryOpen] = useState(false);

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

  const handleCapure = async (base64: string | null) => {
    const formData = new FormData();
    if (base64) {
      const blob = await (await fetch(base64)).blob();

      const file = new File([blob], "photo.webp", { type: "image/webp" });

      formData.append("image", file);

      await checkFood(formData);
      setPhoto(base64);
    }
  };

  useEffect(() => {
    const sessionId = localStorage.getItem("sessionId");
    if (!sessionId) return;

    const eventSource = new EventSource(
      `${import.meta.env.VITE_BASE_URL}/gpt/connect?session_id=${sessionId}`
    );

    eventSource.addEventListener("CheckFoodResult", (event: MessageEvent) => {
      try {
        const parsed = JSON.parse(event.data);

        if (parsed?.data) {
          const product: Product = {
            name: parsed.data.dish_name || "Unknown",
            details: `${parsed.data.dish_name}, ${parsed.data.total_weight} g`,
            extra: [
              {
                label: "Gram",
                value: +parsed.data.total_weight,
                icon: "weight",
                unit: "gr",
              },
              {
                label: "Calories",
                value: +parsed.data.calories,
                icon: "fire",
                unit: "calories",
              },
              {
                label: "Protein",
                value: +parsed.data.proteins,
                icon: "protein",
                unit: "gr",
              },
              {
                label: "Fats",
                value: +parsed.data.fats,
                icon: "fats",
                unit: "gr",
              },
              {
                label: "Carbs",
                value: +parsed.data.carbohydrates,
                icon: "carbs",
                unit: "gr",
              },
              { label: "Sugar", value: 0.0, icon: "sugar", unit: "gr" }, // если нет — можно 0
              {
                label: "Glycemic index",
                value: +parsed.data.glycemic_index,
                icon: "glycemic",
                unit: "",
              },
              {
                label: "Protein-fat units",
                value: +parsed.data.bje_units,
                icon: "pfu",
                unit: "gr",
              },
            ],
          };

          setProducts((prev) => [product, ...prev]);
        } else {
          alert("🥲 Не удалось распознать изображение");
        }
      } catch (error) {
        console.error("Ошибка парсинга CheckFoodResult:", error);
      }
    });

    eventSource.onerror = (error) => {
      console.error("Ошибка SSE:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div className="h-screen-dynamic-minus-header">
      {!photo && <CameraWidget onCapture={handleCapure} />}
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
            <Button
              onClick={() => setDiaryOpen(true)}
              className="text-white w-full max-w-[400px] font-[400]"
            >
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
      <DiaryEntryModal
        isOpen={isDiaryOpen}
        onClose={() => setDiaryOpen(false)}
        onSave={() => {}}
      />
    </div>
  );
}

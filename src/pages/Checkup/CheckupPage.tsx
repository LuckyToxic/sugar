// import FoodItem from "@/widgets/FoodItem/FoodItem";
import { useState } from "react";
import { CheckupHeader } from "./ui/CheckupHeader.tsx/CheckupHeader";
// import NutrientsSummery from "./ui/NutrientsSummery/NutrientsSummery";
// import NutrientsProduct from "./ui/NutrientsProduct/NutrientsProduct";
// import { mockDiary } from "./mockDiary";
// import { getNutrients } from "./getNutrients";
// import { FoodItem as ItemsType } from "./types";
import CheckupItem from "@/widgets/CheckupItem/CheckupItem";
import { mockAppointments } from "./mockCheckup";

export default function CheckupPage() {
  // Сегодняшняя дата по умолчанию
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  });
  // const [selectedProductIndex, setSelectedProductIndex] = useState<
  //   number | null
  // >(null);
  // const [openNutrientsProduct, setOpenNutrientsProduct] = useState(false);
  // Ключ для мок-данных
  // const dateKey = selectedDate.toISOString().split("T")[0];
  // const foods = mockDiary[dateKey] || [];
  // const [products, setProducts] = useState<ItemsType[]>(foods);

  // useEffect(() => {
  //   setProducts(mockDiary[dateKey] || []);
  // }, [dateKey]);

  // const nutrients = getNutrients(products);

  // const handleDeleteProduct = (index: number) => {
  //   setProducts((prev) => prev.filter((_, i) => i !== index));
  // };

  // const handleSaveProduct = (updatedProduct: ItemsType) => {
  //   setProducts((prevProducts) =>
  //     prevProducts.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
  //   );
  //   setOpenNutrientsProduct(false);
  // };

  return (
    <div className="w-full relative h-screen-dynamic-minus-header flex flex-col bg-[#F8F8F8] p-6 max-w-md mx-auto overflow-y-auto hide-scrollbar gap-2.5">
      <CheckupHeader
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
      />

      {mockAppointments.map(({ title, img, isPast, time }) => (
        <CheckupItem title={title} img={img} isPast={isPast} time={time} />
      ))}
      {/* <NutrientsSummery nutrients={nutrients} />
      <button className="w-full flex items-center justify-center bg-[#674EC8] text-white rounded-lg py-3.5 font-bold mb-4">
        <img src="media/plus.svg" alt="plus" />
      </button>

      <div className="flex flex-col gap-2">
        {products.length === 0 ? (
          <div className="text-center text-gray-400">No data for this day</div>
        ) : (
          products.map((product, index) => (
            <FoodItem
              key={index}
              index={index}
              food={product}
              onSelect={setSelectedProductIndex}
              onDelete={handleDeleteProduct}
              onEdit={setOpenNutrientsProduct}
            />
          ))
        )}
      </div>
      {openNutrientsProduct && selectedProductIndex !== null && (
        <NutrientsProduct
          product={products[selectedProductIndex]}
          onSave={handleSaveProduct}
        />
      )} */}
    </div>
  );
}

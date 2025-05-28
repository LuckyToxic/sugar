import { Button } from "@/shared/ui/Button/Button";
import { useEffect, useState } from "react";
import { FoodItem } from "../../types";

interface NutrientsProductProps{
    product:FoodItem
    onSave:(item:FoodItem) => void
}

export default function NutrientsProduct({ product, onSave }:NutrientsProductProps) {
  const [visible, setVisible] = useState(false);
  const [editableIndex, setEditableIndex] = useState<number | null>(null);

  // Локальное состояние — копия массива extra
  const [localExtra, setLocalExtra] = useState<
    { label: string; value: string | number; unit?: string }[]
  >([]);

  useEffect(() => {
    setVisible(true);
  }, []);

  // Инициализация локального состояния из product.extra
  useEffect(() => {
    if (product && product.extra) {
      // Копируем и приводим значения к строке для редактирования
      const initExtra = product.extra.map((item) => ({
        ...item,
        value: item.value !== undefined ? String(item.value) : "",
      }));
      setLocalExtra(initExtra);
    }
  }, [product]);

  const handleFieldClick = (index: number) => {
    setEditableIndex(index);
  };

  const handleChange = (index: number, newValue: string) => {
    setLocalExtra((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], value: newValue };
      return copy;
    });
  };

  const handleCancelEdit = () => {
    setEditableIndex(null);
  };

  const handleLocalSave = () => {
    setEditableIndex(null);
  };

  const handleSave = () => {
    // Преобразуем числовые строки обратно в числа, если возможно
    const updatedExtra = localExtra.map((item) => {
      const numericValue = Number(item.value);
      return {
        ...item,
        value: isNaN(numericValue) ? item.value : numericValue,
      };
    });

    const updatedProduct = {
      ...product,
      extra: updatedExtra,
    };

    onSave(updatedProduct);
    setEditableIndex(null);
    setVisible(false);
  };

  return (
    <div
      className={`absolute bottom-0 left-0 w-full max-w-md bg-white rounded-t-3xl shadow-lg z-10
            transform transition-all duration-500 ease-in-out
            ${visible ? "opacity-100 translate-y-0 h-screen-80-minus-header" : "opacity-0 translate-y-full h-0"}
          `}
      style={{
        boxShadow:
          "0 -10px 15px -3px rgba(0,0,0,0.1), 0 -4px 6px -2px rgba(0,0,0,0.05)",
      }}
    >
      <div className="px-4 pt-2 pb-8 h-full flex flex-col items-center justify-between">
        <div className="w-full flex flex-col items-center gap-4">
          <h2 className="font-semibold text-[#674EC8] text-[24px]">Edit</h2>
          <div className="w-full h-screen-60-minus-header flex flex-col gap-2 overflow-y-auto hide-scrollbar">
            {localExtra.map(({ label, value, unit }, index) => {
              const isEditing = editableIndex === index;
              // Формируем путь к иконке, заменяя пробелы на дефисы и приводя к нижнему регистру
              const iconSrc = `media/diary/${label.toLowerCase().replace(/\s+/g, "-")}.svg`;

              return (
                <div
                  key={label}
                  className="flex justify-between items-center rounded-lg shadow-around bg-white py-2 px-3 cursor-pointer"
                  onClick={() => !isEditing && handleFieldClick(index)}
                >
                  <div className="flex gap-2 items-center">
                    <span className="w-6">
                      <img src={iconSrc} alt={label.toLowerCase()} />
                    </span>
                    <span className="font-[500] tracking-[0.5px]">{label}</span>
                  </div>
                  <span
                    className="text-[#6147C6] font-[500] flex items-center gap-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {isEditing ? (
                      <>
                        <input
                          type="text"
                          value={value}
                          onChange={(e) => handleChange(index, e.target.value)}
                          className="rounded bg-gray-200 text-[#6147C6] px-1 w-10 focus:outline-none"
                          autoFocus
                        />
                        <button
                          onClick={handleLocalSave}
                          className="bg-green-600 px-2 rounded text-white"
                          title="Save"
                        >
                          ✓
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="bg-red-600 px-2 rounded text-white"
                          title="Cancel"
                        >
                          ✕
                        </button>
                      </>
                    ) : (
                      <>
                        {value} {unit}
                      </>
                    )}
                  </span>
                </div>
              );
            })}
          </div>
          <Button onClick={handleSave} className="text-white w-full mt-4">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
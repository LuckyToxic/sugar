import { useState } from "react";
import type { Product } from "../../entities/product/model";
import { Button } from "../../shared/ui/Button/Button";

interface ProductDetailsProps {
  photo: string;
  product: Product;
  onSave: (updateProduct:Product) => void;
  onSaveAll: ()=> void
}

export default function ProductDetails({
  photo,
  product,
  onSave,
  onSaveAll
}: ProductDetailsProps) {
  const [editableIndex, setEditableIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<number>(0);

  const handleFieldClick = (index: number) => {
    setEditableIndex(index);
    setEditValue(0);
  };

  const handleSaveEdit = () => {
    if (editableIndex === null) return;

    const updatedExtra = [...product.extra];
    updatedExtra[editableIndex] = {
      ...updatedExtra[editableIndex],
      value: editValue,
    };

    const updateProduct = { ...product, extra: updatedExtra };
    onSave(updateProduct);
    setEditableIndex(null);
  };

  const handleCancelEdit = () => {
    setEditableIndex(null);
  };

  return (
    <div className="flex flex-col h-full tracking-[1px]">
      <div className="relative h-[23vh]">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <img
          src={photo}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <h2 className="text-white text-2xl font-semibold drop-shadow-md">
            {product.name}
          </h2>
        </div>
      </div>
      <div className="flex justify-around py-2 text-white">
        {product.extra.slice(1, 5).map((item, index) => (
          <div key={index} className="text-center">
            <div className="font-bold text-[24px]">{item.value}</div>
            <div className="text-[17px] font-semibold">{item.label}</div>
          </div>
        ))}
      </div>

      <div className="flex-1 flex flex-col gap-2 overflow-x-auto hide-scrollbar px-4 pt-1 mb-12">
        {product.extra.map((item, index) => (
          <div
            key={index}
            className="flex justify-between px-2 py-1.5 rounded-lg border-2 border-[#FFFFFF80] bg-white/10 text-white"
            style={{ backdropFilter: "blur(20px)" }}
            onClick={() => handleFieldClick(index)}
          >
            <span className="flex items-center gap-2 text-[17px]">
              <img
                src={`media/product-details/${item.label.split(" ")[0].toLowerCase()}.svg`}
                alt={item.label}
              />
              {item.label}
            </span>
            <span
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2"
            >
              {editableIndex === index ? (
                <>
                  <input
                    type="number"
                    value={editValue}
                    onChange={(e) => setEditValue(Number(e.target.value))}
                    className="rounded bg-white/20 text-white px-1 w-10 focus:outline-none "
                    autoFocus
                  />
                  <button
                    onClick={handleSaveEdit}
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
                  {item.value} {item.unit}
                </>
              )}
            </span>
          </div>
        ))}
      </div>

      <div className="px-3.5 relative bottom-8 text-white">
        <Button onClick={onSaveAll}>Save</Button>
      </div>
    </div>
  );
}

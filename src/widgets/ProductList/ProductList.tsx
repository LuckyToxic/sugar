import { MdKeyboardArrowRight } from "react-icons/md";
import type { Product } from "../../entities/product/model";

interface ProductListProps {
  products: Product[];
  onSelect: (index: number) => void;
}

export default function ProductList({ products, onSelect }: ProductListProps) {
  return (
    <div className="p-4 pt-5 h-[37vh] flex flex-col gap-4 tracking-[0.5px]">
      <h2 className="text-white text-[24px] font-[500]">
        Recognised products:
      </h2>
      <div className="flex flex-col gap-4 overflow-x-auto hide-scrollbar">
        {products.map((product, index) => {
          const caloriesItem = product.extra.find(
            (item) => item.label === "Calories"
          );
          const caloriesValue = caloriesItem ? caloriesItem.value : "-";

          return (
            <div
              key={index}
              onClick={() => onSelect(index)}
              className="flex w-full justify-between items-center rounded-lg border-2 border-[#FFFFFF80] text-white bg-white/10 py-2 px-4 cursor-pointer"
              style={{ backdropFilter: "blur(20px)" }}
            >
              <div className="flex flex-col leading-[1.4]">
                <span className="font-[500] text-[17px]">{product.name}</span>
                <span className="text-[13px] font-[200]">
                  {product.details}
                </span>
              </div>
              <div className="flex items-center text-[14px]">
                {caloriesValue} calories
                <MdKeyboardArrowRight size={28} color="#FFFFFF80" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import { MdKeyboardArrowRight } from "react-icons/md";
import type { Product } from "../../entities/product/model";
import { useSwipeToDelete } from "../../shared/hooks/useSwipeToDelete";

interface ProductListProps {
  products: Product[];
  onSelect: (index: number) => void;
  onDelete: (index: number) => void;
}

export default function ProductList({
  products,
  onSelect,
  onDelete,
}: ProductListProps) {
  const {
    swipedIndex,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleMouseDown,
    handleMouseLeave,
    handleMouseMove,
    handleMouseUp,
    closeSwipe,
    getPreventClick,
  } = useSwipeToDelete({ threshold: 50 });

  return (
    <div className="p-4 pt-3 flex-1 min-h-0 flex flex-col gap-4 tracking-[0.5px]">
      <h2 className="text-white text-[20px] font-[500]">
        Recognised products:
      </h2>
      <div className="flex flex-col gap-4 overflow-y-auto hide-scrollbar">
        {products.map((product, index) => {
          const caloriesItem = product.extra.find(
            (item) => item.label === "Calories"
          );
          const caloriesValue = caloriesItem ? caloriesItem.value : "-";

          return (
            <div
              key={index}
              className="relative"
              onTouchStart={handleTouchStart}
              onTouchMove={(e) => handleTouchMove(e, index)}
              onTouchEnd={() => handleTouchEnd(index)}
              onMouseDown={handleMouseDown}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseUp={() => handleMouseUp(index)}
              onMouseLeave={() => handleMouseLeave(index)}
              style={{ userSelect: "none", cursor: "grab", borderRadius: 12 }}
            >
              <div
                className="flex w-full justify-between items-center rounded-lg border-2 border-[#FFFFFF80] text-white bg-white/10 py-2 px-4 cursor-pointer transition-colors duration-300"
                style={{
                  backdropFilter: "blur(20px)",
                  background: "rgba(255,255,255,0.06)",
                  minHeight: 56,
                  position: "relative",
                  overflow: "hidden",
                }}
                onClick={(e) => {
                  if (getPreventClick()) {
                    e.preventDefault();
                    e.stopPropagation();
                    return;
                  }
                  onSelect(index);
                }}
              >
                <div className="flex flex-col leading-[1.4]">
                  <span className="font-[500] text-[17px]">{product.name}</span>
                  <span className="text-[13px] font-[200]">
                    {product.details}
                  </span>
                </div>

                <div
                  className="flex items-center ml-auto"
                  style={{
                    minWidth: 0,
                  }}
                >
                  <div
                    className="flex items-center text-[14px] transition-transform duration-300"
                    style={{
                      transform:
                        swipedIndex === index
                          ? "translateX(-72px)"
                          : "translateX(0)",
                      zIndex: 2,
                    }}
                  >
                    {caloriesValue} calories
                    <MdKeyboardArrowRight size={28} color="#FFFFFF80" />
                  </div>
                </div>

                <button
                  className="absolute right-0 top-0 h-full flex items-center justify-center transition-all duration-300"
                  style={{
                    width: 72,
                    background: "#EF4444",
                    opacity: swipedIndex === index ? 1 : 0,
                    pointerEvents: swipedIndex === index ? "auto" : "none",
                    transition: "opacity 0.3s",
                    zIndex: 3,
                    height: "100%",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault()
                    onDelete(index);
                    closeSwipe();
                  }}
                  aria-label="Delete"
                >
                  <img src="media/delete.svg" alt="delete" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

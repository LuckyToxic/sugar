import { useSwipeToDelete } from "@/shared/hooks/useSwipeToDelete";
import { useState } from "react";

interface Food {
  name: string;
  details: string;
  calories: number;
}

interface FoodItemProps {
  food: Food;
  index: number;
  onDelete: (index: number) => void;
  onSelect: (index: number) => void;
  onEdit: (state: boolean) => void;
}
export default function FoodItem({
  food,
  index,
  onDelete,
  onSelect,
  onEdit,
}: FoodItemProps) {
  const {
    swipedIndex,
    swipeDirection,
    handleTouchEnd,
    handleTouchMove,
    handleTouchStart,
    handleMouseDown,
    handleMouseLeave,
    handleMouseUp,
    handleMouseMove,
    closeSwipe,
    getIsDragging,
  } = useSwipeToDelete({ threshold: 30, supportSwipeRight: true }); // Уменьшил threshold для десктопа

  const [lastSwipe, setLastSwipe] = useState<{
    index: number | null;
    direction: string | null;
  }>({
    index: null,
    direction: null,
  });

  const isSwipedLeft =
    lastSwipe.index === index && lastSwipe.direction === "left";
  const isSwipedRight =
    lastSwipe.index === index && lastSwipe.direction === "right";

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isSwipedLeft) return;
    closeSwipe();
    setLastSwipe({ index: null, direction: null });
    onDelete(index);
  };

  const handleTouchEndLocal = () => {
    if (swipeDirection && swipedIndex === index) {
      setLastSwipe({ index, direction: swipeDirection });
    }
    handleTouchEnd(index);
  };

  const handleMouseUpLocal = () => {
    if (swipeDirection && swipedIndex === index) {
      setLastSwipe({ index, direction: swipeDirection });
    }
    handleMouseUp(index);
  };

  const handleContentClick = (e: React.MouseEvent) => {
    if (getIsDragging()) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    if (lastSwipe.index !== null) {
      closeSwipe();
      setLastSwipe({ index: null, direction: null });
    }
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={(e) => handleTouchMove(e, index)}
      onTouchEnd={handleTouchEndLocal}
      onMouseDown={handleMouseDown}
      onMouseMove={(e) => handleMouseMove(e, index)}
      onMouseUp={handleMouseUpLocal}
      onMouseLeave={() => handleMouseLeave(index)}
      style={{ userSelect: "none", touchAction: "pan-y" }}
      className="w-full select-none"
    >
      <div
        className="flex items-center justify-between bg-white text-[#6B47DC] rounded-xl shadow-sm p-3 mb-2 relative"
        style={{ cursor: getIsDragging() ? "grabbing" : "grab" }}
      >
        {/* Левая часть: иконка редактирования */}
        <button
          className="absolute left-0 top-0 bottom-0 rounded-l-xl flex items-center justify-center transition-all duration-300"
          style={{
            width: 60,
            background: "#6B47DC",
            opacity: isSwipedRight ? 1 : 0,
            pointerEvents: isSwipedRight ? "auto" : "none",
            transition: "opacity 0.3s",
            zIndex: 3,
          }}
          onClick={(e) => {
            e.stopPropagation();
            onEdit(true);
            onSelect(index);
            closeSwipe();
            setLastSwipe({ index: null, direction: null });
          }}
          aria-label="Edit"
        >
          <img src="media/edit.svg" alt="edit" />
        </button>

        {/* Основное содержимое с обработчиком клика */}
        <div
          className="flex items-center transition-all duration-300 w-full"
          style={{
            paddingLeft: isSwipedRight ? "60px" : "0",
            paddingRight: isSwipedLeft ? "60px" : "0",
            pointerEvents:(isSwipedLeft || isSwipedRight) ? 'auto' : 'none',
          }}
          onClick={handleContentClick}
        >
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <span>
              <img src="media/diary/apple.svg" alt="apple" />
            </span>
            <div className="flex-1 min-w-0">
              <div className="font-[600] text-[17px] truncate">{food.name}</div>
              <div className="text-xs truncate">{food.details}</div>
            </div>
          </div>

          <div
            className="flex items-center gap-2 font-bold text-[14px] ml-2 shrink-0"
            onClick={() => onSelect(index)}
          >
            <span>{food.calories} calories</span>
            <img src="media/diary/chevron-right.svg" alt="chevron right" />
          </div>
        </div>

        {/* Кнопка удаления */}
        <button
          className="absolute right-0 top-0 bottom-0 rounded-r-xl flex items-center justify-center transition-all duration-300"
          style={{
            width: 60,
            background: "#FD3D36",
            opacity: isSwipedLeft ? 1 : 0,
            transition: "opacity 0.3s",
            zIndex: 3,
          }}
          onClick={handleDeleteClick}
          aria-label="Delete"
        >
          <img src="media/delete.svg" alt="delete" />
        </button>
      </div>
    </div>
  );
}

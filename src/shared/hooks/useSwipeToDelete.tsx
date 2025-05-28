import { useState, useRef, useCallback } from "react";

interface UseSwipeToDeleteProps {
  itemCount?: number;
  threshold?: number;
  supportSwipeRight?: boolean; // Новый параметр для поддержки свайпа вправо
}

export function useSwipeToDelete({
  threshold = 50,
  supportSwipeRight = false,
}: UseSwipeToDeleteProps = {}) {
  const [swipedIndex, setSwipedIndex] = useState<number | null>(null);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(
    null
  );
  const touchStartX = useRef<number | null>(null);
  const touchCurrentX = useRef<number | null>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setSwipeDirection(null);
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent, index: number) => {
      if (touchStartX.current === null) return;
      touchCurrentX.current = e.touches[0].clientX;
      const diff = touchStartX.current - touchCurrentX.current;

      // Свайп влево (удаление)
      if (diff > threshold) {
        if (swipedIndex !== index || swipeDirection !== "left") {
          setSwipedIndex(index);
          setSwipeDirection("left");
        }
      }
      // Свайп вправо (редактирование), только если включена поддержка
      else if (supportSwipeRight && diff < -threshold) {
        if (swipedIndex !== index || swipeDirection !== "right") {
          setSwipedIndex(index);
          setSwipeDirection("right");
        }
      }
      // Если свайп недостаточен для threshold
      else if (Math.abs(diff) < threshold) {
        if (swipedIndex === index) {
          setSwipedIndex(null);
          setSwipeDirection(null);
        }
      }
    },
    [swipedIndex, swipeDirection, threshold, supportSwipeRight]
  );

  const handleTouchEnd = useCallback(
    (index: number) => {
      if (swipedIndex !== index) {
        setSwipedIndex(null);
        setSwipeDirection(null);
      }
      touchStartX.current = null;
      touchCurrentX.current = null;
    },
    [swipedIndex]
  );

  const closeSwipe = useCallback(() => {
    setSwipedIndex(null);
    setSwipeDirection(null);
  }, []);

  return {
    swipedIndex,
    swipeDirection, // Добавляем направление свайпа в возвращаемые значения
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    closeSwipe,
  };
}
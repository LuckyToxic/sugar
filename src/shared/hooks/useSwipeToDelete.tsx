import { useState, useRef, useCallback } from "react";

interface UseSwipeToDeleteProps {
  itemCount?: number;
  threshold?: number; 
}

export function useSwipeToDelete({ threshold = 50 }: UseSwipeToDeleteProps) {
  const [swipedIndex, setSwipedIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchCurrentX = useRef<number | null>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent, index: number) => {
      if (touchStartX.current === null) return;
      touchCurrentX.current = e.touches[0].clientX;
      const diff = touchStartX.current - touchCurrentX.current;

      if (diff > threshold) {
        if (swipedIndex !== index) setSwipedIndex(index);
      } else if (diff < -threshold) {
        if (swipedIndex === index) setSwipedIndex(null);
      }
    },
    [swipedIndex, threshold]
  );

  const handleTouchEnd = useCallback(
    (index: number) => {
      if (swipedIndex !== index) setSwipedIndex(null);
      touchStartX.current = null;
      touchCurrentX.current = null;
    },
    [swipedIndex]
  );

  const closeSwipe = useCallback(() => {
    setSwipedIndex(null);
  }, []);

  return {
    swipedIndex,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    closeSwipe,
  };
}

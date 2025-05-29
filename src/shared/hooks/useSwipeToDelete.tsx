import { useState, useRef, useCallback } from "react";

interface UseSwipeToDeleteProps {
  itemCount?: number;
  threshold?: number;
  supportSwipeRight?: boolean;
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
  const isSwiping = useRef(false);
  const isDragging = useRef(false);
  const preventClick = useRef(false); // Новый флаг

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchCurrentX.current = e.touches[0].clientX;
    setSwipeDirection(null);
    isSwiping.current = true;
    isDragging.current = false;
    preventClick.current = false;
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent, index: number) => {
      if (!isSwiping.current || touchStartX.current === null) return;
      touchCurrentX.current = e.touches[0].clientX;
      const diff = touchStartX.current - touchCurrentX.current;

      if (Math.abs(diff) > threshold) {
        isDragging.current = true;
        preventClick.current = true; // Блокируем клик
      }

      if (diff > threshold) {
        if (swipedIndex !== index || swipeDirection !== "left") {
          setSwipedIndex(index);
          setSwipeDirection("left");
        }
      } else if (supportSwipeRight && diff < -threshold) {
        if (swipedIndex !== index || swipeDirection !== "right") {
          setSwipedIndex(index);
          setSwipeDirection("right");
        }
      } else if (Math.abs(diff) < threshold) {
        if (swipedIndex === index) {
          setSwipedIndex(null);
          setSwipeDirection(null);
          preventClick.current = false;
        }
      }
    },
    [swipedIndex, swipeDirection, threshold, supportSwipeRight]
  );

  const handleTouchEnd = useCallback(
    (index: number) => {
      isSwiping.current = false;
      touchStartX.current = null;
      touchCurrentX.current = null;
      isDragging.current = false;

      // Сбрасываем preventClick с небольшой задержкой, чтобы клик не сработал
      setTimeout(() => {
        preventClick.current = false;
      }, 50);

      if (swipedIndex !== index) {
        setSwipedIndex(null);
        setSwipeDirection(null);
      }
    },
    [swipedIndex]
  );

  const handleMouseDown = useCallback((e: React.MouseEvent) => { 
    e.preventDefault()   
    touchStartX.current = e.clientX;
    touchCurrentX.current = e.clientX;
    setSwipeDirection(null);
    isSwiping.current = true;
    isDragging.current = false;
    preventClick.current = false;
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent, index: number) => {
      if (!isSwiping.current || touchStartX.current === null) return;
      touchCurrentX.current = e.clientX;
      const diff = touchStartX.current - touchCurrentX.current;
      if (Math.abs(diff) > threshold) {
        isDragging.current = true;
        preventClick.current = true; // Блокируем клик
      }

      if (diff > threshold) {
        if (swipedIndex !== index || swipeDirection !== "left") {
          setSwipedIndex(index);
          setSwipeDirection("left");
        }
      } else if (supportSwipeRight && diff < -threshold) {
        if (swipedIndex !== index || swipeDirection !== "right") {
          setSwipedIndex(index);
          setSwipeDirection("right");
        }
      } else if (Math.abs(diff) < threshold) {
        if (swipedIndex === index) {
          setSwipedIndex(null);
          setSwipeDirection(null);
          preventClick.current = false;
        }
      }
    },
    [swipedIndex, swipeDirection, threshold, supportSwipeRight]
  );

  const handleMouseUp = useCallback(
    (index: number) => {
      isSwiping.current = false;
      touchStartX.current = null;
      touchCurrentX.current = null;
      isDragging.current = false;

      setTimeout(() => {
        preventClick.current = false;
      }, 50);

      if (swipedIndex !== index) {
        setSwipedIndex(null);
        setSwipeDirection(null);
      }
    },
    [swipedIndex]
  );

  const handleMouseLeave = useCallback(
    (index: number) => {
      if (isSwiping.current) {
        isSwiping.current = false;
        touchStartX.current = null;
        touchCurrentX.current = null;
        isDragging.current = false;

        setTimeout(() => {
          preventClick.current = false;
        }, 50);

        if (swipedIndex !== index) {
          setSwipedIndex(null);
          setSwipeDirection(null);
        }
      }
    },
    [swipedIndex]
  );

  const closeSwipe = useCallback(() => {
    setSwipedIndex(null);
    setSwipeDirection(null);
  }, []);

  const getIsDragging = useCallback(() => isDragging.current, []);
  const getPreventClick = useCallback(() => preventClick.current, []);

  return {
    swipedIndex,
    swipeDirection,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
    closeSwipe,
    getIsDragging,
    getPreventClick,
  };
}

interface UseSwipeToDeleteProps {
    itemCount?: number;
    threshold?: number;
}
export declare function useSwipeToDelete({ threshold }: UseSwipeToDeleteProps): {
    swipedIndex: number | null;
    handleTouchStart: (e: React.TouchEvent) => void;
    handleTouchMove: (e: React.TouchEvent, index: number) => void;
    handleTouchEnd: (index: number) => void;
    closeSwipe: () => void;
};
export {};
//# sourceMappingURL=useSwipeToDelete.d.ts.map
import type { Product } from "../../entities/product/model";
interface ProductListProps {
    products: Product[];
    onSelect: (index: number) => void;
    onDelete: (index: number) => void;
}
export default function ProductList({ products, onSelect, onDelete, }: ProductListProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=ProductList.d.ts.map
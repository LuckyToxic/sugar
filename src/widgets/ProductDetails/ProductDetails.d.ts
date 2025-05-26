import type { Product } from "../../entities/product/model";
interface ProductDetailsProps {
    photo: string;
    product: Product;
    onSave: (updateProduct: Product) => void;
    onSaveAll: () => void;
}
export default function ProductDetails({ photo, product, onSave, onSaveAll }: ProductDetailsProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=ProductDetails.d.ts.map
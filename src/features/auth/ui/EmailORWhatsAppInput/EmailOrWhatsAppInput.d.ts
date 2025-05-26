import "react-phone-input-2/lib/style.css";
import "./EmailOrWhatsAppInput.css";
interface EmailOrWhatsAppInputProps {
    value: string;
    onChange: (value: string) => void;
    isWhatsApp: boolean;
    onSwitchChange: (checked: boolean) => void;
}
export declare function EmailOrWhatsAppInput({ value, onChange, isWhatsApp, onSwitchChange, }: EmailOrWhatsAppInputProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=EmailOrWhatsAppInput.d.ts.map
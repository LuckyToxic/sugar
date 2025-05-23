import { FaWhatsapp } from "react-icons/fa";
import { CustomSwitch } from "../../../../shared/ui/CustomSwitch/CustomSwitch";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./EmailOrWhatsAppInput.css";

interface EmailOrWhatsAppInputProps {
  value: string;
  onChange: (value: string) => void;
  isWhatsApp: boolean;
  onSwitchChange: (checked: boolean) => void;
}

export function EmailOrWhatsAppInput({
  value,
  onChange,
  isWhatsApp,
  onSwitchChange,
}: EmailOrWhatsAppInputProps) {
  return (
    <div className="w-full relative flex flex-col">
      <div className="flex gap-3 text-[17px] mb-2 justify-center">
        <span>Or Email</span>
        <CustomSwitch
          checked={isWhatsApp}
          onChange={(e) => onSwitchChange(e.target.checked)}
        />
        <span>WhatsApp</span>
      </div>
      <div className="relative top-2">
        {isWhatsApp ? (
          <div className="relative w-full">
            <PhoneInput
              country={"ru"}
              value={value}
              onChange={onChange}
              inputStyle={{
                width: "100%",
                borderRadius: "0.5rem",
                padding: "1.5rem 3.5rem 1.5rem 3rem",
                border: "1px solid #d1d5db",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                color: "white",
                fontSize: "17px",
                fontWeight: 500,
                backdropFilter: "blur(10px)",
              }}
              buttonStyle={{
                border: "none",
                background: "transparent",
                marginLeft: "0.5rem",
              }}
              dropdownStyle={{
                backgroundColor: "#1f2937",
                height: "15vh",
              }}
              inputProps={{
                autoComplete: "off",
              }}
              placeholder="WhatsApp"
              enableSearch={false}
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white pointer-events-none">
              <FaWhatsapp size={26} />
            </span>
          </div>
        ) : (
          <>
            <input
              type="email"
              placeholder="Email"
              value={value}
              required={true}
              autoComplete="off"
              onChange={(e) => onChange(e.target.value)}
              className="rounded-lg py-3 px-5 w-full border border-gray-300 bg-white/10 text-white placeholder-white placeholder:text-[17px] font-medium focus:outline-none"
              style={{ backdropFilter: "blur(10px)" }}
            />
            <span className="absolute right-5 top-1/2 -translate-y-1/2 text-white pointer-events-none">
              <img src="media/message.svg" alt="message" />
            </span>
          </>
        )}
      </div>
    </div>
  );
}

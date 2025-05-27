interface ProfileMenuItemProps {
  icon: string;
  text: string;
  onClick: () => void;
  rightIcon?: React.ReactNode;
  children?: React.ReactNode;
  isOpen?: boolean;
}

export default function ProfileMenuItem({
  icon,
  text,
  onClick,
  rightIcon,
  children,
  isOpen = false,
}: ProfileMenuItemProps) {
  return (
    <div
      className={`bg-white ${isOpen ? "rounded-xl" : "rounded-lg"} shadow transition-all duration-800`}
    >
      <div
        onClick={onClick}
        className={`flex items-center justify-between p-4 cursor-pointer select-none ${isOpen ? "rounded-t-xl" : "rounded-lg"}`}
      >
        <div className="flex items-center gap-6 font-[500] text-[18px]">
          <img src={icon} alt={text} />
          {text}
        </div>
        {rightIcon && <span>{rightIcon}</span>}
      </div>
      <div
        className={`transition-all duration-500 ease-in-out
          ${isOpen ? "opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        {children}
      </div>
    </div>
  );
}
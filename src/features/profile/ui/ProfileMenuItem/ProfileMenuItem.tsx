interface ProfileMenuItemProps {
  icon: string;
  text: string;
  onClick: () => void;
}

export default function ProfileMenuItem({
  icon,
  text,
  onClick,
}: ProfileMenuItemProps) {
  return (
    <div
      onClick={onClick}
      className="flex items-center justify-between bg-white rounded-lg p-3"
    >
      <div className="flex items-center gap-6 font-[600] text-[18px]">
        <img src={icon} alt={text} />
        {text}
      </div>
      <span>
        <img src="media/leftArrow.svg" alt="left arrow" />
      </span>
    </div>
  );
}

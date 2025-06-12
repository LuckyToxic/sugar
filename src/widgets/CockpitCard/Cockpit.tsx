type CockpitCardProps = {
  title: string;
  date: string;
  value: string;
  bgImage: string;
  bgPosition?: "center" | "right bottom";
};

export function CockpitCard({
  title,
  date,
  value,
  bgImage,
  bgPosition = "center",
}: CockpitCardProps) {
  return (
    <div
      className="bg-[#8A83F3] rounded-[16px] h-[151px] grow py-2.5 px-3 flex flex-col justify-between w-full text-white"
      style={{
        backgroundImage: `url('${bgImage}')`,
        backgroundSize: "contain",
        backgroundPosition: bgPosition,
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="text-[17px] font-semibold leading-[22px]">{title}</div>
      <div className="flex flex-col">
        <div className="text-[13px] font-semibold">{date}</div>
        <div className="text-[17px] font-extrabold">{value}</div>
      </div>
    </div>
  );
}

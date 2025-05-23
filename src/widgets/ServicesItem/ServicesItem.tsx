import { useNavigate } from "react-router";

interface Services {
  id: number;
  title: string;
  image: string;
  path: string;
}

interface ServicesItemProps {
  item: Services;
}

export default function ServicesItem({ item }: ServicesItemProps) {
  const navigate = useNavigate();
  const { title, image, path } = item;
  return (
    <div
      onClick={() => path && navigate(path)}
      className="
          bg-white
          rounded-3xl
          shadow-xl
          relative
          flex flex-col justify-between items-center
          px-2
          pb-4
          w-[140px]
          h-[180px]
          cursor-pointer
          transition hover:shadow-lg
        "
    >
      <div className="flex items-center justify-center w-full flex-grow">
        <img src={image} alt={title} className="max-h-full object-contain" />
      </div>

      <div className="w-full flex flex-col items-center gap-1">
        <span className="font-bold text-black text-center text-base">
          {title}
        </span>
        <div className="w-[60%] h-[2px] bg-[#46E4B8] rounded-full" />
      </div>
    </div>
  );
}

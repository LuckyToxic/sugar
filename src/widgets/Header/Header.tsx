import { useLocation, useNavigate } from "react-router";

interface PageInfo {
  title: string;
  showArrowBack: boolean;
}

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const pagesWithHeader: { [key: string]: PageInfo } = {
    "/services": { title: "Services", showArrowBack: false },
    "/food-detector": { title: "Recognition camera", showArrowBack: true },
    "/account": { title: "Account", showArrowBack: true },
    "/diary": { title: "Diary", showArrowBack: true },
    "/chat": { title: "Chat", showArrowBack: true },
    "/woman-diary": { title: "Woman diary", showArrowBack: true },
  };

  const currentPage = pagesWithHeader[location.pathname];

  if (!currentPage) return null;

  return (
    <div className="py-2 px-4 h-[50px] flex items-center gap-4">
      {currentPage.showArrowBack && (
        <button onClick={() => navigate(-1)}>
          <img src="media/backArrow.svg" alt="arrow back" className="w-8" />
        </button>
      )}
      <h1 className="text-white text-[20px] font-[400] tracing-[0.5px]">
        {currentPage.title}
      </h1>
    </div>
  );
}

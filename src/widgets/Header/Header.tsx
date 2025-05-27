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
    '/account':{title:'Account',showArrowBack:true}
  };

  const currentPage = pagesWithHeader[location.pathname];

  if (!currentPage) return null;

  return (
    <div className="py-5 px-4 h-[75px] flex gap-4">
      {currentPage.showArrowBack && (
        <button onClick={() => navigate(-1)}>
          <img src="media/backArrow.svg" alt="arrow back" />
        </button>
      )}
      <h1 className="text-white text-[24px] font-[400] tracing-[0.5px]">
        {currentPage.title}
      </h1>
    </div>
  );
}

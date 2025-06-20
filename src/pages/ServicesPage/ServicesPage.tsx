import { useEffect } from "react";
import ServicesItem from "../../widgets/ServicesItem/ServicesItem";
import { getSessionId } from "@/api/getSession";

export default function ServicesPage() {
  const services = [
    {
      id: 1,
      title: "Diary",
      image: "media/services/diary.svg",
      path: "/diary",
    },
    {
      id: 2,
      title: "Ask doctor",
      image: "media/services/ask-doctor.svg",
      path: "/chat",
    },
    {
      id: 3,
      title: "Medical card",
      image: "media/services/medical-card.svg",
      path: "/medical-card",
    },
    {
      id: 4,
      title: "Woman diary",
      image: "media/services/woman-diary.svg",
      path: "/woman-diary",
    },
    {
      id: 5,
      title: "Profile",
      image: "media/services/profile.svg",
      path: "/account",
    },
    {
      id: 6,
      title: "Analyses detect",
      image: "media/services/analyses-detect.svg",
      path: "/analyses-detect",
    },
    {
      id: 7,
      title: "Food detector",
      image: "media/services/food-detector.svg",
      path: "/food-detector",
    },
    {
      id: 8,
      title: "Checkup",
      image: "media/services/checkup.svg",
      path: "/checkup",
    },
  ];

  useEffect(() => {
    const fetchSessionId = async () => {
      try {
        const session = await getSessionId();
        localStorage.setItem("sessionId", session);
      } catch (error) {
        console.error("Ошибка при получении session-id:", error);
      }
    };

    fetchSessionId();
  }, []);

  return (
    <div
      className="h-screen-dynamic-minus-header bg-[#F8F8F8] bg-center bg-cover px-4"
      style={{
        backgroundImage: "url(media/services-bg.svg)",
      }}
    >
      <div className="h-full min-h-0 pb-5 hide-scrollbar flex flex-wrap justify-center gap-x-9 gap-y-3 overflow-y-auto pt-4">
        {services.map((service) => (
          <ServicesItem key={service.id} item={service} />
        ))}
      </div>
    </div>
  );
}

import { useNavigate } from "react-router";
import useDynamicVh from "../shared/hooks/useDynamicVh";
import Router from "./router/Router";
// import { useAppDispatch } from "@/shared/hooks/reduxHooks";
// import { getUserThunk } from "@/entities/user/api/userApi";
import { useEffect } from "react";
import { UserTg } from "@/entities/user/model";
import { auth } from "@/api/auth";

function App() {
  useDynamicVh();

  const navigate = useNavigate();
  useEffect(() => {
    const initUser = async () => {
      if (window.Telegram?.WebApp) {
        await window.Telegram.WebApp.ready();
        window.Telegram.WebApp.expand();

        const tgUserRaw = window.Telegram.WebApp.initDataUnsafe?.user;

        if (tgUserRaw) {
          const tgUser: UserTg = tgUserRaw;
          await auth(tgUser);
          if (tgUser?.photo_url) {
            localStorage.setItem("photo", tgUser?.photo_url);
          }
          navigate("/services");
        }
      }
    };

    initUser();
  }, []);

  return <Router />;
}

export default App;

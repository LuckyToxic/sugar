import { useNavigate } from "react-router";
import useDynamicVh from "../shared/hooks/useDynamicVh";
import Router from "./router/Router";
import { useAppDispatch } from "@/shared/hooks/reduxHooks";
import { getUserThunk } from "@/entities/user/api/userApi";
import { useEffect } from "react";
import { message } from "antd";
import { User } from "@/entities/user/model";

function App() {
  useDynamicVh();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const initUser = async () => {
      if (window.Telegram?.webApp) {
        await window.Telegram.WebApp.ready();
        const tgUserRaw = window.Telegram.WebApp.initDataUnsafe?.user;
        if (tgUserRaw) {
          const tgUser: User = tgUserRaw;
          dispatch(getUserThunk(tgUser));
          navigate("/services");
          message.success("Welcome");
        }
      }
    };
    initUser();
  }, [dispatch]);

  return <Router />;
}

export default App;

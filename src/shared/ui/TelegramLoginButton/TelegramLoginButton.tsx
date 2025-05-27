import { useEffect } from "react";
import { useNavigate } from "react-router";
import { message } from "antd";
import { colors } from "../../../app/styles/variables";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { getUserThunk } from "../../../entities/user/api/userApi";

const TelegramLoginButton = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    const params = getQueryParams();
    if (params.id) {
      handleTelegramAuth(params);
    } else if (params.tgAuthResult) {
      const data = JSON.parse(atob(params.tgAuthResult));
      handleTelegramAuth(data);
    }
  }, []);

  const getQueryParams = () => {
    return Object.fromEntries(new URLSearchParams(window.location.search));
  };

  const handleTelegramAuth = async (data: any) => {
    if (data) {
      dispatch(getUserThunk(data));
      message.success("Welcome");
      navigate("/services");
      return;
    }
    message.error("Auth error");
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://telegram.org/js/telegram-widget.js?22`;
    script.async = true;
    script.setAttribute("data-telegram-login", "MyTestSugarBot");
    script.setAttribute("data-size", "large");
    script.setAttribute("data-auth-url", `https://luckytoxic.github.io/sugar/`);
    script.setAttribute("data-request-access", "write");
    script.setAttribute("data-userpic", "false");

    const container = document.getElementById("telegram-login-container");
    if (container) {
      container.innerHTML = "";
      container.appendChild(script);
    }
  }, []);

  const handleTelegramLogin = () => {
    if ((window as any).Telegram?.Login) {
      (window as any).Telegram.Login.auth(
        { bot_id: "7131671083", request_access: true },
        (data: any) => {
          if (!data) {
            message.error("Telegram login failed");
            return;
          }
          handleTelegramAuth(data);
        }
      );
    } else {
      message.error("Telegram API не загружен");
    }
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div id="telegram-login-container"></div>
      <button
        className="w-full flex items-center justify-center gap-2 rounded-lg p-3 text-[17px] font-[600] pr-8"
        style={{ backgroundColor: colors.main_blue }}
        onClick={handleTelegramLogin}
      >
        <img src="media/tg.svg" alt="tg" className="h-[18px] pr-1" />
        Telegram
      </button>
    </div>
  );
};

export default TelegramLoginButton;

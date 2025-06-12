import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const getSessionId = async (): Promise<string> => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${baseUrl}/gpt/session`, {
      headers: {
        Authorization: token || "",
      },
    });

    const sessionId = response.headers["session-id"];

    if (sessionId) {
      return sessionId;
    } else {
      throw new Error("session-id не найден в заголовках ответа");
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const responseMessage = error.response?.data?.message;
      throw new Error(responseMessage || "Ошибка получения session-id");
    } else if (error instanceof Error) {
      throw new Error(error.message || "Неизвестная ошибка");
    } else {
      throw new Error("Неизвестная ошибка");
    }
  }
};

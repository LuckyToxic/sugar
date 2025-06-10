import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const auth = async (
  login: string,
  password: string
): Promise<string | void> => {
  try {
    const response = await axios.post(`${baseUrl}/auth`, {
      login,
      password,
    });

    const token = response.headers["authorization"];

    if (token) {
      localStorage.setItem("token", token);
    } else {
      throw new Error("Токен авторизации не найден в ответе сервера");
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const responseMessage = error.response?.data?.message;
      throw new Error(responseMessage || "Ошибка авторизации");
    } else if (error instanceof Error) {
      throw new Error(error.message || "Неизвестная ошибка");
    } else {
      throw new Error("Неизвестная ошибка");
    }
  }
};

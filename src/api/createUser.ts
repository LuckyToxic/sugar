import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const createUser = async (
  login: string,
  password: string,
  hash: string
): Promise<string | void> => {
  try {
    await axios.post(`${baseUrl}/create_user?hash=${hash}`, {
      login,
      password,
    });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const responseMessage = error.response?.data?.message;
      throw new Error(responseMessage || "Ошибка при создании пользователя");
    } else if (error instanceof Error) {
      throw new Error(error.message || "Неизвестная ошибка");
    } else {
      throw new Error("Неизвестная ошибка");
    }
  }
};

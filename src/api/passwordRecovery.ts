import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const passwordRecovery = async (
  login: string,
  password: string,
  hash: string
): Promise<string | void> => {
  try {
    await axios.post(`${baseUrl}/password_recovery?hash=${hash}`, {
      login,
      password,
    });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const responseMessage = error.response?.data?.message;
      throw new Error(responseMessage || "Ошибка при смене пароля");
    } else if (error instanceof Error) {
      throw new Error(error.message || "Неизвестная ошибка");
    } else {
      throw new Error("Неизвестная ошибка");
    }
  }
};

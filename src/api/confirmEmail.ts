import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const confirmEmail = async (
  login: string,
  code?: string,
  recovery?: boolean
): Promise<string | void> => {
  try {
    const params = new URLSearchParams();

    if (code) params.append("code", code);
    if (recovery) params.append("recovery", "true");

    const url = `${baseUrl}/confirm_login${params.toString() ? `?${params}` : ""}`;

    const response = await axios.post(url, { login });

    return response.data?.data?.hash;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const responseMessage = error.response?.data?.message;
      throw new Error(responseMessage || "Ошибка при подтверждении почты");
    } else if (error instanceof Error) {
      throw new Error(error.message || "Неизвестная ошибка");
    } else {
      throw new Error("Неизвестная ошибка");
    }
  }
};

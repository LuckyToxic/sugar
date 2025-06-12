import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const askDoctor = async (text: string) => {
  const token = localStorage.getItem("token");
  const sessionId = localStorage.getItem("sessionId");

  try {
    const response = await axios.post(
      `${baseUrl}/gpt/doctor_answer?session_id=${sessionId}`,
      { user_text: text },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const responseMessage = error.response?.data?.message;
      throw new Error(
        responseMessage || "Ошибка при получении ответа от врача"
      );
    } else if (error instanceof Error) {
      throw new Error(error.message || "Неизвестная ошибка");
    } else {
      throw new Error("Неизвестная ошибка");
    }
  }
};

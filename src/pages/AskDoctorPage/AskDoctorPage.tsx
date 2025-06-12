import { askDoctor } from "@/api/askDoctor";
import { useState, useRef, useEffect } from "react";

type Message = {
  text: string;
  time: string;
  from: "user" | "doctor";
};

const LOCAL_STORAGE_KEY = "askDoctorMessages";

export default function AskDoctorPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Загрузка сообщений из localStorage при первом рендере
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setMessages(parsed);
        }
      } catch (error) {
        console.error("Ошибка парсинга сообщений из localStorage", error);
      }
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    const now = new Date();
    const time = now.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const userMessage: Message = {
      text: input,
      time,
      from: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    const userText = input;
    setInput("");

    try {
      await askDoctor(userText);
    } catch (err) {
      console.error("Ошибка при отправке вопроса:", err);
    }
  };

  // Подключение к SSE
  useEffect(() => {
    const sessionId = localStorage.getItem("sessionId");
    if (!sessionId) return;

    const eventSource = new EventSource(
      `${import.meta.env.VITE_BASE_URL}/gpt/connect?session_id=${sessionId}`
    );

    eventSource.addEventListener(
      "DoctorAnswerResult",
      (event: MessageEvent) => {
        try {
          const parsed = JSON.parse(event.data);
          if (!parsed?.detail) return;

          const now = new Date();
          const time = now.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
          });

          const doctorMessage: Message = {
            text: parsed.detail,
            time,
            from: "doctor",
          };

          setMessages((prev) => [...prev, doctorMessage]);
        } catch (error) {
          console.error("Ошибка парсинга DoctorAnswerResult:", error);
        }
      }
    );

    eventSource.onerror = (error) => {
      console.error("Ошибка SSE:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div className="w-full h-screen-dynamic-minus-header bg-[#F7F7F7] flex flex-col justify-between pt-1">
      <div className="relative flex-1 flex flex-col gap-3 overflow-y-auto px-4 py-6 hide-scrollbar">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex mb-2 ${
              msg.from === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`rounded-2xl leading-[1.3] px-4 py-3 max-w-[70%] w-fit flex flex-col bg-opacity-90 relative ${
                msg.from === "user"
                  ? "bg-[#6147C6] text-white"
                  : "bg-[#E9E9EB] text-[#222]"
              }`}
              style={{ wordBreak: "break-word" }}
            >
              {msg.from === "doctor" && (
                <img
                  src="media/tail-gray.svg"
                  alt="tail"
                  className="absolute bottom-0 -left-1"
                />
              )}

              <div
                className="font-[400] tracking-[0.4px]"
                dangerouslySetInnerHTML={{ __html: msg.text }}
              ></div>

              <div
                className={`text-[11px] h-2 ${
                  msg.from === "user" ? "text-[#F7F7F799]" : "text-[#3C3C4399]"
                }`}
                style={{ alignSelf: "flex-end" }}
              >
                {msg.time}
              </div>

              {msg.from === "user" && (
                <img
                  src="media/tail-violet.svg"
                  alt="tail"
                  className="absolute bottom-0 -right-1"
                />
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form
        className="flex items-center p-4 rounded-t-2xl bg-white shadow-top"
        onSubmit={handleSend}
      >
        <div className="relative w-full">
          <input
            type="text"
            className="w-full rounded-lg bg-[#F5F5F5] p-3 pr-12 outline-none placeholder-black/60"
            placeholder="Write a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="absolute top-1/2 right-3 -translate-y-1/2 p-2 flex items-center justify-center bg-transparent border-none outline-none"
            style={{ boxShadow: "none" }}
          >
            <img src="media/send.svg" alt="send" className="w-7 h-7" />
          </button>
        </div>
      </form>
    </div>
  );
}

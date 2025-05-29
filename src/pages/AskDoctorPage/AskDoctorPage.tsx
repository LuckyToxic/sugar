import { useState, useRef, useEffect } from "react";

type Message = {
  text: string;
  time: string;
  from: "user" | "doctor";
};

const initialMessages: Message[] = [
  {
    text: "Hello doctor can you tell me how to boost my immune system?",
    time: "9:41",
    from: "user",
  },
  {
    text: "Hello, to strengthen your immunity you should; Give up bad habits, sleep 7-8 hours a day, exercise and eat a balanced diet!",
    time: "9:41",
    from: "doctor",
  },
  {
    text: "Thank you, Doctor.",
    time: "9:43",
    from: "user",
  },
  {
    text: "You're welcome, take care!",
    time: "9:43",
    from: "doctor",
  },
];

export default function AskDoctorPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    const now = new Date();
    const time = now.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
    setMessages([
      ...messages,
      {
        text: input,
        time,
        from: "user",
      },
    ]);
    setInput("");
  };

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
              {/* Хвостик */}
              {msg.from === "doctor" && (
                <img
                  src="media/tail-gray.svg"
                  alt="tail"
                  className="absolute bottom-0 -left-1"
                />
              )}

              {/* Текст сообщения */}
              <div className="font-[400] tracking-[0.4px]">{msg.text}</div>

              {/* Время под текстом, выровнено по правому краю */}
              <div
                className={`text-[11px] h-2 ${
                  msg.from === "user" ? "text-[#F7F7F799]" : "text-[#3C3C4399]"
                }`}
                style={{ alignSelf: "flex-end" }}
              >
                {msg.time}
              </div>

              {/* Хвостик */}
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

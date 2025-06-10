type Appointment = {
  id: number;
  title: string;
  date: string; // ISO 8601 формат
  time: string; // "HH:mm a.m./p.m."
  isPast: boolean;
  img: string; // если есть изображение врача
};

export const mockAppointments: Appointment[] = [
  {
    id: 1,
    title: "Dental appointment",
    date: "2025-04-17",
    time: "12:00 a.m.",
    isPast: false,
    img: "media/checkup/doctor.png",
  },
  {
    id: 2,
    title: "Blood test",
    date: "2025-04-19",
    time: "9:00 a.m.",
    isPast: false,
    img: "media/checkup/health.svg",
  },
  {
    id: 3,
    title: "Gastroenterology appointment",
    date: "2025-04-14",
    time: "8:00 a.m.",
    isPast: true,
    img: "media/checkup/doctor.png",
  },
  {
    id: 4,
    title: "Gastroenterology appointment",
    date: "2025-04-14",
    time: "8:00 a.m.",
    isPast: true,
    img: "media/checkup/doctor.png",
  },
  {
    id: 5,
    title: "Vitamin and mineral tests",
    date: "2025-04-10",
    time: "10:00 a.m.",
    isPast: true,
    img: "media/checkup/health.svg",
  },
  {
    id: 6,
    title: "Blood test",
    date: "2025-04-10",
    time: "9:00 a.m.",
    isPast: true,
    img: "media/checkup/health.svg",
  },
];

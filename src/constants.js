import { IconCalendar, IconUser } from "@tabler/icons-react";
export const menuItems = [
  {
    label: "Создание слотов",
    icon: <IconCalendar size="1rem" />,
    path: "/slots",
  },
  {
    label: "Запись на прием",
    icon: <IconUser size="1rem" />,
    path: "/appointments",
  },
  {
    label: "Пациенты",
    icon: <IconUser size="1rem" />,
    path: "/patients",
  },
];

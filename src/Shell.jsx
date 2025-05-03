import { useState } from "react";
import { AppShell, Burger, Group, Text, Title, NavLink } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCalendar, IconPencil, IconUser } from "@tabler/icons-react";
//import { menuItems } from "./constants.js";
import "@mantine/core/styles.css";
import Slots from "./MenuPages/Slots.jsx";
import Patients from "./MenuPages/Patients.jsx";
import MakeAppointment from "./MenuPages/MakeAppointment.jsx";

function Shell() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const [activePage, setActivePage] = useState("slots");

  const renderPage = () => {
    switch (activePage) {
      case "slots":
        return <Slots />;
      case "appointments":
        return <MakeAppointment />;
      case "patients":
        return <Patients />;
      default:
        return <Slots />;
    }
  };

  const menuItems = [
    {
      label: "Создание слотов для записи",
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
      icon: <IconPencil size="1rem" />,
      path: "/patients",
    },
  ];

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger
            opened={mobileOpened}
            onClick={toggleMobile}
            hiddenFrom="sm"
            size="sm"
          />
          <Burger
            opened={desktopOpened}
            onClick={toggleDesktop}
            visibleFrom="sm"
            size="sm"
          />
          <Title order={3}>Личный Кабинет</Title>
          <Title
            order={3}
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            Клиника "Не бойся, мы почти доктора"
          </Title>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Text fw={500} size="lg" mb="sm">
          Меню
        </Text>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            label={item.label}
            leftSection={item.icon}
            active={activePage === item.path.replace("/", "")}
            onClick={() => setActivePage(item.path.replace("/", ""))}
            variant="filled"
          />
        ))}
      </AppShell.Navbar>
      <AppShell.Main>{renderPage()}</AppShell.Main>
    </AppShell>
  );
}

export default Shell;

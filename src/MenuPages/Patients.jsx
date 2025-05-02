import { Tabs } from "@mantine/core";
import { Group, Text, Title, NumberInput, Button } from "@mantine/core";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { IconCalendar, IconPencil, IconUser } from "@tabler/icons-react";
//import { menuItems } from "./constants.js";
import axios from "axios";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

function Patients() {
  return (
    <Tabs defaultValue="gallery">
      <Tabs.List>
        <Tabs.Tab value="gallery">Gallery</Tabs.Tab>
        <Tabs.Tab value="messages">Messages</Tabs.Tab>
        <Tabs.Tab value="settings">Settings</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="gallery">Gallery tab content</Tabs.Panel>

      <Tabs.Panel value="messages">Messages tab content</Tabs.Panel>

      <Tabs.Panel value="settings">Settings tab content</Tabs.Panel>
    </Tabs>
  );
}

export default Patients;

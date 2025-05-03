import { Tabs } from "@mantine/core";
import { Group, Text, Title, NumberInput, Button } from "@mantine/core";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { IconCalendar, IconPencil, IconUser } from "@tabler/icons-react";
//import { menuItems } from "./constants.js";
import axios from "axios";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import MakePatients from "./PatientsItems/MakePatients";
import InfoPatients from "./PatientsItems/InfoPatients";
import AddInfo from "./PatientsItems/AddInfo";

function Patients() {
  return (
    <Tabs defaultValue="make">
      <Tabs.List>
        <Tabs.Tab value="make">Создать пациента</Tabs.Tab>
        <Tabs.Tab value="info">Информация о пациентах</Tabs.Tab>
        <Tabs.Tab value="add">Добавить медзапиcь о пациенте</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="make">
        <MakePatients></MakePatients>
      </Tabs.Panel>

      <Tabs.Panel value="info">
        <InfoPatients></InfoPatients>
      </Tabs.Panel>

      <Tabs.Panel value="add">
        <AddInfo></AddInfo>
      </Tabs.Panel>
    </Tabs>
  );
}

export default Patients;

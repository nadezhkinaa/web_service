import { useState } from "react";
import { Tabs } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import MakePatients from "./PatientsItems/MakePatients";
import InfoPatients from "./PatientsItems/InfoPatients";
import AddInfo from "./PatientsItems/AddInfo";

//Панель пункта меню пациенты
function Patients() {
  //Состояние открытой вкладки панели
  const [activeTab, setActiveTab] = useState("make");

  return (
    <Tabs value={activeTab} onChange={setActiveTab}>
      <Tabs.List>
        <Tabs.Tab value="make">Создать пациента</Tabs.Tab>
        <Tabs.Tab value="info">Информация о пациентах</Tabs.Tab>
        <Tabs.Tab value="add">Добавить медзапиcь о пациенте</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="make">
        <MakePatients></MakePatients>
      </Tabs.Panel>

      <Tabs.Panel value="info">
        <InfoPatients activeTab={activeTab}></InfoPatients>
      </Tabs.Panel>

      <Tabs.Panel value="add">
        <AddInfo activeTab={activeTab}></AddInfo>
      </Tabs.Panel>
    </Tabs>
  );
}

export default Patients;

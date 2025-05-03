import { useState } from "react";
import {
  Group,
  Text,
  Title,
  NumberInput,
  Button,
  TextInput,
} from "@mantine/core";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { IconCalendar, IconPencil, IconUser } from "@tabler/icons-react";
//import { menuItems } from "./constants.js";
import axios from "axios";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

function InfoPatients() {
  const [surnameSearch, setSurnameSearch] = useState("");
  const [nameSearch, setNameSearch] = useState("");
  const [middleNameSearch, setMiddleNameSearch] = useState("");
  const [ageSearch, setAgeSearch] = useState(null);

  return (
    <>
      <Group
        style={{
          marginTop: "20px",
          gap: "16px",
          alignItems: "flex-end",
        }}
      >
        <TextInput
          placeholder="Фамилия пациента"
          label="Введите фамилию пациента"
          value={surnameSearch}
          onChange={(event) => setSurnameSearch(event.currentTarget.value)}
        ></TextInput>

        <TextInput
          placeholder="Имя пациента"
          label="Введите имя пациента"
          value={nameSearch}
          onChange={(event) => setNameSearch(event.currentTarget.value)}
        ></TextInput>

        <TextInput
          placeholder="Отчество пациента"
          label="Введите отчество пациента"
          value={middleNameSearch}
          onChange={(event) => setMiddleNameSearch(event.currentTarget.value)}
        ></TextInput>

        <NumberInput
          hideControls
          placeholder="Возраст пациента"
          label="Введите возраст пациента"
          value={ageSearch}
          onChange={setAgeSearch}
        ></NumberInput>

        <Button
          onClick={() => {
            // addPatients();
          }}
        >
          Поиск
        </Button>
      </Group>
    </>
  );
}

export default InfoPatients;

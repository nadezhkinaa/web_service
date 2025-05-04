import { useState } from "react";
import { Tabs } from "@mantine/core";
import { Button, TextInput, Box, Group, NumberInput } from "@mantine/core";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { IconCalendar, IconPencil, IconUser } from "@tabler/icons-react";
//import { menuItems } from "./constants.js";
import axios from "axios";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

function MakePatients() {
  const [surname, setSurname] = useState("");
  const [name, setName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [age, setAge] = useState("");

  function addPatients() {
    axios({
      method: "POST",
      url: "http://localhost:1234/api/v1/add-patients",
      data: {
        first_name: name,
        last_name: surname,
        middle_name: middleName !== "" ? middleName : undefined,
        age: Number(age),
      },
    })
      .then((response) => {
        if (response.status == 200 || response.status == 201) {
          console.log("Пациент  успешно создан");
          setSurname("");
          setName("");
          setMiddleName("");
          setAge("");
        }
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status >= 400 && error.response.status < 500) {
            console.log(
              `Ошибка: ${error.response.status} - ${error.response.statusText}`,
              "red"
            );
          }
          console.log(error.response);
        }
      });
  }

  return (
    <>
      <Group
        style={{
          marginTop: "20px",
          gap: "20px",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <TextInput
          withAsterisk
          placeholder="Фамилия пациента"
          label="Введите фамилию пациента"
          style={{ width: "30%" }}
          value={surname}
          onChange={(event) => setSurname(event.currentTarget.value)}
        ></TextInput>

        <TextInput
          withAsterisk
          placeholder="Имя пациента"
          label="Введите имя пациента"
          style={{ width: "30%" }}
          value={name}
          onChange={(event) => setName(event.currentTarget.value)}
        ></TextInput>

        <TextInput
          placeholder="Отчество пациента"
          label="Введите отчество пациента"
          style={{ width: "30%" }}
          value={middleName}
          onChange={(event) => setMiddleName(event.currentTarget.value)}
        ></TextInput>

        <NumberInput
          withAsterisk
          hideControls
          placeholder="Возраст пациента"
          label="Введите возраст пациента"
          style={{ width: "30%" }}
          value={age}
          onChange={(value) => setAge(value.toString())}
        ></NumberInput>

        <Button
          style={{ width: "20%" }}
          disabled={!surname || !name || !age}
          onClick={() => {
            addPatients();
          }}
        >
          Создать пациента
        </Button>
      </Group>
    </>
  );
}

export default MakePatients;

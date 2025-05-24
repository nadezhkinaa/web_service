import { useState } from "react";
import { Button, TextInput, Group, NumberInput } from "@mantine/core";
import axios from "axios";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { BACK_SERVER } from "../../constants";

//Компонент создания новых пациентов
function MakePatients() {
  //Фамилия пациента
  const [surname, setSurname] = useState("");
  //Имя пациента
  const [name, setName] = useState("");
  //Отчество пациента
  const [middleName, setMiddleName] = useState("");
  //Возраст пациента
  const [age, setAge] = useState("");

  //Функция POST-запроса создания нового пациента
  function addPatients() {
    axios({
      method: "POST",
      url: `${BACK_SERVER}/api/v1/add-patients`,
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
          alert("Пациент успешно создан");
          setSurname("");
          setName("");
          setMiddleName("");
          setAge("");
        }
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status >= 400 && error.response.status < 500) {
            alert(
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
          onKeyDown={(e) => {
            if (e.key === "Enter" && surname && name && age) {
              addPatients();
            }
          }}
        ></TextInput>

        <TextInput
          withAsterisk
          placeholder="Имя пациента"
          label="Введите имя пациента"
          style={{ width: "30%" }}
          value={name}
          onChange={(event) => setName(event.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && surname && name && age) {
              addPatients();
            }
          }}
        ></TextInput>

        <TextInput
          placeholder="Отчество пациента"
          label="Введите отчество пациента"
          style={{ width: "30%" }}
          value={middleName}
          onChange={(event) => setMiddleName(event.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && surname && name && age) {
              addPatients();
            }
          }}
        ></TextInput>

        <NumberInput
          withAsterisk
          hideControls
          placeholder="Возраст пациента"
          label="Введите возраст пациента"
          style={{ width: "30%" }}
          value={age}
          onChange={(value) => setAge(value.toString())}
          onKeyDown={(e) => {
            if (e.key === "Enter" && surname && name && age) {
              addPatients();
            }
          }}
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

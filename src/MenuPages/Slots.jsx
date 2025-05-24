import { useState } from "react";
import { Group, Text, Title, NumberInput, Button } from "@mantine/core";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import axios from "axios";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { BACK_SERVER } from "../constants";

//Компонент добавления слотов для записи
function Slots() {
  // ID Доктора
  const [doctorId, setDoctorId] = useState("");
  // Значение даты
  const [valueDate, setValueDate] = useState(null);
  // Значение начального времени
  const [valueTimeFrom, setValueTimeFrom] = useState("");
  // Значение конечного времени
  const [valueTimeTo, setValueTimeTo] = useState("");

  //Форматирование даты
  const formatDateTime = (dateObj, timeStr) => {
    if (!dateObj || !timeStr) return "";

    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");

    return `${year}-${month}-${day} ${timeStr}:00`;
  };

  //Функция POST запроса добавления нового слота
  function addSLot() {
    const startTime = formatDateTime(valueDate, valueTimeFrom);
    const endTime = formatDateTime(valueDate, valueTimeTo);

    axios({
      method: "POST",
      url: `${BACK_SERVER}/api/v1/slots/add`,
      data: {
        doctor_id: Number(doctorId),
        start_time: startTime,
        end_time: endTime,
      },
    })
      .then((response) => {
        if (response.status == 200 || response.status == 201) {
          alert("Слот успешно создан");
          setDoctorId("");
          setValueDate(null);
          setValueTimeFrom("");
          setValueTimeTo("");
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
      <Title order={3}>Создание слотов</Title>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <Group align="flex-start" style={{ width: "100%", marginTop: "20px" }}>
          <Text w={140}>Введите ID доктора:</Text>
          <NumberInput
            placeholder="ID доктора"
            value={doctorId}
            onChange={setDoctorId}
            hideControls
            style={{ width: "200px" }}
            onKeyDown={(e) => {
              if (
                e.key === "Enter" &&
                doctorId &&
                valueDate &&
                valueTimeFrom &&
                valueTimeTo
              ) {
                addSLot();
              }
            }}
          />
        </Group>

        <Group align="flex-start" style={{ width: "100%" }}>
          <Text w={140}>Выберите дату:</Text>
          <DatePickerInput
            placeholder="Выберите дату"
            value={valueDate}
            onChange={setValueDate}
            style={{ width: "200px" }}
            onKeyDown={(e) => {
              if (
                e.key === "Enter" &&
                doctorId &&
                valueDate &&
                valueTimeFrom &&
                valueTimeTo
              ) {
                addSLot();
              }
            }}
          />
        </Group>

        <Group align="flex-start" style={{ width: "100%" }}>
          <Text w={140}>Выберите время:</Text>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <Group style={{ alignItems: "flex-start" }}>
              <Text w={60}>Начало:</Text>
              <TimeInput
                value={valueTimeFrom}
                onChange={(event) =>
                  setValueTimeFrom(event.currentTarget.value)
                }
                style={{ width: "200px" }}
                onKeyDown={(e) => {
                  if (
                    e.key === "Enter" &&
                    doctorId &&
                    valueDate &&
                    valueTimeFrom &&
                    valueTimeTo
                  ) {
                    addSLot();
                  }
                }}
              />
            </Group>
            <Group style={{ alignItems: "flex-start" }}>
              <Text w={60}>Конец:</Text>
              <TimeInput
                value={valueTimeTo}
                onChange={(event) => setValueTimeTo(event.currentTarget.value)}
                style={{ width: "200px" }}
                onKeyDown={(e) => {
                  if (
                    e.key === "Enter" &&
                    doctorId &&
                    valueDate &&
                    valueTimeFrom &&
                    valueTimeTo
                  ) {
                    addSLot();
                  }
                }}
              />
            </Group>
          </div>
        </Group>
        <Button
          onClick={() => {
            addSLot();
          }}
          style={{ width: "200px", marginTop: "30px" }}
        >
          Создать
        </Button>
      </div>
    </>
  );
}
export default Slots;

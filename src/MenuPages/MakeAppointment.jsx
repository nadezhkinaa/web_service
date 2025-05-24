import { useState, useMemo, useEffect } from "react";
import {
  Button,
  Box,
  Group,
  NumberInput,
  Text,
  Paper,
  Select,
} from "@mantine/core";
import axios from "axios";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { getInfoPatients } from "./InfoPatients.js";
import { BACK_SERVER } from "../constants";

//Компонент создания записи на прием
function MakeAppointment() {
  //ID доктора
  const [idDoctor, setIdDoctor] = useState(null);
  //Свободные слоты для записи
  const [slots, setSlots] = useState([]);
  //Выбранная дата
  const [selectedDate, setSelectedDate] = useState(null);
  //Выбранный слот
  const [selectedSlot, setSelectedSlot] = useState(null);
  //Список пациентов
  const [patientsList, setPatientsList] = useState([]);
  //Выбранный пациент
  const [selectedPatient, setSelectedPatient] = useState(null);
  //Параметры для создания запроса получения информации о пациентах
  const makeParams = () => {
    let params = {};
    return params;
  };

  //Функция преобразования времени в hh:mm
  const formatTime = (dateTimeStr) => {
    return new Date(dateTimeStr).toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  //Функция форматирования даты (короткое название недели, число и полное название месяца)
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("ru-RU", {
      weekday: "short",
      day: "numeric",
      month: "long",
    });
  };

  // Преобразование для select в формат ФИО из массива пациентов
  const patientOptions = patientsList.map((patient) => ({
    value: patient.id.toString(),
    label:
      `${patient.last_name} ${patient.first_name} ${patient.middle_name || ""}`.trim(),
  }));

  //Собирает уникальные даты
  const uniqueDates = useMemo(() => {
    const dates = new Set();
    slots.forEach((slot) => {
      const date = slot.start_time.split(" ")[0];
      dates.add(date);
    });
    return Array.from(dates).sort();
  }, [slots]);

  // Фильтруем слоты по выбранной дате
  const filteredSlots = useMemo(() => {
    if (!selectedDate) return [];
    return slots.filter((slot) => slot.start_time.startsWith(selectedDate));
  }, [selectedDate, slots]);

  //Загрузка информации о пациентов
  useEffect(() => {
    getInfoPatients(setPatientsList, makeParams);
  }, []);

  //Функция GET-запроса для получения информации о свободных слотах
  function findSlots() {
    axios({
      method: "GET",
      url: `${BACK_SERVER}/api/v1/slots/free/${idDoctor}`,
    })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          const availableSlots = response.data.data.filter(
            (slot) => slot.is_available === 1
          );
          setSlots(availableSlots);
        }
      })
      .catch((error) => {
        if (error.response) {
          alert(
            `Ошибка: ${error.response.status} - ${error.response.statusText}`,
            "red"
          );
        } else {
          alert("Произошла ошибка при загрузке данных");
        }
      });
  }

  //Функция POST-запроса запись на прием
  function addAppointment() {
    axios({
      method: "POST",
      url: `${BACK_SERVER}/api/v1/appointments/book`,
      data: {
        patient_id: selectedPatient,
        schedule_id: selectedSlot.id,
      },
    })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          alert(`Запись на ${selectedSlot.start_time} подтверждена`);
          setSelectedSlot(null);
          setSlots([]);
          setSelectedPatient(null);
          setIdDoctor("");
        }
      })
      .catch((error) => {
        if (error.response) {
          alert(
            `Ошибка: ${error.response.status} - ${error.response.statusText}`,
            "red"
          );
        } else {
          alert("Произошла ошибка при загрузке данных");
        }
      });
  }

  return (
    <Box p="md">
      <Group
        style={{
          marginTop: "20px",
          gap: "20px",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Select
          withAsterisk
          label="Выберите пациента"
          placeholder="Поиск пациента..."
          data={patientOptions}
          value={selectedPatient}
          onChange={setSelectedPatient}
          style={{ width: "100%", maxWidth: "500px" }}
          searchable
          clearable
          nothingFoundMessage="Пациенты не найдены"
        />
        <NumberInput
          withAsterisk
          hideControls
          placeholder="ID доктора"
          label="Введите ID доктора"
          style={{ width: "30%" }}
          value={idDoctor}
          onChange={setIdDoctor}
        />

        <Button
          style={{ width: "20%" }}
          onClick={findSlots}
          disabled={!idDoctor || !selectedPatient}
        >
          Показать свободные слоты
        </Button>
      </Group>

      {slots.length > 0 && (
        <>
          <Group gap="sm" mb="md" style={{ paddingTop: "20px" }}>
            {uniqueDates.map((date) => (
              <Button
                key={date}
                variant={selectedDate === date ? "filled" : "outline"}
                onClick={() => {
                  setSelectedDate(date);
                  setSelectedSlot(null);
                }}
              >
                {formatDate(date)}
              </Button>
            ))}
          </Group>

          {selectedDate && (
            <Group gap="sm" mb="md" style={{ paddingTop: "10px" }}>
              {filteredSlots.map((slot) => (
                <Button
                  key={slot.id}
                  variant={selectedSlot?.id === slot.id ? "filled" : "outline"}
                  onClick={() => setSelectedSlot(slot)}
                >
                  {formatTime(slot.start_time)} - {formatTime(slot.end_time)}
                </Button>
              ))}
            </Group>
          )}
        </>
      )}

      {selectedSlot && (
        <Paper withBorder style={{ width: "22%" }} p="md">
          <Text fw={500}>Вы выбрали:</Text>
          <Text>Дата: {formatDate(selectedSlot.start_time)}</Text>
          <Text>
            Время: {formatTime(selectedSlot.start_time)} -{" "}
            {formatTime(selectedSlot.end_time)}
          </Text>
          <Button
            mt="sm"
            onClick={() => {
              addAppointment();
            }}
          >
            Записаться
          </Button>
        </Paper>
      )}
    </Box>
  );
}

export default MakeAppointment;

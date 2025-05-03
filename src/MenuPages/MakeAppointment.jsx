import { useState, useMemo } from "react";
import {
  Tabs,
  Button,
  Table,
  Box,
  Group,
  NumberInput,
  Text,
  Paper,
} from "@mantine/core"; // Добавлен Text
import { DatePickerInput, TimeInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { IconCalendar, IconPencil, IconUser } from "@tabler/icons-react";
import axios from "axios";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

function MakeAppointment() {
  const [surname, setSurname] = useState("");
  const [name, setName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [idDoctor, setIdDoctor] = useState(null);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const formatTime = (dateTimeStr) => {
    return new Date(dateTimeStr).toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("ru-RU", {
      weekday: "short",
      day: "numeric",
      month: "long",
    });
  };

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

  function findSlots() {
    if (!idDoctor) {
      setError("Введите ID доктора");
      return;
    }

    setLoading(true);
    setError("");

    axios({
      method: "GET",
      url: `http://localhost:1234/api/v1/slots/free/${idDoctor}`,
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
          setError(
            `Ошибка: ${error.response.status} - ${error.response.statusText}`
          );
        } else {
          setError("Произошла ошибка при загрузке данных");
        }
      })
      .finally(() => {
        setLoading(false);
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
          disabled={!idDoctor}
        >
          Показать свободные слоты
        </Button>

        {error && <Text color="red">{error}</Text>}
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
                  setSelectedSlot(null); // Сбрасываем выбранный слот при смене даты
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
            onClick={() =>
              alert(`Запись на ${selectedSlot.start_time} подтверждена`)
            }
          >
            Записаться
          </Button>
        </Paper>
      )}

      {/*slots.length === 0 && !loading && idDoctor && (
        <Text>Нет доступных слотов для данного доктора</Text>
      )*/}
    </Box>
  );
}

export default MakeAppointment;

import { useState } from "react";
import { Group, Text, Title, NumberInput, Button } from "@mantine/core";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { IconCalendar, IconPencil, IconUser } from "@tabler/icons-react";
//import { menuItems } from "./constants.js";
import axios from "axios";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

function Slots() {
  const [valueDate, setValueDate] = useState(null);
  const [valueTimeFrom, setValueTimeFrom] = useState("");
  const [valueTimeTo, setValueTimeTo] = useState("");

  function addSLot() {
    axios({
      method: "POST",
      url: "http://localhost:1234/api/v1/slots/add",
      data: {
        doctor_id: 3,
        start_time: "2024-11-22 19:00:00",
        end_time: "2024-11-22 19:20:00",
      },
    })
      .then((response) => {
        if (response.status == 200) {
          /*setHosts(response.data.message.remote_node_list.map((s) => ({
              hostname: s.hostname,
              status: s.status,
              cpu: s.cpu,
              mem: s.mem,
              disk: s.disk,
              cores: result[s.hostname]
            })),
            )*/
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
      <Title order={3}>Создание слотов</Title>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <Group align="flex-start" style={{ width: "100%", marginTop: "20px" }}>
          <Text w={140}>Введите id доктора:</Text>
          <NumberInput placeholder="ID доктора" style={{ width: "200px" }} />
        </Group>

        <Group align="flex-start" style={{ width: "100%" }}>
          <Text w={140}>Выберите дату:</Text>
          <DatePickerInput
            placeholder="Выберите дату"
            value={valueDate}
            onChange={setValueDate}
            style={{ width: "200px" }}
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
              />
            </Group>
            <Group style={{ alignItems: "flex-start" }}>
              <Text w={60}>Конец:</Text>
              <TimeInput
                value={valueTimeTo}
                onChange={(event) => setValueTimeTo(event.currentTarget.value)}
                style={{ width: "200px" }}
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

import { useState } from "react";
import { Group, NumberInput, Button, Textarea } from "@mantine/core";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { IconCalendar, IconPencil, IconUser } from "@tabler/icons-react";
//import { menuItems } from "./constants.js";
import axios from "axios";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

function AddInfo() {
  const [idAddInfoPatient, setIdAddInfoPatient] = useState("");
  const [infoPatient, setInfoPatient] = useState("");

  return (
    <>
      <Group
        style={{
          marginTop: "20px",
          gap: "16x",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <NumberInput
          withAsterisk
          hideControls
          label="Введите ID пациента"
          placeholder="ID пациента"
          value={idAddInfoPatient}
          onChange={setIdAddInfoPatient}
          style={{ width: "30%" }}
        ></NumberInput>

        <Textarea
          resize="vertical"
          label="Введите запись"
          withAsterisk
          placeholder="Запись"
          style={{ width: "40%" }}
          value={infoPatient}
          onChange={(event) => setInfoPatient(event.currentTarget.value)}
        ></Textarea>

        <Button
          onClick={() => {
            // addPatients();
          }}
        >
          Добавить
        </Button>
      </Group>
    </>
  );
}

export default AddInfo;

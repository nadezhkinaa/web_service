import { useState, useEffect } from "react";
import { Group, NumberInput, Button, Textarea, Select } from "@mantine/core";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { IconCalendar, IconPencil, IconUser } from "@tabler/icons-react";
//import { menuItems } from "./constants.js";
import axios from "axios";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { getInfoPatients } from "../InfoPatients.js";

function AddInfo() {
  const [idAddInfoPatient, setIdAddInfoPatient] = useState("");
  const [infoPatient, setInfoPatient] = useState("");
  const [patientsList, setPatientsList] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const makeParams = () => {
    let params = {};
    return params;
  };

  useEffect(() => {
    getInfoPatients(setPatientsList, makeParams);
  }, []);

  const patientOptions = patientsList.map((patient) => ({
    value: patient.id.toString(),
    label:
      `${patient.last_name} ${patient.first_name} ${patient.middle_name || ""}`.trim(),
  }));

  console.log(selectedPatient);

  function addMedicalInfo() {
    axios({
      method: "POST",
      url: `http://localhost:1234/api/v1/patients/add-data/${selectedPatient}`,
      data: {
        medical_history: infoPatient,
      },
    })
      .then((response) => {
        if (response.status == 200 || response.status == 201) {
          console.log("Медзапись добавлена");
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
          gap: "16x",
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
            addMedicalInfo();
          }}
        >
          Добавить
        </Button>
      </Group>
    </>
  );
}

export default AddInfo;

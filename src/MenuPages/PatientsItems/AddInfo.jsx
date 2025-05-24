import { useState, useEffect } from "react";
import { Group, Button, Textarea, Select } from "@mantine/core";
import axios from "axios";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { getInfoPatients } from "../InfoPatients.js";
import { BACK_SERVER } from "../../constants";

//Компонент добавлении информации в медзапись
function AddInfo({ activeTab }) {
  //Информация о пациенте
  const [infoPatient, setInfoPatient] = useState("");
  //Список пациентов
  const [patientsList, setPatientsList] = useState([]);
  //Выбранный пациент
  const [selectedPatient, setSelectedPatient] = useState(null);
  //Параметры для запроса
  const makeParams = () => {
    let params = {};
    return params;
  };
  //Загрузка информации
  useEffect(() => {
    getInfoPatients(setPatientsList, makeParams);
  }, []);

  //Загрузка информации при смене вкладки панели
  useEffect(() => {
    if (activeTab === "add") {
      getInfoPatients(setPatientsList, makeParams);
    }
  }, [activeTab]);

  // Преобразование для select в формат ФИО из массива пациентов
  const patientOptions = patientsList.map((patient) => ({
    value: patient.id.toString(),
    label:
      `${patient.last_name} ${patient.first_name} ${patient.middle_name || ""}`.trim(),
  }));

  //Функция POST-запроса добавления медзаписи
  function addMedicalInfo() {
    axios({
      method: "POST",
      url: `${BACK_SERVER}/api/v1/patients/add-data/${selectedPatient}`,
      data: {
        medical_history: infoPatient,
      },
    })
      .then((response) => {
        if (response.status == 200 || response.status == 201) {
          alert("Медзапись добавлена");
          setSelectedPatient(null);
          setInfoPatient("");
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
          onKeyDown={(e) => {
            if (e.key === "Enter" && selectedPatient && infoPatient) {
              addMedicalInfo();
            }
          }}
        />

        <Textarea
          resize="vertical"
          label="Введите запись"
          withAsterisk
          placeholder="Запись"
          style={{ width: "40%" }}
          value={infoPatient}
          onChange={(event) => setInfoPatient(event.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && selectedPatient && infoPatient) {
              addMedicalInfo();
            }
          }}
        ></Textarea>

        <Button
          disabled={!selectedPatient || !infoPatient}
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

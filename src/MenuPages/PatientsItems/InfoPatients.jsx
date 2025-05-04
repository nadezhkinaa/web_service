import { useState, useEffect } from "react";
import {
  Group,
  Text,
  Title,
  NumberInput,
  Button,
  TextInput,
} from "@mantine/core";
import { DataTable } from "mantine-datatable";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { IconCalendar, IconPencil, IconUser } from "@tabler/icons-react";
//import { menuItems } from "./constants.js";
import axios from "axios";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "mantine-datatable/styles.css";

import { getInfoPatients } from "../InfoPatients.js";

function InfoPatients() {
  const [surnameSearch, setSurnameSearch] = useState("");
  const [nameSearch, setNameSearch] = useState("");
  const [middleNameSearch, setMiddleNameSearch] = useState("");
  const [ageSearch, setAgeSearch] = useState(null);
  const [info, setInfo] = useState([]);

  const makeParams = () => {
    let params = {};
    if (surnameSearch) params.last_name = surnameSearch;
    if (nameSearch) params.first_name = nameSearch;
    if (middleNameSearch) params.middle_name = middleNameSearch;
    if (ageSearch) params.age = ageSearch;
    return params;
  };

  useEffect(() => {
    getInfoPatients(setInfo, makeParams);
  }, [surnameSearch, nameSearch, middleNameSearch, ageSearch]);

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
            getInfoPatients(setInfo, makeParams);
          }}
        >
          Поиск
        </Button>
      </Group>
      <Group
        style={{
          marginTop: "20px",
          justifyContent: "flex-end",
        }}
      >
        <Button
          onClick={() => {
            getInfoPatients(setInfo, makeParams);
          }}
        >
          Обновить данные
        </Button>
      </Group>

      <DataTable
        highlightOnHover
        textSelectionDisabled
        striped
        withTableBorder
        withColumnBorders
        noRecordsText="Пациенты не найдены"
        style={{
          marginTop: "40px",
          minHeight: info.length === 0 ? 200 : undefined,
          height: info.length > 0 ? "auto" : 200,
          overflow: "visible",
        }}
        idAccessor="id"
        columns={[
          /*{
            accessor: "id",
            title: "ID",
          },*/
          {
            accessor: "first_name",
            title: "Фамилия",
          },
          {
            accessor: "last_name",
            title: "Имя",
          },
          {
            accessor: "middle_name",
            title: "Отчество",
          },
          {
            accessor: "age",
            title: "Возраст",
          },
          { accessor: "medical_history", title: "Медицинская история" },
        ].filter(Boolean)}
        records={info}
      />
    </>
  );
}

export default InfoPatients;

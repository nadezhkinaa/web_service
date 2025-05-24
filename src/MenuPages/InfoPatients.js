import axios from "axios";
import { BACK_SERVER } from "../constants";
//Функция GET-запроса получения запроса о пациентах
export async function getInfoPatients(setInfo, makeParams) {
  const params = makeParams();

  axios({
    method: "GET",
    url: `${BACK_SERVER}/api/v1/find-patients`,
    params: params ? params : undefined,
  })
    .then((response) => {
      if (response.status == 200 || response.status == 201) {
        if (!response.data.data) {
          setInfo([]);
          return;
        }
        setInfo(
          response.data.data.map((s) => ({
            id: s.id,
            first_name: s.first_name,
            last_name: s.last_name,
            middle_name: s.middle_name,
            age: s.age,
            medical_history: s.medical_history,
          }))
        );
      }
    })
    .catch((error) => {
      setInfo([]);
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

export default {
  getInfoPatients,
};

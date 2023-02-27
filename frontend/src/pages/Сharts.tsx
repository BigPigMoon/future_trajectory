import React, { useEffect, useState } from "react";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";
import axios, { AxiosResponse } from "axios";
import { Loading } from "../components/Loading";

interface Dataset {
  label: string;
  data: number[];
}

interface ChartDataset {
  type: string;
  labels: string[];
  datasets: Dataset[];
}

export const Charts = () => {
  const [preData, setPreData] = useState<ChartDataset | null>(null);
  const [select, setSelect] = useState("");

  useEffect(() => {
    async function fetchData() {
      const response: AxiosResponse<ChartDataset> = await axios.get(
        `http://localhost:5000/charts/${select}`
      );
      setPreData(response.data);
    }

    fetchData();
  }, [select]);

  const data = {
    labels: preData?.labels,
    datasets: [
      {
        label: preData?.datasets[0].label,
        data: preData?.datasets[0].data,
      },
    ],
  };

  return (
    <div>
      <div>
        <select
          className="select select-bordered w-full max-w-xs m-7"
          onChange={(event) => {
            if (event.target.value === "Количество комплексов в субъектах РФ")
              setSelect("rfsubject");

            if (event.target.value === "Количество объектов с действиями")
              setSelect("actions");

            if (event.target.value === "Количество объектов в реесте")
              setSelect("inreester");

            if (event.target.value === "Количество объектов с видом спорта")
              setSelect("sporttype");

            if (
              event.target.value ===
              "Количество объектов с поддержкой типов спорта"
            )
              setSelect("sportcomplex");
          }}
          value={"Выбирете данные для графика"}
        >
          <option disabled selected>
            Выбирете данные для графика
          </option>
          <option>Количество комплексов в субъектах РФ</option>
          <option>Количество объектов с действиями</option>
          <option>Количество объектов в реесте</option>
          <option>Количество объектов с видом спорта</option>
          <option>Количество объектов с поддержкой типов спорта</option>
        </select>
      </div>
      {preData ? (
        <div className="flex items-center justify-center p-10">
          {preData?.type === "bar" && <Chart type="bar" data={data} />}
          {preData?.type === "doughnut" && (
            <Chart type="doughnut" data={data} />
          )}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

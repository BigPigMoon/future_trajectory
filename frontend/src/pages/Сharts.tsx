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
  const [selectedText, setSelectedText] = useState("");

  useEffect(() => {
    async function fetchData() {
      const response: AxiosResponse<ChartDataset> = await axios.get(
        `http://localhost:5000/charts/${select}`
      );
      setPreData(response.data);
    }

    fetchData();
  }, [select]);

  let data;
  if (preData) {
    data = {
      labels: preData.labels,
      datasets: preData.datasets.map((val) => {
        return {
          label: val.label,
          data: val.data,
        };
      }),
    };
  }

  return (
    <div>
      <div>
        <select
          className="select select-bordered w-full max-w-xl m-7"
          onChange={(event) => {
            setSelectedText(event.target.value);
            if (event.target.value === "Количество комплексов в субъектах РФ")
              setSelect("rfsubject");

            if (
              event.target.value === "Количество объектов по действиям над ними"
            )
              setSelect("actions");

            if (event.target.value === "Количество объектов в реесте")
              setSelect("inreester");

            if (
              event.target.value ===
              "Количество объектов по доступным видам спорта"
            )
              setSelect("sporttype");

            if (
              event.target.value ===
              "Количество объектов по доступным типам спортивного комплекса"
            )
              setSelect("sportcomplex");
            if (
              event.target.value ===
              "Количество объектов по дате начала и окончания работ"
            )
              setSelect("date");
          }}
          value={"Выбирете данные для графика"}
        >
          <option disabled selected>
            Выбирете данные для графика
          </option>
          <option>Количество комплексов в субъектах РФ</option>
          <option>Количество объектов по действиям над ними</option>
          <option>Количество объектов в реесте</option>
          <option>Количество объектов по дате начала и окончания работ</option>
          <option>Количество объектов по доступным видам спорта</option>
          <option>
            Количество объектов по доступным типам спортивного комплекса
          </option>
        </select>
      </div>
      {data ? (
        <div className="flex flex-col items-center justify-center p-10">
          <h1 className="text-4xl font-bold align-middle w-max py-6">
            {selectedText}
          </h1>
          {preData?.type === "bar" && <Chart type="bar" data={data} />}
          {preData?.type === "doughnut" && (
            <div className="w-5/12 h-5/12">
              <Chart type="doughnut" data={data} />
            </div>
          )}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

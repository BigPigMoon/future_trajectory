import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { Loading } from "../components/Loading";

interface ObjectData {
  Name: string;
  NameEng?: string;
  Active?: string;
  ShortDescription?: string;
  ShortDescriptionEng?: string;
  Description?: string;
  DescriptionEng?: string;
  Address: string;
  AddressEng?: string;
  ObjectPhone?: string;
  Email?: string;
  URL?: string;
  WorkInMOFR?: string;
  WorkInSat?: string;
  WorkInSun?: string;
  Area?: any;
  SportComplexType?: string;
}

export const AboutObject = () => {
  const { id } = useParams();

  const [data, setData] = useState<ObjectData | null>(null);
  const [eng, setEng] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const response: AxiosResponse<ObjectData | null> = await axios.get(
        `http://localhost:5000/maps/${id}`
      );
      setData(response.data);
    }

    fetchData();
  }, [id]);

  return (
    <>
      {data ? (
        <>
          <div className="flex px-4 py-16 bg-base-200">
            <div className="m-7 w-full">
              <p className="text-4xl font-bold m-5">
                {eng ? data.NameEng : data.Name}
              </p>
              <p className="text-lg m-4">
                {eng ? data.ShortDescriptionEng : data.ShortDescription}
              </p>

              {data.SportComplexType && (
                <p className="m-4 text-lg font-bold">
                  {eng ? "Sport complex type: " : "Тип спортивного комплекса: "}
                  <span className="font-normal">{data.SportComplexType}</span>
                </p>
              )}
              {data.Area && (
                <p className="m-4 text-lg font-bold">
                  {eng ? "Area: " : "Площадь: "}
                  <span className="font-normal">{data.Area}</span>
                </p>
              )}

              <div className="form-control w-40 m-6">
                <label className="cursor-pointer label">
                  <span className="text">{eng ? "Active" : "Активный"}</span>
                  <input
                    type="checkbox"
                    checked={data.Active === "Yes"}
                    className="checkbox checkbox-error"
                  />
                </label>
              </div>

              <div
                tabIndex={0}
                className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box m-7"
              >
                <input type="checkbox" />
                <div className="collapse-title text-xl font-medium">
                  {eng ? "Detailed description" : "Детальное описание"}
                </div>
                <div className="collapse-content">
                  <p>
                    {eng
                      ? data.DescriptionEng
                        ? data.DescriptionEng
                        : "Be away"
                      : data.Description
                      ? data.Description
                      : "Отсутсвует"}
                  </p>
                </div>
              </div>

              <p className="m-4 text-lg font-bold">
                {eng ? "Address: " : "Адрес: "}{" "}
                <span className="font-normal text-lg">
                  {eng ? data.AddressEng : data.Address}
                </span>
              </p>
              <p className="m-4 text-lg font-bold">
                {eng ? "Phone: " : "Телефон: "}
                <span className="font-normal text-lg">
                  {data.ObjectPhone
                    ? data.ObjectPhone
                    : eng
                    ? "Be away"
                    : "Отсутсвует"}
                </span>
              </p>
              <p className="m-4 text-lg font-bold">
                {eng ? "Email: " : "Почта: "}
                <span className="font-normal text-lg">
                  {data.Email ? data.Email : eng ? "Be away" : "Отсутсвует"}
                </span>
              </p>
              <p className="m-4 text-lg font-bold">
                {eng ? "Website: " : "Сайт: "}
                <span className="font-normal text-lg">
                  {data.URL ? data.URL : eng ? "Be away" : "Отсутсвует"}
                </span>
              </p>

              <p className="text-3xl font-bold m-5">
                {eng ? "Schedule:" : "График работы:"}
              </p>
              <p className="m-4 text-lg font-bold">
                {eng ? "Monday-Friday: " : "Понедельник-пятница: "}
                <span className="font-normal text-lg">
                  {data.WorkInMOFR
                    ? data.WorkInMOFR
                    : eng
                    ? "Be away"
                    : "Отсутсвует"}
                </span>
              </p>

              <p className="m-4 text-lg font-bold">
                {eng ? "Saturday: " : "Суббота: "}
                <span className="font-normal text-lg">
                  {data.WorkInSat
                    ? data.WorkInSat
                    : eng
                    ? "Be away"
                    : "Отсутсвует"}
                </span>
              </p>

              <p className="m-4 text-lg font-bold">
                {eng ? "Sunday: " : "Воскресенье: "}
                <span className="font-normal text-lg">
                  {data.WorkInSun
                    ? data.WorkInSun
                    : eng
                    ? "Be away"
                    : "Отсутсвует"}
                </span>
              </p>
            </div>
            <div className="m-6 w-60">
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text mr-4">
                    {eng ? "На русский" : "On english"}
                  </span>
                  <input
                    type="checkbox"
                    checked={eng}
                    className="toggle toggle-success"
                    onClick={() => {
                      setEng(!eng);
                    }}
                  />
                </label>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

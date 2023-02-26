import { useEffect, useState } from "react";
import { Map, YMaps, Placemark } from "@pbe/react-yandex-maps";
import { Portal } from "../components/Portal";
import { BallonComponent } from "../components/BallonComponent";
import axios, { AxiosResponse } from "axios";

interface MapData {
  Id: number;
  YaCoordX: number;
  YaCoordY: number;
  Name: string;
}

export const YaMap = () => {
  const [data, setData] = useState<MapData[] | null>(null);
  const [activePortal, setActivePortal] = useState(false);
  const [activeBallon, setActiveBallon] = useState<{
    id: number;
    name: string;
  } | null>(null);

  useEffect(() => {
    async function fetchData() {
      const response: AxiosResponse<MapData[]> = await axios.get(
        "http://localhost:5000/maps/all"
      );
      setData(response.data);
    }

    fetchData();
  }, []);

  return (
    <YMaps>
      {data ? (
        <Map
          style={{
            width: "auto",
            height: "600px",
          }}
          defaultState={{
            center: [62.66654, 80.118137],
            zoom: 3,
            controls: ["zoomControl", "fullscreenControl"],
          }}
          modules={[
            "control.ZoomControl",
            "control.FullscreenControl",
            "geoObject.addon.balloon",
          ]}
        >
          {data.map((element: MapData) => (
            <Placemark
              key={element.Id}
              defaultGeometry={[element.YaCoordY, element.YaCoordX]}
              properties={{
                // создаём пустой элемент с заданными размерами
                balloonContent: `<div id="driver-${element.Id}" class="driver-card"></div>`,
              }}
              onClick={() => {
                // ставим в очередь промисов, чтобы сработало после отрисовки балуна
                setTimeout(() => {
                  setActivePortal(true);
                  setActiveBallon({
                    id: element.Id,
                    name: element.Name,
                  });
                }, 0);
              }}
            />
          ))}
        </Map>
      ) : (
        <div className="grid h-screen place-items-center">
          <progress className="progress w-56" />
        </div>
      )}
      {activeBallon && (
        <Portal elementId={`driver-${activeBallon.id}`}>
          <BallonComponent
            ballonId={activeBallon.id}
            name={activeBallon.name}
          />
        </Portal>
      )}
    </YMaps>
  );
};

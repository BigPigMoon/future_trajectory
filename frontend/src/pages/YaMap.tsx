import { useEffect, useState } from "react";
import { Map, YMaps, Placemark } from "@pbe/react-yandex-maps";
import { Portal } from "../components/Portal";
import { BallonComponent } from "../components/BallonComponent";

export const YaMap = () => {
  const [data, setData] = useState<
    {
      Id: number;
      YaMapX: number;
      YaMapY: number;
    }[]
  >([]);
  const [activePortal, setActivePortal] = useState(false);
  const [activeBallonId, setActiveBallonId] = useState(0);

  useEffect(() => {
    fetch("http://localhost:5000/maps/all")
      .then((value) => value.json())
      .then((newData) => {
        setData((data) => [...newData]);
      });
  }, []);

  return (
    <YMaps>
      {data.length !== 0 && (
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
          {data.map(
            (element: { Id: number; YaMapX: number; YaMapY: number }) => (
              <Placemark
                key={element.Id}
                defaultGeometry={[element.YaMapY, element.YaMapX]}
                properties={{
                  // создаём пустой элемент с заданными размерами
                  balloonContent: `<div id="driver-${element.Id}" class="driver-card"></div>`,
                }}
                onClick={() => {
                  // ставим в очередь промисов, чтобы сработало после отрисовки балуна
                  setTimeout(() => {
                    setActivePortal(true);
                    setActiveBallonId(element.Id);
                  }, 0);
                }}
              />
            )
          )}
        </Map>
      )}
      {activePortal && (
        <Portal elementId={`driver-${activeBallonId}`}>
          <BallonComponent ballonId={activeBallonId} />
        </Portal>
      )}
    </YMaps>
  );
};

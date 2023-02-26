import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type BallonComponentProps = {
  ballonId: number;
};

export const BallonComponent = (props: BallonComponentProps) => {
  const [data, setData] = useState<{ Name: string }>({
    Name: "",
  });

  useEffect(() => {
    fetch(`http://localhost:5000/maps/${props.ballonId}`)
      .then((value) => value.json())
      .then((newData) => {
        setData(newData);
      });
  }, [props.ballonId]);

  const navigate = useNavigate();

  return (
    <>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{data.Name}</h2>
        <div className="card-actions">
          <button
            className="btn btn-primary"
            onClick={() => {
              navigate(`/about/${props.ballonId}`);
            }}
          >
            Подробнее
          </button>
        </div>
      </div>
    </>
  );
};

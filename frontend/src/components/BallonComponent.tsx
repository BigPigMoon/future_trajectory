import { useNavigate } from "react-router-dom";

type BallonComponentProps = {
  ballonId: number;
  name: string;
};

export const BallonComponent = (props: BallonComponentProps) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{props.name}</h2>
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

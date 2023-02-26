import { useParams } from "react-router-dom";
import { useEffect } from "react";

export const AboutObject = () => {
  const { id } = useParams();

  useEffect(() => {
    console.log(`/about/${id}`);
  }, [id]);
  return <></>;
};

import { useParams } from "react-router-dom";
import useWorkerData from "../../hooks/useWorker";

function Worker() {
  const { id } = useParams();
  const worker = useWorkerData(id || "");
  return (
    <div>
      <div>{worker?.firstName}</div>
      <div>{worker?.lastName}</div>
    </div>
  );
}

export default Worker;

import { IoArrowBack } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

export default function Back() {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(-1)}
      className="group absolute top-4 left-4 hover:bg-emerald-600 p-3 rounded-full z-30 bg-emerald-500"
    >
      <IoArrowBack size={24} className="text-white" />
    </div>
  );
}

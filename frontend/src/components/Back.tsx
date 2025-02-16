import { IoArrowBack } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function Back() {
  return (
    <Link
      to="/"
      className="group absolute top-4 left-4 hover:bg-emerald-600 p-3 rounded-full z-30 bg-emerald-500"
    >
      <IoArrowBack size={24} className="text-white" />
    </Link>
  );
}

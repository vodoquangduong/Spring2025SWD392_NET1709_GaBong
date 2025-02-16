import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/" className={`flex items-center justify-center p-4}`}>
      <div
        className={`flex items-center py-3 -ms-3 self-center text-emerald-500 whitespace-nowrap font-sans font-bold`}
      >
        Freelancer
      </div>
    </Link>
  );
}

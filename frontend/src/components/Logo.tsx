import { Link } from "react-router-dom";

export default function Logo({ collapsed }: { collapsed?: boolean }) {
  return (
    <Link to="/" className={`flex items-center justify-center p-4}`}>
      <div
        className={`aspect-[804/301] bg-center bg-contain  text-emerald-500 bg-no-repeat ${
          collapsed ? "h-[20px]" : "h-[40px]"
        }`}
        style={{
          backgroundImage: `url(${import.meta.env.VITE_CLIENT_URL}/logo.png)`,
        }}
      ></div>
    </Link>
  );
}

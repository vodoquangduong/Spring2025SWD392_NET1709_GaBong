export default function Home() {
  return (
    <div>
      <div className="text-red-500">Hello</div>
      <div>{import.meta.env.VITE_SERVER_URL}</div>
    </div>
  );
}

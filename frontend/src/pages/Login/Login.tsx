import Back from "../../components/Back";
import "./login.css";
import LoginForm from "./partials/LoginForm";
import LoginHero from "./partials/LoginHero";

const Login = () => {
  return (
    <main className="flex w-full min-h-screen bg-zinc-100 dark:bg-zinc-950">
      <LoginForm />
      <LoginHero />
      <Back />
    </main>
  );
};

export default Login;

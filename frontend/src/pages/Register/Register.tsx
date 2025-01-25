import Back from "../../components/Back";
import RegisterForm from "./partials/RegisterForm";
import RegisterHero from "./partials/RegisterHero";

const Register = () => {
  return (
    <main className="flex w-full min-h-screen bg-zinc-100 dark:bg-zinc-950">
      <RegisterForm />
      <RegisterHero />
      <Back />
    </main>
  );
};

export default Register;

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBox from "../../../components/SearchBox";
import { FaPlus, FaRegBell } from "react-icons/fa";

const candidates = [
  "https://shreethemes.in/jobstack/layouts/assets/images/team/01.jpg",
  "https://shreethemes.in/jobstack/layouts/assets/images/team/02.jpg",
  "https://shreethemes.in/jobstack/layouts/assets/images/team/03.jpg",
  "https://shreethemes.in/jobstack/layouts/assets/images/team/04.jpg",
  "https://shreethemes.in/jobstack/layouts/assets/images/team/05.jpg",
  // "https://shreethemes.in/jobstack/layouts/assets/images/team/06.jpg",
  // "https://shreethemes.in/jobstack/layouts/assets/images/team/07.jpg",
  // "https://shreethemes.in/jobstack/layouts/assets/images/team/08.jpg",
];

const Temp = () => {
  useEffect(() => {
    const hero = document.querySelector(".hero");
    const parallaxs = document.querySelectorAll(".parallax1");

    if (hero) {
      hero.addEventListener("mousemove", (e: Event) => {
        parallaxs.forEach((parallax) => {
          let speed = 1;
          // speed = getRandomInt(1, 3);
          const x =
            -(window.innerWidth / 2 - (e as MouseEvent).clientX * speed) / 90;
          const y =
            -(window.innerHeight / 2 - (e as MouseEvent).clientY * speed) / 90;
          (
            parallax as HTMLElement
          ).style.transform = `translateX(${x}%) translateY(${y}%)`;
        });
      });

      // Cleanup event listener on component unmount
      // return () => hero.removeEventListener("mousemove");
    }
  }, []);

  return (
    <>
      <div className="lg:col-span-5 md:col-span-6">
        <div className="relative dark:text-primary-foreground">
          <div className="relative flex justify-end z-20">
            <img
              src="https://shreethemes.in/jobstack/layouts/assets/images/about/ab01.jpg"
              className="parallax w-[400px] rounded-xl shadow dark:shadow-gray-700 -translate-x-10"
              alt=""
            />
            <div className="parallax p-5 absolute lg:bottom-20 -bottom-24 xl:-end-20 lg:-end-10 end-2 rounded-lg shadow-md bg-white z-10">
              <div className="text-base font-semibold mb-3">
                Candidates get job
              </div>

              <ul className="list-none relative">
                {candidates.map((candidate) => (
                  <li key={candidate} className="inline-block relative -ms-3">
                    <a href="">
                      <img
                        src={candidate}
                        className="size-10 rounded-full shadow-md dark:shadow-gray-700 border-4 border-white relative hover:z-10 hover:scale-105 transition-all duration-500"
                        alt=""
                      />
                    </a>
                  </li>
                ))}

                <li className="inline-block relative -ms-3">
                  <Link
                    to="/worker/auth/login"
                    className="p-2 btn btn-icon table-cell rounded-full bg-emerald-500 hover:bg-emerald-600 border-emerald-600 hover:border-emerald-700 text-white z-0 hover:z-10 hover:scale-105"
                  >
                    <FaPlus />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="parallax absolute -start-5 -bottom-16 z-20">
            <img
              src="https://shreethemes.in/jobstack/layouts/assets/images/about/ab04.jpg"
              className="w-[220px] border-8 border-white rounded-xl"
              alt=""
            />

            <div className="parallax absolute flex justify-between items-center -top-6 md:-start-10 start-2 p-4 rounded-lg shadow-md dark:shadow-gray-800 bg-white w-max">
              <FaRegBell className="text-amber-500" size={24} />
              <p className="text-lg font-semibold mb-0 ms-2">Job Alert</p>
            </div>
          </div>

          <div className="absolute bottom-1/2 translate-y-1/2 start-1/2 -translate-x-1/2 z-10 ">
            <div className="overflow-hidden h-[500px] w-[500px] bg-gradient-to-tl to-emerald-600/5 via-emerald-600/50 from-emerald-600 rounded-full"></div>
          </div>
        </div>
      </div>
    </>
  );
};

const HeroSection = () => {
  const [filter, setFilter] = useState({
    name: "",
  });
  return (
    <>
      <section
        className="pt-24 justify-center items-center flex relative overflow-hidden pb-32 background-effect"
        id="home"
      >
        <div className="relative mx-container">
          <div className="grid md:grid-cols-12 grid-cols-1 items-center gap-[30px]">
            <div className="lg:col-span-7 md:col-span-6 mt-14 md:mt-0">
              <div className="lg:me-12 text-primary/80">
                <motion.div
                  className="lg:leading-normal leading-normal text-5xl lg:text-5xl mb-7 font-bold w-[600px]"
                  initial={{ opacity: 0, x: -75, y: -100 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                >
                  Find the
                  <span className="parallax1 ml-10 before:block before:absolute shadow-2xl p-2 px-4 rounded-lg bg-emerald-600 relative inline-block">
                    <motion.div
                      className="text-secondary font-bold"
                      initial={{ opacity: 0, y: 75 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 2, ease: "easeInOut" }}
                    >
                      Best Job
                    </motion.div>
                  </span>{" "}
                  <br />
                  Offers for you.
                </motion.div>

                <motion.p
                  className="text-slate-600 text-lg tracking-wide font-light leading-normal dark:text-zinc-400"
                  initial={{ opacity: 0, x: 75 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                >
                  Find Jobs, Employment & Career Opportunities. Some of the
                  companies we've helped recruit excellent applicants over the
                  years.
                </motion.p>

                <motion.form
                  method="get"
                  action="/jobs"
                  className="w-full mt-8"
                  initial={{ opacity: 0, x: 275 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                  }}
                >
                  <div className="flex gap-3">
                    <SearchBox
                      widthClass="flex-grow"
                      className="py-4"
                      placeholder={"Search for job"}
                      name="name"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setFilter({ ...filter, name: e.target.value })
                      }
                      value={filter.name}
                    />

                    <input
                      type="submit"
                      className="shake px-16 font-bold rounded-md bg-emerald-600 hover:bg-emerald-700 text-white text-lg cursor-pointer"
                      value={"Search"}
                    />
                  </div>
                </motion.form>
              </div>
            </div>
            <Temp />
          </div>
        </div>
        <div></div>
      </section>
      <ScrollHorizontal />
    </>
  );
};

const companies = [
  {
    name: "Shree",
    logo: "https://shreethemes.in/jobstack/layouts/assets/images/company/shree-logo.png",
  },
  {
    name: "Skype",
    logo: "https://shreethemes.in/jobstack/layouts/assets/images/company/skype.png",
  },
  {
    name: "Snapchat",
    logo: "https://shreethemes.in/jobstack/layouts/assets/images/company/snapchat.png",
  },
  {
    name: "Spotify",
    logo: "https://shreethemes.in/jobstack/layouts/assets/images/company/spotify.png",
  },
  {
    name: "Telegram",
    logo: "https://shreethemes.in/jobstack/layouts/assets/images/company/telegram.png",
  },
  {
    name: "Whatsapp",
    logo: "https://shreethemes.in/jobstack/layouts/assets/images/company/whatsapp.png",
  },
  {
    name: "Android",
    logo: "https://shreethemes.in/jobstack/layouts/assets/images/company/android.png",
  },
  {
    name: "Facebook",
    logo: "https://shreethemes.in/jobstack/layouts/assets/images/company/facebook-logo.png",
  },
  {
    name: "Linkedin",
    logo: "https://shreethemes.in/jobstack/layouts/assets/images/company/linkedin.png",
  },
  {
    name: "Google",
    logo: "https://shreethemes.in/jobstack/layouts/assets/images/company/google-logo.png",
  },
  {
    name: "TikTok",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbsQTr2VzqTR5nA0rQEfE1Mszgd7JRVcgvYQ&s",
  },
  {
    name: "Adobe",
    logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAkFBMVEXsICf////rABD3rrDrAADsHSTsGSH+7+/sGyLsFR7rDxnrAAzrABH+9fX3sbPrBxT/+vrwYGTzh4rsJCzxcnX84+T97O3yeXz71tf4u7zzgoX60NH3qav0lJbtLzX6x8juO0H1nJ70jpD83t/6ycrwXWHvT1TuSEztNzzwaGvvT1PvVVrwX2P4wMLydHf1oaNR6dZ3AAAEUUlEQVR4nO2ceVPiQBDFHcyEXECUU0EF8T7W7//ttqhdVgcyLwlYNd3u+/27Kat7J+nX13ByQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCPkPGXS8ZKFt+xbyxamP/uVPcDF+MH56Jza0fceTXwAPzQ84RDsskYfjKLSBRzO4Qg4a85qGtvBYsjH28E77IaZn2EFjlkloG48jv6nzcJGHtvEokus6B01vqFowBqtaD825asGIuvUerovQVh5BOqp30JgzxYIRzZt4ONcrGPFjEweNeVIrGPmimYenWgXDDhvEmQ1qBSO7bOagMbeD0LYeRjRr6uFapyQ2jTMbnlUKRgRLX5e5xlhTU/ruoFEw6kpfl77CQ6wrfV1Kq04w0uc2DmoUjPrS12WszcNk2c5BY0bKBKNomJJ+Mu+EtrkdUa+th+YxDm10G7JpaweVCUa0bu+hGSgSjPj1AAfNlaJwmvcP8XCi5zVNrtvHmQ0jNUXU4BYcFCga9VQYHZCSLlA296JEMFIUZx7zif8ftQhGBFLSeQ6rKh1DbziNGWUWhSEdglF8+D2YFFhKuhra3zYDH9rmjGCHSoNgwJS02Hxn0Z3/gZmCQ+yAacyfWJneg/8D+ZsL8B38WyBFQC8vxAsGiiPbIhe9yOW18L6iHYAj3DYqbAxGNivhgpGd+20fZ1s9L1b+p6QLBvrEPuU8eQL9cNmCgRaEyuQzJUMzjbXoQ8zf/ZZ/TavjF/9zogUjWYK3z1nvQjsMF4IPEUUQd+MCNf1LuatuNgUp6c4QFIUkuYKBFoTGOxESyUo3llomoo9rd7Zkh6BMnAoVDDSN2V9Z74DJhlTBQCnp/hYpjLsyBQO+dxVz+gho57vIQ0Sxo2qbG7XkZAoGGtw/VDVC0UbRh8BpYvrmt3ddaS8Sl67AVTeUknpuxqCelbzLNHbot3biWSVBzeG1uG4G6pKuPJvccEYlTjByf2Oi9K50IQW9ESYY2S+/rf5qCDbmhK26ocgPTEXNYVmXadA1SnR3CzWHZe1Gow/qDYUMVCZKukyDUtJZtIOT3qBd8LWgQhilpL2uS8/ZfbIJaA4LukyD3rU93NsVSEfl3L6Eg/s9usnXCALLRDEzDFTpVeD2KFBzWMplmuSplYNm5iRxSGhKIZsLHfApVeLuWaJkQcZutE1AEVSJuzYDe5AiPDxgl7RwXj60QyTiMk2n8fWmf7jZClqDk7Ab3eZ60xb3tyLgDpGAlhT+ZQ8PbraSn/qfDL/qZuMDHDTvjt3wNUhDC0a7601bdvqhqEwMvuqGdkkB7gANlYmTwB42u3FfYXfmvHwodQ88iMob3bivwBU6pKmzoIcINw4g7oqeTUGZeB9S9dPnvveHvDB9V+eyqfcP9adB85rU/1tsmN0mceZ/VELiRgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCPlWfgMxXDz6FolmVgAAAABJRU5ErkJggg==",
  },
];

const positions = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "UI/UX Designer",
  "Project Manager",
  "QA Engineer",
  "Software Engineer",
  "Data Analyst",
  "Technical Writer",
  "Marketing Specialist",
  "Business Analyst",
  "Sales Representative",
];

export const ScrollHorizontal = () => {
  return (
    <div className="flex justify-center">
      <div className="w-full pl-4 pb-8 overflow-x-hidden font-semibold">
        <div className="inline-block w-max dark:text-primary-foreground">
          <div className="inline-block rtl">
            {companies.map((company) => (
              <span
                key={company.logo}
                className="inline-block gap-4 items-center border border-black rounded-md px-6 py-2 mr-4 dark:bg-black dark:text-white"
              >
                <div className="flex gap-4 items-center">
                  <img
                    src={company.logo}
                    className="aspect-square w-6 object-contain object-center"
                    alt=""
                  />
                  {company.name}
                </div>
              </span>
            ))}
          </div>
          <div className="inline-block rtl">
            {companies.map((company) => (
              <span
                key={company.logo + "a"}
                className="inline-block gap-4 items-center border border-black rounded-md px-6 py-2 mr-4 dark:bg-black dark:text-white"
              >
                <div className="flex gap-4 items-center">
                  <img
                    src={company.logo}
                    className="aspect-square w-6 object-contain object-center"
                    alt=""
                  />
                  {company.name}
                </div>
              </span>
            ))}
          </div>
        </div>
        <div className="inline-block w-max dark:text-primary-foreground mt-6">
          <div className="inline-block ltr">
            {companies.map((company) => (
              <span
                key={company.logo + "b"}
                className="inline-block gap-4 items-center border border-black rounded-md px-6 py-2 mr-4 dark:bg-black dark:text-white"
              >
                <div className="flex gap-4 items-center">
                  <img
                    src={company.logo}
                    className="aspect-square w-6 object-contain object-center"
                    alt=""
                  />
                  {company.name}
                </div>
              </span>
            ))}
          </div>
          <div className="inline-block ltr">
            {companies.map((company) => (
              <span
                key={company.logo + "c"}
                className="inline-block gap-4 items-center border border-black rounded-md px-6 py-2 mr-4 dark:bg-black dark:text-white"
              >
                <div className="flex gap-4 items-center">
                  <img
                    src={company.logo}
                    className="aspect-square w-6 object-contain object-center"
                    alt=""
                  />
                  {company.name}
                </div>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

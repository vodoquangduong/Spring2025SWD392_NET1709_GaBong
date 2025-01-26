import loginHeroImg from "../../../assets/img/login_hero.avif";

const LoginHero = () => {
  return (
    <div
      className="hidden lg:block w-1/2 bg-cover bg-center"
      style={{
        backgroundImage: `url(${loginHeroImg})`,
      }}
    >
      <div className="w-full h-full bg-gradient-to-t from-black/60 to-black/30 backdrop-blur-[2px] p-12 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Work From Anywhere
          </h2>
          <p className="text-lg text-gray-200">
            Join our platform and start your freelancing journey
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginHero;

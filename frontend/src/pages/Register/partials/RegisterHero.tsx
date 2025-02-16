import register_hero from "../../../assets/img/register_hero.avif";
const RegisterHero = () => {
  return (
    <div
      className="hidden lg:block w-1/2 bg-cover bg-center"
      style={{
        backgroundImage: `url('${register_hero}')`,
      }}
    >
      <div className="w-full h-full bg-gradient-to-t from-black/60 to-black/30 backdrop-blur-[2px] p-12 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Join Our Platform
          </h2>
          <p className="text-lg text-gray-200">
            Connect with clients and freelancers worldwide
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterHero;

import Category from "./partials/Category";
import HeroSection from "./partials/HeroSection";
import MakeItReal from "./partials/MakeItReal";
import Power from "./partials/Power";
import Showcase from "./partials/Showcase";
import { items1, items2, items3 } from "./partials/showcaseItems";
import TapInto from "./partials/TapInto";

export default function Home() {
  return (
    <div className="hero">
      <HeroSection />
      <MakeItReal />
      <Showcase items={items1} />
      <TapInto />
      <Showcase items={items2} swap />
      <Category />
      <Showcase items={items3} />
      <Power />
    </div>
  );
}

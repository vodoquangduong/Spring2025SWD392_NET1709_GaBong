import { Switch } from "antd";
import { LuMoonStar, LuSunMedium } from "react-icons/lu";
import useConfigStore from "../stores/configStore";

export default function ToggleTheme() {
  const { isDarkMode, switchTheme } = useConfigStore();

  return (
    <Switch
      defaultChecked={isDarkMode}
      checkedChildren={
        <LuMoonStar size={12} className="anticon anticon-check" />
      }
      unCheckedChildren={
        <LuSunMedium size={12} className="anticon anticon-close" />
      }
      className="flex justify-center items-center z-20 fixed top-64 -right-0 -rotate-90 bg-zinc-700 !hover:bg-zinc-400"
      onClick={() => {
        switchTheme();
      }}
    />
  );
}

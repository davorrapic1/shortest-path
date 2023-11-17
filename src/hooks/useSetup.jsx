import { useContext } from "react";
import { SetupContext } from "../setup/Setup";

const useSetup = () => {
  const { settings, setSettings } = useContext(SetupContext);

  if (settings === undefined) {
    throw new Error("Settings not loaded");
  }

  return { settings, setSettings };
};

export default useSetup;

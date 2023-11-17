import { createContext, useState, useEffect } from "react";

function generateRandomCoordinate(rowNumber, columnNumber) {
  const x = Math.floor(Math.random() * rowNumber);
  const y = Math.floor(Math.random() * columnNumber);
  return { x, y };
}

const defaultSettings = {
  defaultTarget: { x: 0, y: 0 },
  defaultStart: { x: 0, y: 0 },
  rowNumber: 30,
  columnNumber: 30,
};

const SetupContext = createContext({
  settings: defaultSettings,
  setSettings: () => {},
});

const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(defaultSettings);

  useEffect(() => {
    setSettings((prev) => {
      return {
        ...prev,
        defaultStart: generateRandomCoordinate(
          prev.rowNumber,
          prev.columnNumber
        ),
        defaultTarget: generateRandomCoordinate(
          prev.rowNumber,
          prev.columnNumber
        ),
      };
    });
  }, []);
  return (
    <SetupContext.Provider value={{ settings, setSettings }}>
      {children}
    </SetupContext.Provider>
  );
};

export { SettingsProvider, SetupContext };

import { useEffect, useState } from "react";
import "./App.css";

import "@mantine/core/styles.css";

import { colorsTuple, createTheme, MantineProvider } from "@mantine/core";
import { AppTabs } from "./components/AppTabs";
import { GrandPrix } from "./types/GrandPrix";

const SESSIONS_STORAGE_KEY = "sessions";
const theme = createTheme({
  fontFamily: "Rajdhani, sans-serif",
  colors: {
    "f1red": colorsTuple("#E00400"),
    "black": colorsTuple("#15151E")
  },
});

const App: React.FC = () => {
  const [ grandPrix, setGrandPrix ] = useState<GrandPrix[]>([]);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    let storageKey = `${SESSIONS_STORAGE_KEY}_${currentYear}`;

    const fetchData = async () => {
      let response = await fetch(`https://api.jolpi.ca/ergast/f1/${currentYear}/races`);
      if (!response.ok) {
        response = await fetch(`https://api.jolpi.ca/ergast/f1/${currentYear - 1}/races`);
        storageKey = `${SESSIONS_STORAGE_KEY}_${currentYear - 1}`;
      }
      const result = await response.json();
      localStorage.setItem(storageKey, JSON.stringify(result.MRData.RaceTable.Races));

      setGrandPrix(result.MRData.RaceTable.Races);
    };

    const cachedData = localStorage.getItem(storageKey);
    if (cachedData) {
      setGrandPrix(JSON.parse(cachedData));

      return;
    }
    fetchData();
  }, [ ]);

  return (
    <>
      <MantineProvider defaultColorScheme="dark" theme={theme}>
        <AppTabs grandPrix={grandPrix}/>
      </MantineProvider>
    </>
  );
};

export default App;

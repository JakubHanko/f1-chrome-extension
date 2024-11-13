import { useEffect, useState } from "react";
import "./App.css";

import "@mantine/core/styles.css";

import { AppShell, colorsTuple, createTheme, MantineProvider } from "@mantine/core";
import { CardsCarousel } from "./components/CardsCarousel";
import { NavBar } from "./components/NavBar";
import { GrandPrix } from "./types/GrandPrix";

const SESSIONS_STORAGE_KEY = "sessions";
const theme = createTheme({
  fontFamily: "Rajdhani, sans-serif",
  colors: {
    "red": colorsTuple("#E00400"),
    "black": colorsTuple("#15151E")
  },
});

// TODO: navbar at the top - calendars, standings, ...
const App: React.FC = () => {
  const [ grandPrix, setGrandPrix ] = useState<GrandPrix[]>([]);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const storageKey = `${SESSIONS_STORAGE_KEY}_${currentYear}`;

    const fetchData = async () => {
      const response = await fetch(`https://api.jolpi.ca/ergast/f1/${currentYear}/races`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      localStorage.setItem(storageKey, JSON.stringify(result.MRData.RaceTable.Races));

      setGrandPrix(result);
    };

    const cachedData = localStorage.getItem(storageKey);
    if (cachedData) {
      setGrandPrix(JSON.parse(cachedData));

      return;
    }
    fetchData(); // Call the async function
  }, [ ]);

  const currentTime = new Date();
  const nextGpIndex = grandPrix.findIndex((gp) => new Date(gp.date).getTime() > currentTime.getTime());

  return (
    <>
      <MantineProvider defaultColorScheme="dark" theme={theme}>
        <AppShell
          header={{ height: 60 }}
          padding="md"
        >
          <NavBar/>
          <AppShell.Main>
            <CardsCarousel data={grandPrix} initialSlide={nextGpIndex}></CardsCarousel>
          </AppShell.Main>
        </AppShell>
      </MantineProvider>
    </>
  );
};

export default App;

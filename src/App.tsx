import { useEffect, useState } from "react";
import "./App.css";

import "@mantine/core/styles.css";

import { AppShell, Center, colorsTuple, createTheme, Loader, MantineProvider } from "@mantine/core";
import { CircuitCarousel } from "./components/CircuitCarousel";
import { NavBar } from "./components/NavBar";
import { GrandPrix } from "./types/GrandPrix";

const SESSIONS_STORAGE_KEY = "sessions";
const theme = createTheme({
  fontFamily: "Rajdhani, sans-serif",
  colors: {
    "f1-red": colorsTuple("#E00400"),
    "black": colorsTuple("#15151E")
  },
});

// TODO: navbar at the top - calendars, standings, ...
const App: React.FC = () => {
  const [ grandPrix, setGrandPrix ] = useState<GrandPrix[]>([]);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    setLoading(true);
    const currentYear = new Date().getFullYear();
    const storageKey = `${SESSIONS_STORAGE_KEY}_${currentYear}`;

    const fetchData = async () => {
      let response = await fetch(`https://api.jolpi.ca/ergast/f1/${currentYear}/races`);
      if (!response.ok) {
        response = await fetch(`https://api.jolpi.ca/ergast/f1/${currentYear - 1}/races`);
      }
      const result = await response.json();
      localStorage.setItem(storageKey, JSON.stringify(result.MRData.RaceTable.Races));

      setGrandPrix(result.MRData.RaceTable.Races);
      setLoading(false);
    };

    const cachedData = localStorage.getItem(storageKey);
    if (cachedData) {
      setGrandPrix(JSON.parse(cachedData));
      setLoading(false);

      return;
    }
    fetchData();
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
          {!loading && <NavBar nextGp={grandPrix[nextGpIndex]}/>}
          <AppShell.Main>
            {loading
              ? <Center style={{ height: "60vh" }}><Loader size="xl" color="red" type="dots"/></Center>
              : <CircuitCarousel data={grandPrix} initialSlide={nextGpIndex}/>
            }
          </AppShell.Main>
        </AppShell>
      </MantineProvider>
    </>
  );
};

export default App;

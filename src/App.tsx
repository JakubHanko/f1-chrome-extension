import { useEffect, useState } from "react";
import "./App.css";

import "@mantine/core/styles.css";

import { createTheme, MantineProvider } from "@mantine/core";
import { CardsCarousel } from "./components/CardsCarousel";
import { GrandPrix } from "./types/GrandPrix";

const SESSIONS_STORAGE_KEY = "sessions";
const theme = createTheme({
  fontFamily: "Montserrat, sans-serif",
  defaultRadius: "md",
});

const App: React.FC = () => {
  const [ grandPrix, setGrandPrix ] = useState<GrandPrix[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://api.jolpi.ca/ergast/f1/2024/races"); // TODO: more seasons
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      localStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(result.MRData.RaceTable.Races));

      setGrandPrix(result);
    };

    const cachedData = localStorage.getItem(SESSIONS_STORAGE_KEY);
    if (cachedData) {
      setGrandPrix(JSON.parse(cachedData));

      return;
    }
    fetchData(); // Call the async function
  }, [ ]);

  const currentTime = new Date();
  const nextGpIndex = grandPrix.findIndex((gp) => new Date(gp.date).getTime() > currentTime.getTime());

  console.log(grandPrix);

  return (
    <>
      <MantineProvider theme={theme} defaultColorScheme="dark">
        <CardsCarousel data={grandPrix} initialSlide={nextGpIndex}></CardsCarousel>
      </MantineProvider>
    </>
  );
};

export default App;

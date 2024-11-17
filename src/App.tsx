import { useEffect, useState } from "react";
import "./App.css";

import "@mantine/core/styles.css";

import { colorsTuple, createTheme, MantineProvider } from "@mantine/core";
import { AppTabs } from "./components/AppTabs";
import { GrandPrix } from "./types/GrandPrix";
import { fetchData } from "./utils/api";

const theme = createTheme({
  fontFamily: "Rajdhani, sans-serif",
  colors: {
    f1red: colorsTuple("#E00400"),
    black: colorsTuple("#15151E")
  }
});

const App: React.FC = () => {
  const [grandPrix, setGrandPrix] = useState<GrandPrix[]>([]);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    fetchData<GrandPrix>({
      year: currentYear,
      endpoint: "races"
    }).then((data) => setGrandPrix(data));
  }, []);

  return (
    <>
      <MantineProvider
        defaultColorScheme="dark"
        theme={theme}
      >
        <AppTabs grandPrix={grandPrix} />
      </MantineProvider>
    </>
  );
};

export default App;

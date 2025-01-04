import { Box, colorsTuple, createTheme, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { Route, Routes } from "react-router-dom";
import { AppTabs } from "./components/AppTabs";
import ConstructorStats from "./components/ConstructorStats";
import DriverStats from "./components/DriverStats";

const theme = createTheme({
  fontFamily: "Rajdhani, sans-serif",
  colors: {
    f1red: colorsTuple("#E00400"),
    black: colorsTuple("#15151E")
  }
});

const App: React.FC = () => {
  return (
    <>
      <MantineProvider
        defaultColorScheme={"dark"}
        theme={theme}
      >
        <Box
          style={{
            width: "460px",
            height: "400px",
            background: "radial-gradient(circle, #5c0a0a 0%, #1a0000 80%)",
            backdropFilter: "blur(5px)",
            border:
              "calc(0.0625rem * var(--mantine-scale)) solid var(--mantine-color-dark-4)",
            borderRadius: "8px"
          }}
        >
          <Routes>
            <Route
              element={<AppTabs />}
              index
            />
            <Route
              element={<AppTabs />}
              path={"/:tabValue/*"}
            />
            <Route
              element={<DriverStats />}
              path={"driverstats/:id"}
            />
            <Route
              element={<ConstructorStats />}
              path={"constructorstats/:id"}
            />
          </Routes>
        </Box>
      </MantineProvider>
    </>
  );
};

export default App;

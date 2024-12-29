import { SegmentedControl } from "@mantine/core";
import { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { ConstructorStanding } from "../types/ConstructorStanding";
import { DriverStanding } from "../types/DriverStanding";
import { Endpoint } from "../types/Endpoint";
import { fetchData } from "../utils/api";
import { StandingsTable } from "./StandingsTable";

type Options = "Drivers" | "Constructors";

export const Standings = (): JSX.Element => {
  const options: Options[] = ["Drivers", "Constructors"];
  const [driverData, setDriverData] = useState<DriverStanding[]>([]);
  const [constructorData, setConstructorData] = useState<ConstructorStanding[]>(
    []
  );

  useEffect(() => {
    fetchData<DriverStanding>({
      endpoint: Endpoint.DriverStandings
    })
      .then((data) => setDriverData(data))
      .catch((error) => console.error(error));

    fetchData<ConstructorStanding>({
      endpoint: Endpoint.ConstructorStandings
    })
      .then((data) => setConstructorData(data))
      .catch((error) => console.error(error));
  }, []);

  const navigate = useNavigate();

  const location = useLocation();
  const value = location.pathname.includes("constructors")
    ? "Constructors"
    : "Drivers";

  return (
    <>
      <SegmentedControl
        data={options}
        value={value}
        onChange={(option) => navigate(`/standings/${option.toLowerCase()}`)}
        color="f1red"
        styles={{
          root: {
            width: "100%",
            height: "100%",
            border:
              "calc(0.0625rem * var(--mantine-scale)) solid var(--mantine-color-dark-4)"
          }
        }}
      />
      <Routes>
        <Route
          index
          element={
            <StandingsTable
              header={["Pos", "Driver", "Car", "Pts"]}
              data={driverData}
            />
          }
        />
        <Route
          path="drivers"
          element={
            <StandingsTable
              header={["Pos", "Driver", "Car", "Pts"]}
              data={driverData}
            />
          }
        />
        <Route
          path="constructors"
          element={
            <StandingsTable
              header={["Pos", "Team", "Pts"]}
              data={constructorData}
            />
          }
        />
      </Routes>
    </>
  );
};

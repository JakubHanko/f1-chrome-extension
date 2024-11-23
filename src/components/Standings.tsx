import { SegmentedControl } from "@mantine/core";
import { useEffect, useState } from "react";
import { ConstructorStanding } from "../types/ConstructorStanding";
import { DriverStanding } from "../types/DriverStanding";
import { Endpoint } from "../types/Endpoint";
import { fetchData } from "../utils/api";
import { StandingsTable } from "./StandingsTable";

type Options = "Drivers" | "Constructors";

export const Standings = (): JSX.Element => {
  const [option, setOption] = useState("Drivers");
  const options: Options[] = ["Drivers", "Constructors"];
  const [driverData, setDriverData] = useState<DriverStanding[]>([]);
  const [constructorData, setConstructorData] = useState<ConstructorStanding[]>(
    []
  );

  useEffect(() => {
    const currentYear = new Date().getFullYear();

    fetchData<DriverStanding>({
      year: currentYear,
      endpoint: Endpoint.DriverStandings
    }).then((data) => setDriverData(data));

    fetchData<ConstructorStanding>({
      year: currentYear,
      endpoint: Endpoint.ConstructorStandings
    }).then((data) => setConstructorData(data));
  }, []);

  return (
    <>
      <SegmentedControl
        data={options}
        onChange={setOption}
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
      {option === "Drivers" ? (
        <StandingsTable
          header={["Pos", "Driver", "Car", "Pts"]}
          data={driverData}
        />
      ) : (
        <StandingsTable
          header={["Pos", "Team", "Pts"]}
          data={constructorData}
        />
      )}
    </>
  );
};

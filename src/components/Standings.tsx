import { SegmentedControl } from "@mantine/core";
import { useState } from "react";
import { StandingsTable } from "./StandingsTable";

type Options = "Drivers" | "Constructors";

export const Standings = () => {
  const currentYear = new Date().getFullYear();
  const [ option, setOption ] = useState("Drivers");
  const options: Options[] = [ "Drivers", "Constructors" ];

  // TODO: move the API communication to here
  return (
    <>
      <SegmentedControl
        data={options}
        onChange={setOption}
        color="f1red"
      />
      {
        option === "Drivers"
          ? <StandingsTable
            header={[ "Pos", "Driver", "Car", "Pts" ]}
            year={currentYear}
            endpoint="driverstandings"
          />
          : <StandingsTable
            header={[ "Pos", "Team", "Pts" ]}
            year={currentYear}
            endpoint="constructorstandings"
          />
      }
    </>
  );
};

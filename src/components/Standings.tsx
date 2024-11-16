import { StandingsTable } from "./StandingsTable";

export const Standings = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <StandingsTable
        header={[ "Pos", "Driver", "Car", "Pts" ]}
        year={currentYear}
        endpoint="driverstandings"
      />
      {/* Pos, Team, Pts */}
    </>
  );
};

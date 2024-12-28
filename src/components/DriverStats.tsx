import { Button } from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";

const driverStatistics = {
  1: { name: "Max Verstappen", wins: 15, podiums: 20, fastestLaps: 8 },
  2: { name: "Lando Norris", wins: 3, podiums: 10, fastestLaps: 5 }
};

const DriverStats: React.FC = () => {
  // const { id } = useParams<{ id: string }>();
  const driver = driverStatistics[1];
  const navigate = useNavigate();

  return (
    <div>
      <h1>{driver.name}</h1>
      <p>Wins: {driver.wins}</p>
      <p>Podiums: {driver.podiums}</p>
      <p>Fastest Laps: {driver.fastestLaps}</p>
      <Button
        variant="outline"
        onClick={() => navigate(-1)}
        style={{ marginTop: "20px" }}
      >
        Go Back
      </Button>
    </div>
  );
};

export default DriverStats;

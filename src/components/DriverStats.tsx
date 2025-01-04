import { Table } from "@mantine/core";
import { IconStopwatch } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Driver, getDriverName } from "../types/Driver";
import { Endpoint } from "../types/Endpoint";
import { FlagUsage } from "../types/FlagUsage";
import { getTime, Race } from "../types/RaceResult";
import { fetchData } from "../utils/api";
import { Flag } from "./Flag";
import { StatsTable } from "./StatsTable";

const getDriver = (races: Race[]): Driver => races[0].Results[0].Driver;

const DriverStats: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [stats, setStats] = useState<Race[]>([]);

  if (!id) {
    throw new Error("No driver ID provided");
  }

  useEffect(() => {
    fetchData<Race>({
      endpoint: Endpoint.Results,
      filter: ["drivers", id]
    })
      .then((data) => setStats(data))
      .catch((error) => console.error(error));
  }, [id]);

  return (
    <>
      <StatsTable
        header={["Round", "GP", "Pos", "Time", "Pts", "Fastest Lap"]}
        titleCallback={() => getDriverName(getDriver(stats))}
        races={stats}
        rowMapper={(result) => (
          <Table.Tr key={result.round}>
            <Table.Td>{result.round}</Table.Td>
            <Table.Td>
              <Flag
                location={result.Circuit.Location}
                usage={FlagUsage.STATS}
              />
            </Table.Td>
            {...result.Results.map((result) => (
              <>
                <Table.Td>{result.position}</Table.Td>
                <Table.Td>{getTime(result)}</Table.Td>
                <Table.Td>{result.points}</Table.Td>
                <Table.Td>
                  {result.FastestLap ? result.FastestLap.Time.time : "-"}
                  {result.FastestLap?.rank === "1" && (
                    <IconStopwatch style={{ verticalAlign: "middle" }} />
                  )}
                </Table.Td>
              </>
            ))}
          </Table.Tr>
        )}
      />
    </>
  );
};

export default DriverStats;

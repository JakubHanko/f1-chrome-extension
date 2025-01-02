import { Box, Button, Table, Text, Title } from "@mantine/core";
import { IconArrowLeft, IconStopwatch } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDriverName } from "../types/Driver";
import { Endpoint } from "../types/Endpoint";
import { FlagUsage } from "../types/FlagUsage";
import { RaceResult } from "../types/RaceResult";
import { fetchData } from "../utils/api";
import { Flag } from "./Flag";

const getFastestLapsCount = (results: RaceResult[]): number =>
  results.filter((result) => result.FastestLap?.rank === "1").length;

const getWinsCount = (results: RaceResult[]): number =>
  results.filter((result) => result.position === "1").length;

const getPodiumsCount = (results: RaceResult[]): number =>
  results.filter((result) => ["1", "2", "3"].includes(result.position)).length;

const getTime = (result: RaceResult): string => {
  if (result.status === "Disqualified") {
    return "DSQ";
  }
  if (!result.Time) {
    return "DNF";
  }

  return result.Time.time;
};

const DriverStats: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [stats, setStats] = useState<RaceResult[]>([]);
  const navigate = useNavigate();

  if (!id) {
    throw new Error("No driver ID provided");
  }

  useEffect(() => {
    fetchData<RaceResult>({
      endpoint: Endpoint.Results,
      filter: ["drivers", id]
    })
      .then((data) => setStats(data))
      .catch((error) => console.error(error));
  }, [id]);

  return (
    <>
      {stats.length > 0 && (
        <Box
          p="xl"
          bg="transparent"
        >
          <Button
            leftSection={<IconArrowLeft />}
            onClick={() => navigate(-1)}
            size="sm"
            bg="transparent"
          >
            Go Back
          </Button>
          <Title order={1}>{getDriverName(stats[0].Driver)}</Title>
          <Text>
            Wins: {getWinsCount(stats)} &middot; Podiums:{" "}
            {getPodiumsCount(stats)} &middot; Fastest Laps:{" "}
            {getFastestLapsCount(stats)}
          </Text>
          <Table.ScrollContainer
            minWidth={350}
            h={250}
            p="sm"
          >
            <Table
              striped
              withTableBorder
              withColumnBorders
              highlightOnHover
              ta={"center"}
            >
              <Table.Thead>
                <Table.Tr tt={"uppercase"}>
                  <Table.Th>Round</Table.Th>
                  <Table.Th>GP</Table.Th>
                  <Table.Th>Pos</Table.Th>
                  <Table.Th>Time</Table.Th>
                  <Table.Th>Pts</Table.Th>
                  <Table.Th>Fastest Lap</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {...stats.map((result, i) => (
                  <Table.Tr key={i}>
                    <Table.Td>{result.round}</Table.Td>
                    <Table.Td>
                      <Flag
                        location={result.circuit.Location}
                        usage={FlagUsage.STATS}
                      />
                    </Table.Td>
                    <Table.Td>{result.position}</Table.Td>
                    <Table.Td>{getTime(result)}</Table.Td>
                    <Table.Td>{result.points}</Table.Td>
                    <Table.Td>
                      {result.FastestLap ? result.FastestLap.Time.time : "-"}
                      {result.FastestLap?.rank === "1" && <IconStopwatch />}
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Table.ScrollContainer>
        </Box>
      )}
    </>
  );
};

export default DriverStats;

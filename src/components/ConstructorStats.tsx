import { Stack, Table, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Endpoint } from "../types/Endpoint";
import { FlagUsage } from "../types/FlagUsage";
import { getTime, Race, RaceResult } from "../types/RaceResult";
import { fetchData } from "../utils/api";
import { Flag } from "./Flag";
import { StatsTable } from "./StatsTable";

const getConstructorName = (races: Race[]): string =>
  races[0].Results[0].Constructor.name;

const getStackedCell = (
  data: Race,
  mapper: (data: RaceResult) => string
): JSX.Element => {
  return (
    <Stack gap="xs">
      {data.Results.sort((a, b) => a.Driver.code.localeCompare(b.Driver.code))
        .map(mapper)
        .map((item, index) => (
          <Text key={index}>{item}</Text>
        ))}
    </Stack>
  );
};

const ConstructorStats = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const [stats, setStats] = useState<Race[]>([]);

  if (!id) {
    throw new Error("No constructors ID provided");
  }

  useEffect(() => {
    fetchData<Race>({
      endpoint: Endpoint.Results,
      filter: ["constructors", id]
    })
      .then((data) => setStats(data))
      .catch((error) => console.error(error));
  }, [id]);

  return (
    <>
      <StatsTable
        header={["Round", "GP", "Dri", "Pos", "Time", "Pts"]}
        titleCallback={() => getConstructorName(stats)}
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
            <Table.Td>
              {getStackedCell(result, (result) => result.Driver.code)}
            </Table.Td>
            <Table.Td>
              {getStackedCell(result, (result) => result.position)}
            </Table.Td>
            <Table.Td>
              {getStackedCell(result, (result) => getTime(result))}
            </Table.Td>
            <Table.Td>
              {getStackedCell(result, (result) => result.points)}
            </Table.Td>
          </Table.Tr>
        )}
      />
    </>
  );
};

export default ConstructorStats;

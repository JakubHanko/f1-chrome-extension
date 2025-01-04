import { Box, Button, Table, Title } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { Race } from "../types/RaceResult";
import { CustomLoader } from "./CustomLoader";

type StatsTableProps = {
  header: string[];
  titleCallback: () => string;
  races: Race[];
  rowMapper: (race: Race) => JSX.Element;
};

export const StatsTable = ({
  header,
  titleCallback,
  races,
  rowMapper
}: StatsTableProps): JSX.Element => {
  const navigate = useNavigate();

  return (
    <>
      <Box
        bg={"transparent"}
        p={"sm"}
      >
        <Button
          bg={"transparent"}
          leftSection={<IconArrowLeft />}
          onClick={() => navigate(-1)}
          size={"sm"}
        >
          Go Back
        </Button>
        {!races || races.length === 0 ? (
          <CustomLoader />
        ) : (
          <>
            <Title order={1}>{titleCallback()}</Title>
            <Table.ScrollContainer
              h={300}
              minWidth={350}
              p={"sm"}
            >
              <Table
                highlightOnHover
                striped
                ta={"center"}
                withColumnBorders
                withTableBorder
              >
                <Table.Thead>
                  <Table.Tr tt={"uppercase"}>
                    {header.map((h, i) => (
                      <Table.Th
                        key={i}
                        ta={"center"}
                      >
                        {h}
                      </Table.Th>
                    ))}
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{...races.map(rowMapper)}</Table.Tbody>
              </Table>
            </Table.ScrollContainer>
          </>
        )}
      </Box>
    </>
  );
};

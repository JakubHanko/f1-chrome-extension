import { Table } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { ConstructorStanding } from "../types/ConstructorStanding";
import { DriverStanding } from "../types/DriverStanding";
import { CustomLoader } from "./CustomLoader";

type TableDataType = DriverStanding | ConstructorStanding;

type StandingsTableProps = {
  header: string[];
  data: TableDataType[];
};

export const StandingsTable = ({
  header,
  data
}: StandingsTableProps): JSX.Element => {
  const rowMapper = (row: TableDataType): string[] => {
    if ("Driver" in row) {
      return [
        row.position,
        `${row.Driver.givenName} ${row.Driver.familyName}`,
        row.Constructors[0].name,
        row.points
      ];
    }

    return [row.position, row.Constructor.name, row.points];
  };

  const navigate = useNavigate();

  return (
    <>
      <Table.ScrollContainer
        minWidth={400}
        h={325}
        style={{
          background: "transparent"
        }}
        p="md"
      >
        {!data || data.length === 0 ? (
          <CustomLoader />
        ) : (
          <Table
            striped
            withTableBorder
            highlightOnHover
          >
            <Table.Thead>
              <Table.Tr>
                {...header.map((h, i) => (
                  <Table.Th
                    key={i}
                    tt={"uppercase"}
                  >
                    {h}
                  </Table.Th>
                ))}
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {...data.map((row, i) => (
                <Table.Tr
                  key={i}
                  onClick={() => navigate("/driverstats/1")}
                >
                  {...rowMapper(row).map((col, j) => (
                    <Table.Td key={j}>{col}</Table.Td>
                  ))}
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        )}
      </Table.ScrollContainer>
    </>
  );
};

import { Table } from "@mantine/core";
import { ConstructorStanding } from "../types/ConstructorStanding";
import { DriverStanding } from "../types/DriverStanding";
import { CustomLoader } from "./CustomLoader";

type TableDataType = DriverStanding | ConstructorStanding;

type StandingsTableProps = {
  header: string[];
  data: TableDataType[];
};

export const StandingsTable = ({ header, data }: StandingsTableProps) => {
  const rowMapper = (row: TableDataType): string[] => {
    if ("Driver" in row) {
      return [ row.position, `${row.Driver.givenName} ${row.Driver.familyName}`, row.Constructors[0].name, row.points ];
    }

    return [ row.position, row.Constructor.name, row.points ];
  };

  return (
    <>
      <Table.ScrollContainer
        minWidth={400}
        h={350}
        style={{
          background: "radial-gradient(circle, #5c0a0a 0%, #1a0000 80%)",
          color: "white",
          borderRadius: "0 0 8px 8px",
          border: "calc(0.0625rem * var(--mantine-scale)) solid var(--mantine-color-dark-4)"
        }}
        p="md"
      >
        {
          !data || data.length === 0
            ? <CustomLoader/>
            : <Table
              striped
              withTableBorder
            >
              <Table.Thead>
                <Table.Tr>
            {
              ...header.map((h) => <Table.Th tt={"uppercase"}>{h}</Table.Th>)
            }
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
            {
              ...data.map((row) =>
                <Table.Tr>
                  {
                    ...rowMapper(row).map((col) => <Table.Td>{col}</Table.Td>)
                  }
                </Table.Tr>)
            }
              </Table.Tbody>
            </Table>
        }
      </Table.ScrollContainer>
    </>
  );
};

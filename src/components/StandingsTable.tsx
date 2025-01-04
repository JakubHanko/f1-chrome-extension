import { Table } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { ConstructorStanding } from "../types/ConstructorStanding";
import { getDriverName } from "../types/Driver";
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
        getDriverName(row.Driver),
        row.Constructors[0].name,
        row.points
      ];
    }

    return [row.position, row.Constructor.name, row.points];
  };

  const rowNavigate = (row: TableDataType): (() => void) => {
    if ("Driver" in row) {
      return () => navigate(`/driverstats/${row.Driver.driverId}`);
    }

    return () => navigate(`/constructorstats/${row.Constructor.constructorId}`);
  };

  const navigate = useNavigate();

  return (
    <>
      <Table.ScrollContainer
        h={325}
        minWidth={400}
        p={"md"}
        style={{
          background: "transparent"
        }}
      >
        {!data || data.length === 0 ? (
          <CustomLoader />
        ) : (
          <Table
            highlightOnHover
            striped
            withTableBorder
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
                  onClick={rowNavigate(row)}
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

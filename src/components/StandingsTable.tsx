import { Table } from "@mantine/core";
import { useEffect, useState } from "react";
import { ConstructorStanding } from "../types/ConstructorStanding";
import { DriverStanding } from "../types/DriverStanding";
import { CustomLoader } from "./CustomLoader";

type TableDataType = DriverStanding | ConstructorStanding;

type StandingsTableProps = {
  header: string[];
  year: number;
  endpoint: string;
};

export const StandingsTable = ({ header, year, endpoint }: StandingsTableProps) => {
  const [ data, setData ] = useState<TableDataType[]>([]);

  // TODO make the logic below generic even for sessions
  useEffect(() => {
    let storageKey = `${endpoint}_${year}`;

    const fetchData = async () => {
      let response = await fetch(`https://api.jolpi.ca/ergast/f1/${year}/${endpoint}`);
      if (!response.ok) {
        response = await fetch(`https://api.jolpi.ca/ergast/f1/${year - 1}/${endpoint}`);
        storageKey = `${endpoint}_${year - 1}`;
      }
      const result = await response.json();
      const standingsObject = result.MRData.StandingsTable.StandingsLists[0];
      const standingsKey = Object.keys(standingsObject).find((key) => key.toLowerCase().endsWith("standings")) as string;

      localStorage.setItem(storageKey, JSON.stringify(standingsObject[standingsKey]));

      setData(standingsObject[standingsKey]);
    };

    const cachedData = localStorage.getItem(storageKey);
    if (cachedData) {
      setData(JSON.parse(cachedData));

      return;
    }
    fetchData();
  }, [ endpoint, year ]);

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
          borderRadius: "8px",
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

import { ConstructorStanding } from "../types/ConstructorStanding";
import { DriverStanding } from "../types/DriverStanding";
import { GrandPrix } from "../types/GrandPrix";

type ApiDataProps = {
  year: number;
  endpoint: string;
};

type ApiDataType = GrandPrix | DriverStanding | ConstructorStanding;

const API_BASEPATH = "https://api.jolpi.ca/ergast/f1";

// TODO: errors
export const fetchData = async <T extends ApiDataType>({ year, endpoint }: ApiDataProps): Promise<T[]> => {
  let storageKey = `${endpoint}_${year}`;

  const makeApiCall = async () => {
    let response = await fetch(`${API_BASEPATH}/${year}/${endpoint}`);
    if (!response.ok) {
      response = await fetch(`${API_BASEPATH}/${year - 1}/${endpoint}`);
      storageKey = `${endpoint}_${year - 1}`;
    }
    const result = await response.json();
    if ("RaceTable" in result.MRData) {
      return result.MRData.RaceTable.Races;
    }
    const standingsObject = result.MRData.StandingsTable.StandingsLists[0];
    const standingsKey = Object.keys(standingsObject).find((key) => key.toLowerCase().endsWith("standings")) as string;

    return standingsObject[standingsKey];
  };

  const cachedData = localStorage.getItem(storageKey);
  if (cachedData) {
    return JSON.parse(cachedData);
  }

  const apiData = await makeApiCall();
  localStorage.setItem(storageKey, JSON.stringify(apiData));

  return apiData;
};

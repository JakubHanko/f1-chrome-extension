import { ConstructorStanding } from "../types/ConstructorStanding";
import { DriverStanding } from "../types/DriverStanding";
import { Endpoint } from "../types/Endpoint";
import { GrandPrix } from "../types/GrandPrix";

type ApiDataProps = {
  endpoint: Endpoint;
};

const MINUTE_IN_MS = 60 * 1000;
const HOUR_IN_MS = 60 * MINUTE_IN_MS;

type ApiDataType = GrandPrix | DriverStanding | ConstructorStanding;

const API_BASEPATH = "https://api.jolpi.ca/ergast/f1";

const isCacheExpired = (endpoint: Endpoint): boolean => {
  const lastUpdate = localStorage.getItem(`lastupdate_${endpoint}`);

  if (!lastUpdate) {
    return true;
  }

  if (endpoint === Endpoint.Races) {
    return Date.now() - parseInt(lastUpdate) > 12 * HOUR_IN_MS;
  }

  return Date.now() - parseInt(lastUpdate) > 30 * MINUTE_IN_MS;
};

export const fetchData = async <T extends ApiDataType>({
  endpoint
}: ApiDataProps): Promise<T[]> => {
  const makeApiCall = async (): Promise<T[]> => {
    return fetch(`${API_BASEPATH}/current/${endpoint}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("API request failed");
        }

        return response.json();
      })
      .then((result) => {
        if ("RaceTable" in result.MRData) {
          return result.MRData.RaceTable.Races;
        }
        const standingsObject = result.MRData.StandingsTable.StandingsLists[0];
        const standingsKey = Object.keys(standingsObject).find((key) =>
          key.toLowerCase().endsWith("standings")
        ) as string;

        return standingsObject[standingsKey];
      })
      .catch((error) => {
        console.error("API call failed:", error);
        throw error;
      });
  };

  const cachedData = localStorage.getItem(endpoint);
  if (cachedData && !isCacheExpired(endpoint)) {
    return JSON.parse(cachedData);
  }

  const apiData = await makeApiCall();
  localStorage.setItem(endpoint, JSON.stringify(apiData));
  localStorage.setItem(`lastupdate_${endpoint}`, Date.now().toString());

  return apiData;
};

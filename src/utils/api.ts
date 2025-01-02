import { ConstructorStanding } from "../types/ConstructorStanding";
import { DriverStanding } from "../types/DriverStanding";
import { Endpoint } from "../types/Endpoint";
import { GrandPrix } from "../types/GrandPrix";
import { MRDataResponse } from "../types/MRData";
import { RaceResult, RaceResultResponse } from "../types/RaceResult";

type ApiDataProps = {
  endpoint: Endpoint;
  filter?: string[];
};

const MINUTE_IN_MS = 60 * 1000;
const HOUR_IN_MS = 60 * MINUTE_IN_MS;

type ApiDataType =
  | GrandPrix
  | DriverStanding
  | ConstructorStanding
  | RaceResult;

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
  endpoint,
  filter
}: ApiDataProps): Promise<T[]> => {
  const finalEndpoint = [...(filter ?? []), endpoint].join("/");

  const makeApiCall = async (): Promise<T[]> => {
    return fetch(`${API_BASEPATH}/current/${finalEndpoint}`)
      .then(async (response) => {
        if (
          !response.ok ||
          ((await response.json()) as MRDataResponse).MRData.total === "0"
        ) {
          const year = new Date().getFullYear() - 1;

          return fetch(`${API_BASEPATH}/${year}/${finalEndpoint}`);
        }

        return response;
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Both API requests failed");
        }

        return response.json();
      })
      .then((result) => {
        if (endpoint === Endpoint.Races) {
          return result.MRData.RaceTable.Races;
        } else if (endpoint === Endpoint.Results) {
          return result.MRData.RaceTable.Races.map((r: RaceResultResponse) => ({
            ...r.Results[0],
            circuit: r.Circuit,
            round: r.round
          }));
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

  const cachedData = localStorage.getItem(finalEndpoint);
  if (cachedData && !isCacheExpired(endpoint)) {
    return JSON.parse(cachedData);
  }

  const apiData = await makeApiCall();
  localStorage.setItem(finalEndpoint, JSON.stringify(apiData));
  localStorage.setItem(`lastupdate_${finalEndpoint}`, Date.now().toString());

  return apiData;
};

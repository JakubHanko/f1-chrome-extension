import { Circuit } from "./Circuit";
import { Constructor } from "./Constructor";
import { Driver } from "./Driver";

export interface RaceResult {
  number: string;
  position: string;
  positionText: string;
  points: string;
  Driver: Driver;
  Constructor: Constructor;
  grid: string;
  laps: string;
  status: string;
  Time: {
    millis: string;
    time: string;
  };
  FastestLap: {
    rank: string;
    lap: string;
    Time: {
      time: string;
    };
    AverageSpeed: {
      units: string;
      speed: string;
    };
  };
}

export const getTime = (result: RaceResult): string => {
  if (result.status === "Disqualified") {
    return "DSQ";
  }
  if (!result.Time) {
    return "DNF";
  }

  return result.Time.time;
};

export interface Race {
  Circuit: Circuit;
  round: string;
  Results: RaceResult[];
}

import { Circuit } from "./Circuit";
import { Constructor } from "./Constructor";
import { Driver } from "./Driver";

export interface RaceResult {
  circuit: Circuit;
  round: string;
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

export interface RaceResultResponse {
  Circuit: Circuit;
  round: string;
  Results: RaceResult[];
}

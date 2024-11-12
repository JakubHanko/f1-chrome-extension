import { Circuit } from "./Circuit";
import { Session } from "./Session";

export interface GrandPrix {
  Circuit: Circuit;
  FirstPractice: Session;
  Qualifying: Session;
  SecondPractice?: Session;
  ThirdPractice?: Session;
  Sprint?: Session;
  SprintQualifying?: Session;
  SprintShootout?: Session;
  date: string;
  raceName: string;
  round: string;
  season: string;
  time: string;
  url: string;
}

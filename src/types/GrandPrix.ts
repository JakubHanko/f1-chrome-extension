import { Circuit } from "./Circuit";
import { AnnotatedSession, classifySession, Session } from "./Session";
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

export const getClassifiedSessions = (gp: GrandPrix): AnnotatedSession[] => {
  return (
    [
      ["FP1", "First Practice", gp.FirstPractice],
      ["FP2", "Second Practice", gp.SecondPractice],
      ["FP3", "Third Practice", gp.ThirdPractice],
      ["SQ", "Sprint Qualification", gp.SprintQualifying],
      ["SPR", "Sprint", gp.Sprint],
      ["QUA", "Qualification", gp.Qualifying],
      ["GP", "Grand Prix", { date: gp.date, time: gp.time }]
    ].filter(([_, __, session]) => session !== undefined) as [
      string,
      string,
      Session
    ][]
  ).map(([shortName, longName, session]) => ({
    shortName,
    longName,
    session,
    state: classifySession(session)
  }));
};

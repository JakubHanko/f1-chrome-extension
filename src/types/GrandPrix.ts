import { Circuit } from "./Circuit";
import {
  AnnotatedSession,
  classifySession,
  Session,
  SessionAnnotationType
} from "./Session";
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
      [SessionAnnotationType.FirstPractice, gp.FirstPractice],
      [SessionAnnotationType.SecondPractice, gp.SecondPractice],
      [SessionAnnotationType.ThirdPractice, gp.ThirdPractice],
      [SessionAnnotationType.SprintQualification, gp.SprintQualifying],
      [SessionAnnotationType.Sprint, gp.Sprint],
      [SessionAnnotationType.Qualification, gp.Qualifying],
      [SessionAnnotationType.GrandPrix, { date: gp.date, time: gp.time }]
    ].filter(([_, session]) => session !== undefined) as [
      SessionAnnotationType,
      Session
    ][]
  ).map(([annotation, session]) => ({
    annotation,
    session,
    state: classifySession(session)
  }));
};

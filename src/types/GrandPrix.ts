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
  return ([
    [ "FP1", gp.FirstPractice ],
    [ "FP2", gp.SecondPractice ],
    [ "FP3", gp.ThirdPractice ],
    [ "SQ", gp.SprintQualifying ],
    [ "SPR", gp.Sprint ],
    [ "QUA", gp.Qualifying ],
    [ "GP", { date: gp.date, time: gp.time } ]
  ].filter(([ _, session ]) => session !== undefined) as [string, Session][])
    .map(([ title, session ]) => ({
      title: title,
      session: session,
      state: classifySession(session)
    }));
};

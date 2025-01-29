export interface Session {
  date: string;
  time: string;
}

export enum SessionState {
  PAST,
  NEXT,
  IN_PROGRESS,
  FUTURE
}

export enum SessionAnnotationType {
  FirstPractice,
  SecondPractice,
  ThirdPractice,
  SprintQualification,
  Sprint,
  Qualification,
  GrandPrix
}

export const SessionAnnotations = {
  [SessionAnnotationType.FirstPractice]: {
    shortName: "FP1",
    longName: "First Practice"
  },
  [SessionAnnotationType.SecondPractice]: {
    shortName: "FP2",
    longName: "Second Practice"
  },
  [SessionAnnotationType.ThirdPractice]: {
    shortName: "FP3",
    longName: "Third Practice"
  },
  [SessionAnnotationType.SprintQualification]: {
    shortName: "SQ",
    longName: "Sprint Qualification"
  },
  [SessionAnnotationType.Sprint]: { shortName: "SPR", longName: "Sprint" },
  [SessionAnnotationType.Qualification]: {
    shortName: "QUA",
    longName: "Qualification"
  },
  [SessionAnnotationType.GrandPrix]: { shortName: "GP", longName: "Grand Prix" }
} as const;

export type AnnotatedSession = {
  annotation: SessionAnnotationType;
  session: Session;
  state: SessionState;
};

export const getSessionDate = (session: Session): Date =>
  session.time === undefined
    ? new Date(session.date)
    : new Date(`${session.date}T${session.time}`);

export const classifySession = (session: Session): SessionState =>
  getSessionDate(session) < new Date()
    ? SessionState.PAST
    : SessionState.FUTURE;

const MINUTE_IN_MS = 60 * 1000;
export const getSessionLength = (annotation: SessionAnnotationType): number => {
  switch (annotation) {
    case SessionAnnotationType.Sprint:
    case SessionAnnotationType.SprintQualification:
      return 45 * MINUTE_IN_MS;
    case SessionAnnotationType.FirstPractice:
    case SessionAnnotationType.SecondPractice:
    case SessionAnnotationType.ThirdPractice:
    case SessionAnnotationType.Qualification:
      return 60 * MINUTE_IN_MS;
    case SessionAnnotationType.GrandPrix:
      return 120 * MINUTE_IN_MS;
  }
};

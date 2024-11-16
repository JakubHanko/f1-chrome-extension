export interface Session {
  date: string;
  time: string;
}

export enum SessionState {
  PAST,
  NEXT,
  FUTURE
}

export type AnnotatedSession = {
  shortName: string;
  longName: string;
  session: Session;
  state: SessionState;
};

export const getSessionDate = (session: Session) => new Date(`${session.date}T${session.time}`);
export const classifySession = (session: Session) => getSessionDate(session) < new Date() ? SessionState.PAST : SessionState.FUTURE;

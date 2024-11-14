export interface Session {
  date: string;
  time: string;
}

export enum SessionState {
  PAST,
  NEXT,
  FUTURE
}

export const getSessionDate = (session: Session) => new Date(`${session.date}T${session.time}`);

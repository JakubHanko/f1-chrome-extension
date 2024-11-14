export interface Session {
  date: string;
  time: string;
}

export enum SessionState {
  PAST,
  NEXT,
  FUTURE
}

export const convertToLocalTime = (session: Session) => new Intl.DateTimeFormat("default", {
  weekday: "long",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit"
}).format(getSessionDate(session));

export const getSessionDate = (session: Session) => new Date(`${session.date}T${session.time}`);

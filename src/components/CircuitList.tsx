import { List, ThemeIcon } from "@mantine/core";
import { IconCheck, IconClock, IconFlag } from "@tabler/icons-react";
import { GrandPrix } from "../types/GrandPrix";
import { Session, SessionState, convertToLocalTime, getSessionDate } from "../types/Session";

const Icon = ({ state }: { state: SessionState }) => {
  if (state === SessionState.FUTURE) {
    return  (
      <ThemeIcon color="yellow" size={16} radius="xl">
        <IconClock size={10} />
      </ThemeIcon>
    );
  } else if (state === SessionState.NEXT) {
    return (
      <ThemeIcon color="blue" size={16} radius="xl">
        <IconFlag size={10} />
      </ThemeIcon>
    );
  }

  return (
    <ThemeIcon color="teal" size={16} radius="xl">
      <IconCheck size={10} />
    </ThemeIcon>
  );
};

type ListItemProps = {
  title: string;
  session: Session;
  state: SessionState
};

const ListItem = ({ title, session, state }: ListItemProps) => {
  return (
    <>
      <List.Item icon={<Icon state={state}/>}>
        {title}: {convertToLocalTime(session)}
      </List.Item>
    </>
  );
};

export function CircuitList({ gp, isGpNext }: { gp: GrandPrix, isGpNext: boolean } ) {
  const sessionArray: [string, Session?][] =
    [
      [ "FP1", gp.FirstPractice ],
      [ "FP2", gp.SecondPractice ],
      [ "FP3", gp.ThirdPractice ],
      [ "Sprint Quali", gp.SprintQualifying ],
      [ "Sprint", gp.Sprint ],
      [ "Quali", gp.Qualifying ],
      [ "Race", { date: gp.date, time: gp.time } ]
    ];

  const currentDate = new Date();
  const classifySession = (session: Session) => getSessionDate(session) < currentDate ? SessionState.PAST : SessionState.FUTURE;

  const filteredSessions: [string, Session][] = sessionArray.filter(([ _, session ]) => session !== undefined) as [string, Session][];
  const classifiedSessions = filteredSessions.map(([ title, session ]) => ({
    title: title,
    session: session,
    state: classifySession(session)
  }));

  const nextRaceIndex = classifiedSessions.findIndex(({ state }) => isGpNext && state === SessionState.FUTURE);
  if (nextRaceIndex !== -1) {
    classifiedSessions[nextRaceIndex].state = SessionState.NEXT;
  }

  return (
    <List
      size="xs"
    >
      {...classifiedSessions.map((el) => <ListItem {...el}/>)}
    </List>
  );
}

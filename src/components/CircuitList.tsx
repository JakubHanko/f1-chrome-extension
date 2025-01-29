import { Grid, GridCol, Text, ThemeIcon } from "@mantine/core";
import {
  IconCheck,
  IconClock,
  IconFlag,
  IconPlayerPlay
} from "@tabler/icons-react";
import { GrandPrix, getClassifiedSessions } from "../types/GrandPrix";
import {
  AnnotatedSession,
  SessionAnnotations,
  SessionState,
  getSessionDate,
  getSessionLength
} from "../types/Session";

const Icon = ({ state }: { state: SessionState }): JSX.Element => {
  if (state === SessionState.FUTURE) {
    return (
      <ThemeIcon
        color={"yellow"}
        radius={"xl"}
        size={16}
      >
        <IconClock size={10} />
      </ThemeIcon>
    );
  } else if (state === SessionState.NEXT) {
    return (
      <ThemeIcon
        color={"blue"}
        radius={"xl"}
        size={16}
      >
        <IconFlag size={10} />
      </ThemeIcon>
    );
  } else if (state === SessionState.IN_PROGRESS) {
    return (
      <ThemeIcon
        color={"red"}
        radius={"xl"}
        size={16}
      >
        <IconPlayerPlay size={10} />
      </ThemeIcon>
    );
  }

  return (
    <ThemeIcon
      color={"teal"}
      radius={"xl"}
      size={16}
    >
      <IconCheck size={10} />
    </ThemeIcon>
  );
};

const ListItem = ({
  annotation,
  session,
  state
}: AnnotatedSession): JSX.Element => {
  const sessionDate = getSessionDate(session);
  const day = sessionDate.toLocaleDateString(undefined, { weekday: "short" });
  const date = sessionDate.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
  const time =
    session.time === undefined
      ? ""
      : sessionDate.toLocaleTimeString(undefined, {
        hour: "numeric",
        minute: "2-digit",
        hour12: false
      });

  return (
    <>
      <GridCol
        offset={1}
        span={2}
      >
        <Icon state={state} />
      </GridCol>
      <GridCol span={2}>
        <Text
          c={state === SessionState.PAST ? "dimmed" : "white"}
          size={"sm"}
        >
          {SessionAnnotations[annotation].shortName}
        </Text>
      </GridCol>
      <GridCol span={7}>
        <Text size={"xs"}>
          {day} &middot; {date} {time ? `&middot; ${time}` : null}
        </Text>
      </GridCol>
    </>
  );
};

export const CircuitList = ({
  gp,
  isNext
}: {
  gp: GrandPrix;
  isNext: boolean;
}): JSX.Element => {
  const classifiedSessions = getClassifiedSessions(gp);
  const nextRaceIndex = classifiedSessions.findIndex(
    ({ state }) => isNext && state === SessionState.FUTURE
  );
  if (nextRaceIndex !== -1) {
    classifiedSessions[nextRaceIndex].state = SessionState.NEXT;

    const nextSession = classifiedSessions[nextRaceIndex];
    const nextSessionTime = getSessionDate(nextSession.session).getTime();

    if (
      Date.now() > nextSessionTime &&
      Date.now() < nextSessionTime + getSessionLength(nextSession.annotation)
    ) {
      classifiedSessions[nextRaceIndex].state = SessionState.IN_PROGRESS;
    }
  }

  return (
    <Grid
      align={"center"}
      gutter={"xs"}
      justify={"center"}
    >
      {...classifiedSessions.map((el, i) => (
        <ListItem
          key={i}
          {...el}
        />
      ))}
    </Grid>
  );
};

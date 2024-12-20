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
        color="yellow"
        size={16}
        radius="xl"
      >
        <IconClock size={10} />
      </ThemeIcon>
    );
  } else if (state === SessionState.NEXT) {
    return (
      <ThemeIcon
        color="blue"
        size={16}
        radius="xl"
      >
        <IconFlag size={10} />
      </ThemeIcon>
    );
  } else if (state === SessionState.IN_PROGRESS) {
    return (
      <ThemeIcon
        color="red"
        size={16}
        radius="xl"
      >
        <IconPlayerPlay size={10} />
      </ThemeIcon>
    );
  }

  return (
    <ThemeIcon
      color="teal"
      size={16}
      radius="xl"
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
  const time = sessionDate.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
    hour12: false
  });

  return (
    <>
      <GridCol
        span={2}
        offset={1}
      >
        <Icon state={state} />
      </GridCol>
      <GridCol span={2}>
        <Text
          size="sm"
          c={state === SessionState.PAST ? "dimmed" : "white"}
        >
          {SessionAnnotations[annotation].shortName}
        </Text>
      </GridCol>
      <GridCol span={7}>
        <Text size="xs">
          {day} &middot; {date} &middot; {time}
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
      justify="center"
      align="center"
      gutter="xs"
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

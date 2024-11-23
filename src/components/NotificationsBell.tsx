import { ActionIcon, Tooltip } from "@mantine/core";
import { IconBell, IconBellOff } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { getClassifiedSessions, GrandPrix } from "../types/GrandPrix";
import {
  AnnotatedSession,
  getSessionDate,
  SessionState
} from "../types/Session";
import styles from "./NotificationsBell.module.css";

export const NotificationsBell = ({
  nextGp
}: {
  nextGp: GrandPrix;
}): JSX.Element => {
  const [isNotifying, setNotifying] = useState(false);

  const nextSession = getClassifiedSessions(nextGp).find(
    ({ state }) => state !== SessionState.PAST
  ) as AnnotatedSession;
  const timeUntilSession = Math.floor(
    (getSessionDate(nextSession.session).getTime() - new Date().getTime()) /
      60000
  );

  useEffect(() => {
    chrome.storage.sync.get("notificationBell", (result) => {
      const isEnabled = result.notificationBell ?? false;
      setNotifying(isEnabled);
    });
  }, []);

  const handleBellClick = (): void => {
    const newState = !isNotifying;
    setNotifying(newState);

    if (newState) {
      chrome.runtime.sendMessage({
        type: "f1-event-notification",
        raceName: nextGp.raceName,
        sessionName: nextSession?.longName,
        sessionTime: getSessionDate(nextSession.session).getTime(),
        delay: timeUntilSession - 30
      });
    } else {
      chrome.runtime.sendMessage({ type: "clear" });
    }

    chrome.storage.sync.set({ notificationBell: newState });
  };

  return (
    <>
      <div className={styles.container}>
        <Tooltip
          label={
            isNotifying
              ? "Turn off notifications"
              : "Notify me for the next F1 session"
          }
        >
          <ActionIcon
            color={isNotifying ? "f1red" : "gray"}
            onClick={handleBellClick}
            variant="filled"
            size="lg"
            radius="xl"
          >
            {isNotifying ? <IconBellOff /> : <IconBell />}
          </ActionIcon>
        </Tooltip>
      </div>
    </>
  );
};

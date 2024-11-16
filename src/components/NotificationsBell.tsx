import { ActionIcon, Tooltip } from "@mantine/core";
import { IconBell } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { getClassifiedSessions, GrandPrix } from "../types/GrandPrix";
import { AnnotatedSession, getSessionDate, SessionState } from "../types/Session";

// const HOUR_IN_MILLISECONDS = 60 * 60 * 1000;

export const NotificationsBell = ({ nextGp }: { nextGp: GrandPrix}) => {
  const [ isNotifying, setNotifying ] = useState(false);
  console.log(nextGp);

  const nextSession = getClassifiedSessions(nextGp).find(({ state }) => state !== SessionState.PAST) as AnnotatedSession;
  const timeUntilSession = Math.floor(getSessionDate(nextSession.session).getTime() - new Date().getTime() / 60000);

  useEffect(() => {
    chrome.storage.sync.get("notificationBell", (result) => {
      const isEnabled = result.notificationBell ?? false;
      setNotifying(isEnabled);
    });
  }, []);

  const handleBellClick = async () => {
    const newState = !isNotifying;
    setNotifying(newState);

    if (newState) {
      chrome.runtime.sendMessage(
        {
          type: "f1-event-notification",
          raceName: nextGp.raceName,
          sessionName: nextSession?.longName,
          delay: timeUntilSession - 30
        }
      );
    } else {
      chrome.runtime.sendMessage({ type: "clear" });
    }

    chrome.storage.sync.set({ notificationBell: newState });
  };

  return (
    <>
      <Tooltip label={isNotifying ? "Notification scheduled" : "Notify me for the next F1 session"}>
        <ActionIcon
          color={isNotifying ? "red" : "gray"}
          onClick={handleBellClick}
          variant="filled"
          size="lg"
        >
          <IconBell />
        </ActionIcon>
      </Tooltip>
    </>
  );
};

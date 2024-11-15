import { ActionIcon, Tooltip } from "@mantine/core";
import { IconBell } from "@tabler/icons-react";
import { useState } from "react";
import { GrandPrix } from "../types/GrandPrix";

// const HOUR_IN_MILLISECONDS = 60 * 60 * 1000;
const NOTIFICATION_ID = "f1-extension-notification";

export const NotificationsBell = ({ nextGp }: { nextGp: GrandPrix}) => {
  const [ isNotifying, setNotifying ] = useState(false);

  // const nextSession = getClassifiedSessions(nextGp).find(({ state }) => state !== SessionState.PAST);
  console.log(nextGp);

  const handleBellClick = () => {
    if (isNotifying) {
      //
    } else {
      //
    }
    setNotifying(!isNotifying);
  };
  console.log(isNotifying);

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

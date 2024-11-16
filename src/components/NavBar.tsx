import { AppShell, Button, Flex, Group } from "@mantine/core";
import { GrandPrix } from "../types/GrandPrix";
import styles from "./NavBar.module.css";
import { NotificationsBell } from "./NotificationsBell";

export function NavBar({ nextGp }: { nextGp: GrandPrix }) {
  return (
    <AppShell.Header>
      <Flex
        className={styles.navbar}
        gap="xs"
        justify="center"
        align="center"
        direction="row"
        wrap="wrap"
      >
        <Button className={styles.button} size="xl" radius="xs">
                Calendar
        </Button>
        <Button className={styles.button} size="xl" radius="xs">
                Standings
        </Button>
        <Group justify="flex-end">
          { "storage" in chrome && <NotificationsBell nextGp={nextGp}/>}
        </Group>
      </Flex>
    </AppShell.Header>
  );
}

import { AppShell, Button, Flex } from "@mantine/core";
import styles from "./NavBar.module.css";

export function NavBar() {
  return (
    <AppShell.Header>
      <Flex
        bg="red"
        gap="xs"
        justify="flex-start"
        align="flex-start"
        direction="row"
        wrap="wrap"
      >
        <Button className={styles.button} bg="red" size="xl" radius="xs">
                Calendar
        </Button>
        <Button className={styles.button} bg="red" size="xl" radius="xs">
                Lorem Ipsum
        </Button>
      </Flex>
    </AppShell.Header>
  );
}

import { AppShell, Button, Flex } from "@mantine/core";
import "./NavBar.module.css";

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
        <Button bg="red" size="xl" radius="xs">
                Calendar
        </Button>
        <Button bg="red" size="xl" radius="xs">
                Lorem Ipsum
        </Button>
      </Flex>
    </AppShell.Header>
  );
}

import { Grid, Stack, Text } from "@mantine/core";
import { GrandPrix } from "../types/GrandPrix";
import { Flag } from "./Flag";

export const CircuitHeader = ({ gp }: { gp: GrandPrix }): JSX.Element => {
  return (
    <>
      <Grid pb="xs">
        <Grid.Col span={4}>
          <Flag location={gp.Circuit.Location} />
        </Grid.Col>
        <Grid.Col span={8}>
          <Stack>
            <Text size="md">{gp.raceName}</Text>
            <Text size="sm">{gp.Circuit.circuitName}</Text>
          </Stack>
        </Grid.Col>
      </Grid>
    </>
  );
};

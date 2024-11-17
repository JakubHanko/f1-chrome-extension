import { Carousel } from "@mantine/carousel";
import "@mantine/carousel/styles.css";
import { Container, Divider, Paper } from "@mantine/core";
import {
  IconChevronCompactLeft,
  IconChevronCompactRight
} from "@tabler/icons-react";
import { GrandPrix } from "../types/GrandPrix";
import classes from "./CircuitCarousel.module.css";
import { CircuitHeader } from "./CircuitHeader";
import { CircuitList } from "./CircuitList";

const CircuitCard = ({
  gp,
  isGpNext
}: {
  gp: GrandPrix;
  isGpNext: boolean;
}): JSX.Element => {
  return (
    <Paper
      shadow="xs"
      p="xl"
      withBorder
      style={{
        background: "radial-gradient(circle, #5c0a0a 0%, #1a0000 80%)",
        color: "white",
        borderRadius: "0 0 8px 8px"
      }}
    >
      <Container p="xl">
        <CircuitHeader gp={gp} />
        <Divider my="md" />
        <CircuitList
          gp={gp}
          isNext={isGpNext}
        />
      </Container>
    </Paper>
  );
};

export const CircuitCarousel = ({
  data,
  initialSlide
}: {
  data: GrandPrix[];
  initialSlide: number;
}): JSX.Element => {
  const slides = data?.map((gp, i) => (
    <Carousel.Slide key={i}>
      <CircuitCard
        gp={gp}
        isGpNext={i === initialSlide}
      />
    </Carousel.Slide>
  ));

  return (
    <Carousel
      classNames={classes}
      initialSlide={initialSlide === -1 ? data.length : initialSlide}
      previousControlIcon={
        <IconChevronCompactLeft
          className={classes.leftArrow}
          color="red"
        />
      }
      nextControlIcon={
        <IconChevronCompactRight
          className={classes.rightArrow}
          color="red"
        />
      }
    >
      {slides}
    </Carousel>
  );
};

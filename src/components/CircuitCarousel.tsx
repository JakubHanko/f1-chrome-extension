import { Carousel } from "@mantine/carousel";
import "@mantine/carousel/styles.css";
import { Container, Divider, Paper } from "@mantine/core";
import { GrandPrix } from "../types/GrandPrix";
import classes from "./CircuitCarousel.module.css";
import { CircuitHeader } from "./CircuitHeader";
import { CircuitList } from "./CircuitList";


function CircuitCard({ gp, isGpNext }: { gp: GrandPrix, isGpNext: boolean }) {
  return (
    <Paper
      shadow="xs"
      p="xl"
      radius="md"
      withBorder
    >
      <Container p="xl">
        <CircuitHeader gp={gp}/>
        <Divider my="md"/>
        <CircuitList gp={gp} isGpNext={isGpNext}/>
      </Container>
    </Paper>
  );
}

export function CircuitCarousel({ data, initialSlide }: {data: GrandPrix[], initialSlide: number}) {
  const slides = data?.map((gp, i) => (
    <Carousel.Slide key={i}>
      <CircuitCard gp={gp} isGpNext={i === initialSlide} />
    </Carousel.Slide>
  ));

  return (
    <Carousel
      classNames={classes}
      initialSlide={initialSlide === -1 ? data.length : initialSlide}
    >
      {slides}
    </Carousel>
  );
}

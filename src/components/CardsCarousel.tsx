import { Carousel } from "@mantine/carousel";
import "@mantine/carousel/styles.css";
import { Paper, Text } from "@mantine/core";
import { GrandPrix } from "../types/GrandPrix";
import classes from "./CardsCarousel.module.css";

function Card(gp: GrandPrix) {
  console.log(gp);

  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      className={classes.card}
    >
      <div>
        <Text className={classes.category} size="xs">
          {gp.raceName}
        </Text>
        <Text className={classes.category} size="xs">
          {gp.Circuit.circuitName}
        </Text>
      </div>
    </Paper>
  );
}

export function CardsCarousel({ data, initialSlide }: {data: GrandPrix[], initialSlide: number}) {
  const slides = data?.map((gp, i) => (
    <Carousel.Slide key={i}>
      <Card {...gp} />
    </Carousel.Slide>
  ));

  return (
    <Carousel
      withIndicators
      height={200}
      classNames={classes}
      slideSize={{ base: "100%", sm: "50%", md: "33.333333%" }}
      slideGap={{ base: 0, sm: "md" }}
      initialSlide={initialSlide === -1 ? data.length : initialSlide}
    >
      {slides}
    </Carousel>
  );
}

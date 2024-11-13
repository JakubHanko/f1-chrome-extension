import { Carousel } from "@mantine/carousel";
import "@mantine/carousel/styles.css";
import { Container, List, Paper, Text } from "@mantine/core";
import { GrandPrix } from "../types/GrandPrix";
import { Session } from "../types/Session";
import classes from "./CardsCarousel.module.css";

function Card(gp: GrandPrix) {
  const convertToLocalTime = (dateString: string, timeString: string) => new Intl.DateTimeFormat("default", {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  }).format(new Date(`${timeString}T${dateString}`));

  const sessionArray: [string, Session?][] =
    [
      [ "First Practice", gp.FirstPractice ],
      [ "Second Practice", gp.SecondPractice ],
      [ "Third Practice", gp.ThirdPractice ],
      [ "Sprint Quali", gp.SprintQualifying ],
      [ "Sprint", gp.Sprint ],
      [ "Quali", gp.Qualifying ],
      [ "Race", { date: gp.date, time: gp.time } ]
    ];

  const createList = () => sessionArray.filter(([ _, session ]) => session !== undefined)
    .map(([ title, session ]) => <List.Item>{title}: {session && convertToLocalTime(session.time, session.date)}</List.Item>);

  return (
    <Paper
      shadow="xs"
      p="xl"
      radius="md"
      withBorder
      // className={classes.card}
    >
      <Container p="xl">
        <Text size="md">
          {gp.raceName}
        </Text>
        <Text size="md">
          {gp.Circuit.circuitName}
        </Text>
        <List size="xs">
          {...createList()}
        </List>
      </Container>
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
      classNames={classes}
      initialSlide={initialSlide === -1 ? data.length : initialSlide}
    >
      {slides}
    </Carousel>
  );
}

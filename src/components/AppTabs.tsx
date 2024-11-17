import { Tabs } from "@mantine/core";
import { GrandPrix } from "../types/GrandPrix";
import styles from "./AppTabs.module.css";
import { CircuitCarousel } from "./CircuitCarousel";
import { CustomLoader } from "./CustomLoader";
import { NotificationsBell } from "./NotificationsBell";
import { Standings } from "./Standings";

export const AppTabs = ({
  grandPrix
}: {
  grandPrix: GrandPrix[];
}): JSX.Element => {
  const nextGpIndex = grandPrix.findIndex(
    (gp) => new Date(gp.date).getTime() > new Date().getTime()
  );

  return (
    <Tabs
      defaultValue="calendar"
      variant="pills"
      radius="xs"
    >
      <Tabs.List className={styles.list}>
        <Tabs.Tab value="calendar">Calendar</Tabs.Tab>
        <Tabs.Tab value="standings">Standings</Tabs.Tab>
      </Tabs.List>
      {grandPrix.length === 0 ? (
        <CustomLoader />
      ) : (
        <>
          <Tabs.Panel value="calendar">
            {"storage" in chrome && nextGpIndex !== -1 && (
              <NotificationsBell nextGp={grandPrix[nextGpIndex]} />
            )}
            <CircuitCarousel
              data={grandPrix}
              initialSlide={nextGpIndex}
            />
          </Tabs.Panel>
          <Tabs.Panel value="standings">
            <Standings />
          </Tabs.Panel>
        </>
      )}
    </Tabs>
  );
};

import { Tabs } from "@mantine/core";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Endpoint } from "../types/Endpoint";
import { GrandPrix } from "../types/GrandPrix";
import { getSessionLength, SessionAnnotationType } from "../types/Session";
import { fetchData } from "../utils/api";
import styles from "./AppTabs.module.css";
import { CircuitCarousel } from "./CircuitCarousel";
import { CustomLoader } from "./CustomLoader";
import { NotificationsBell } from "./NotificationsBell";
import { Standings } from "./Standings";

export const AppTabs = (): JSX.Element => {
  const [grandPrix, setGrandPrix] = useState<GrandPrix[]>([]);

  useEffect(() => {
    fetchData<GrandPrix>({
      endpoint: Endpoint.Races
    })
      .then((data) => setGrandPrix(data))
      .catch((error) => console.error(error));
  }, []);

  const nextGpIndex = grandPrix.findIndex(
    (gp) =>
      new Date(gp.date).getTime() +
        getSessionLength(SessionAnnotationType.GrandPrix) >
      Date.now()
  );

  const location = useLocation();
  const navigate = useNavigate();

  const activeTab = location.pathname.includes("standings")
    ? "standings"
    : "calendar";

  return (
    <Tabs
      value={activeTab}
      variant="pills"
      radius="xs"
      onChange={(value) => navigate(`/tabs/${value}`)}
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

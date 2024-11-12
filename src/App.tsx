import { useEffect, useState } from "react";
import "./App.css";
import Button from "./components/Arrow";
import { ArrowDirection } from "./components/ArrowDirection";

const SESSIONS_STORAGE_KEY = "sessions";
interface Location {
  lat: number;
  long: number;
  country: string;
}

interface Session {
  date: string;
  time: string;
}

interface Circuit {
  circuitId: string;
  url: string;
  circuitName: string;
  Location: Location;
}

interface GrandPrix {
  Circuit: Circuit;
  FirstPractice: Session;
  Qualifying: Session;
  SecondPractice?: Session;
  ThirdPractice?: Session;
  Sprint?: Session;
  SprintQualifying?: Session;
  SprintShootout?: Session;
  date: string;
  raceName: string;
  round: string;
  season: string;
  time: string;
  url: string;
}

const App: React.FC = () => {
  const [ count, setCount ] = useState(0);
  const [ grandPrix, setGrandPrix ] = useState<GrandPrix[]>([]);

  const decrementCount = () => setCount((count) => count > 0 ? count - 1 : count);
  const incrementCount = () => setCount((count) => count === grandPrix.length - 1 ? count : count + 1);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://api.jolpi.ca/ergast/f1/2024/races");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      localStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(result.MRData.RaceTable.Races));

      setGrandPrix(result);
    };

    const cachedData = localStorage.getItem(SESSIONS_STORAGE_KEY);
    if (cachedData) {
      setGrandPrix(JSON.parse(cachedData));

      return;
    }
    fetchData(); // Call the async function
  }, [ ]);

  console.log(grandPrix);

  return (
    <>
      <div className="card">
        <Button direction={ArrowDirection.LEFT} clicked={decrementCount}/>
        <Button direction={ArrowDirection.RIGHT} clicked={incrementCount}/>
        <br/>
        current GP is: {grandPrix?.[count]?.raceName}
      </div>
    </>
  );
};

export default App;

import { useState } from "react";
import "./App.css";
import Button from "./components/Arrow";
import { ArrowDirection } from "./components/ArrowDirection";

const App: React.FC = () => {
  const [ count, setCount ] = useState(0);

  const decrementCount = () => setCount((count) => count - 1);
  const incrementCount = () => setCount((count) => count + 1);

  return (
    <>
      <div className="card">
        <Button direction={ArrowDirection.LEFT} clicked={decrementCount}/>
        <Button direction={ArrowDirection.RIGHT} clicked={incrementCount}/>
        <br/>
        count is {count}
      </div>
    </>
  );
};

export default App;

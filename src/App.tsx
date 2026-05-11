import { useEffect, useState, type ChangeEvent } from "react";
import "./App.css";
import { Button } from "./Button";

function App() {
  const [count, setCount] = useState<number>(0);
  const [maxValue, setMaxValue] = useState(() => {
    const valueFromLocalStorage = localStorage.getItem("maxValue");

    return valueFromLocalStorage !== null ? Number(valueFromLocalStorage) : 0;
  });
  const [startValue, setStartValue] = useState(() => {
    const valueFromLocalStorage = localStorage.getItem("startValue");

    return valueFromLocalStorage !== null ? Number(valueFromLocalStorage) : 0;
  });

  useEffect(() => {
    localStorage.setItem("maxValue", JSON.stringify(maxValue));
  }, [maxValue]);

  useEffect(() => {
    localStorage.setItem("startValue", JSON.stringify(startValue));
  }, [startValue]);

  const handleIncreaseBtnClick = () => {
    if (count < maxValue) {
      setCount(count + 1);
    }
  };

  const handleResetBtnClick = () => {
    setCount(startValue);
  };

  const handleMaxValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMaxValue(+e.currentTarget.value);
  };

  const handleStartValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStartValue(+e.currentTarget.value);
  };

  const handleSetClick = () => {
    setCount(startValue);
  };

  return (
    <div>
      <div className="container">
        <div>
          <span>
            <p> max value: </p>
            <input
              type="number"
              value={maxValue}
              onChange={handleMaxValueChange}
            />
          </span>
          <span>
            <p>start value: </p>
            <input
              type="number"
              value={startValue}
              onChange={handleStartValueChange}
            />
          </span>
        </div>
        <div className="btn-container">
          <Button title="set" onClick={handleSetClick} disabled={false} />
        </div>
      </div>
      <div className="container">
        <div className="counter">
          <p className={count === maxValue ? "error-count" : ""}>{count}</p>
        </div>
        <div className="btn-container">
          <Button
            title="inc"
            onClick={handleIncreaseBtnClick}
            disabled={count === maxValue}
          />
          <Button
            title="reset"
            onClick={handleResetBtnClick}
            disabled={count === 0 || count < maxValue}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

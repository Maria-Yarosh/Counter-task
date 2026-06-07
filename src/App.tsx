import { useEffect, useState, type ChangeEvent } from "react";
import "./App.css";
import { Button } from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { applySettings, incremented, reset, type RootState } from "./store";

function App() {
  const count = useSelector<RootState, number>((state) => state.value);
  const maxValue = useSelector<RootState, number>((state) => state.maxValue);
  // const startValue = useSelector<RootState, number>(
  //   (state) => state.startValue,
  // );

  const [draftMaxValue, setDraftMaxValue] = useState(() => {
    const valueFromLocalStorage = localStorage.getItem("maxValue");

    return valueFromLocalStorage !== null ? Number(valueFromLocalStorage) : 0;
  });
  const [draftStartValue, setDraftStartValue] = useState(() => {
    const valueFromLocalStorage = localStorage.getItem("startValue");

    return valueFromLocalStorage !== null ? Number(valueFromLocalStorage) : 0;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("maxValue", JSON.stringify(draftMaxValue));
  }, [draftMaxValue]);

  useEffect(() => {
    localStorage.setItem("startValue", JSON.stringify(draftStartValue));
  }, [draftStartValue]);

  const handleIncreaseBtnClick = () => {
    if (count < maxValue) {
      dispatch(incremented());
    }
  };

  const handleResetBtnClick = () => {
    dispatch(reset());
  };

  const handleMaxValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    //dispatch(setMaxValueAc(+e.currentTarget.value));
    setDraftMaxValue(+e.currentTarget.value);
  };

  const handleStartValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    //dispatch(setStartValueAc(+e.currentTarget.value));
    setDraftStartValue(+e.currentTarget.value);
  };

  const handleSetClick = () => {
    dispatch(
      applySettings({ maxValue: draftMaxValue, startValue: draftStartValue }),
    );
  };

  return (
    <div>
      <div className="container">
        <div>
          <span>
            <p> max value: </p>
            <input
              type="number"
              value={draftMaxValue}
              onChange={handleMaxValueChange}
            />
          </span>
          <span>
            <p>start value: </p>
            <input
              type="number"
              value={draftStartValue}
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

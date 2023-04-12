import { useState } from "react";

const Header = ({ text }) => <h1>{text}</h1>;

const Text = ({ text, number, percent }) => (
  <div>
    {text} {number} {percent}
  </div>
);

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [allClicks, setAll] = useState(0);
  let [average, setAverage] = useState(0);
  let [positive, setPositive] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
    setAll(allClicks + 1);
    setAverage((good + 1 + neutral * 0 + bad * -1) / (allClicks + 1));
    setPositive(((good + 1) / (allClicks + 1)) * 100);
  };

  const handleMiddleClick = () => {
    setNeutral(neutral + 1);
    setAll(allClicks + 1);
    setAverage((good * 1 + (neutral + 1) * 0 + bad * -1) / (allClicks + 1));
    setPositive((good / (allClicks + 1)) * 100);
  };

  const handleRightClick = () => {
    setBad(bad + 1);
    setAll(allClicks + 1);
    setAverage((good * 1 + neutral * 0 + (bad + 1) * -1) / (allClicks + 1));
    setPositive((good / (allClicks + 1)) * 100);
  };

  return (
    <div>
      <Header text="give feedback" />
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleMiddleClick} text="neutral" />
      <Button handleClick={handleRightClick} text="bad" />
      <Header text="statistics" />
      <Text text="good:" number={good} />
      <Text text="neutral:" number={neutral} />
      <Text text="bad:" number={bad} />
      <Text text="all:" number={allClicks} />
      <Text text="average:" number={average} />
      <Text text="positive:" number={positive} percent={"%"} />
    </div>
  );
};

export default App;

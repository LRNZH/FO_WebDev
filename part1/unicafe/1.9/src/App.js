import { useState } from "react";

const Header = ({ text }) => <h1>{text}</h1>;

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Statistics = (Props) => {
  if (Props.allClicks === 0) {
    return <div>No feedback given</div>;
  }
  return (
    <div>
      <div>good: {Props.good} </div>
      <div> neutral: {Props.neutral} </div>
      <div> bad: {Props.bad} </div>
      <div> all: {Props.allClicks} </div>
      <div>average: {Props.average}</div>
      <div>positive: {Props.positive} % </div>
    </div>
  );
};

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
    setAverage(
      (average = (good + 1 + neutral * 0 + bad * -1) / (allClicks + 1))
    );
    setPositive((positive = (good + 1) / (allClicks + 1)) * 100);
  };

  const handleMiddleClick = () => {
    setNeutral(neutral + 1);
    setAll(allClicks + 1);
    setAverage(
      (average = (good * 1 + (neutral + 1) * 0 + bad * -1) / (allClicks + 1))
    );
    setPositive((positive = good / (allClicks + 1)) * 100);
  };

  const handleRightClick = () => {
    setBad(bad + 1);
    setAll(allClicks + 1);
    setAverage(
      (average = (good * 1 + neutral * 0 + (bad + 1) * -1) / (allClicks + 1))
    );
    setPositive((positive = (good / (allClicks + 1)) * 100));
  };

  return (
    <div>
      <Header text="give feedback" />
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleMiddleClick} text="neutral" />
      <Button handleClick={handleRightClick} text="bad" />
      <Header text="statistics" />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        allClicks={allClicks}
        average={average}
        positive={positive}
      />
    </div>
  );
};

export default App;

import { useState } from "react";

const Header = ({ text }) => <h1>{text}</h1>;

const Text = ({ text, number }) => (
  <div>
    {text} {number}
  </div>
);

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleLeftClick = () => {
    setGood(good + 1);
  };

  const handleMiddleClick = () => {
    setNeutral(neutral + 1);
  };

  const handleRightClick = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <Header text="give feedback" />
      <Button handleClick={handleLeftClick} text="good" />
      <Button handleClick={handleMiddleClick} text="neutral" />
      <Button handleClick={handleRightClick} text="bad" />
      <Header text="statistics" />
      <Text text="good" number={good} />
      <Text text="neutral" number={neutral} />
      <Text text="bad" number={bad} />
    </div>
  );
};

export default App;

import { useState } from "react";

const Header = ({ text }) => <h1>{text}</h1>;

const Button = (Props) => (
  <button onClick={Props.handleClick}>{Props.text}</button>
);

const Display = (props) => {
  if (props.updatedVote < 2) {
    return (
      <div>
        {" "}
        {props.text} {props.updatedVote} vote{" "}
      </div>
    );
  }
  return (
    <div>
      {" "}
      {props.text} {props.updatedVote} votes{" "}
    </div>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  let [selected, setSelected] = useState(
    Math.floor(Math.random() * anecdotes.length)
  );

  let [vote, voteSelected] = useState([]);

  let [updatedVote, setUpdate] = useState(0);

  let [index, setIndex] = useState(0);
  let highest;

  function handleClick() {
    setSelected((selected = Math.floor(Math.random() * anecdotes.length)));
    setUpdate((updatedVote = vote[selected]));
  }

  function voteClick() {
    if (vote.length === 0) {
      vote = Array.from({ length: anecdotes.length }, () => 0).fill(0, 0);
      vote[selected] += 1;
      voteSelected(vote);
      setUpdate((updatedVote = vote[selected]));
      highest = vote.reduce((a, b) => Math.max(a, b), -Infinity);
      setIndex((index = vote.indexOf(highest)));
    } else {
      vote[selected] += 1;
      voteSelected(vote);
      setUpdate((updatedVote = vote[selected]));
      highest = vote.reduce((a, b) => Math.max(a, b), -Infinity);
      setIndex((index = vote.indexOf(highest)));
    }
  }

  return (
    <div>
      <Header text="Anecdote of the day" />
      <div>{anecdotes[selected]}</div>
      <Display text="has" updatedVote={updatedVote} />
      <Button handleClick={voteClick} text="vote" />
      <Button handleClick={handleClick} text="next anecdote" />
      <Header text="Anecdote with most votes" />
      <div>{anecdotes[index]}</div>
      <Display text="has" updatedVote={vote[index]} />
    </div>
  );
};

export default App;

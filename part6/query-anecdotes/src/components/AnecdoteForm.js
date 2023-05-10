import React, { useState } from 'react';

const AnecdoteForm = ({ createAnecdote }) => {
  const [inputValue, setInputValue] = useState('');

  const onCreate = (event) => {
    event.preventDefault();
    if (inputValue.length >= 5) {
      createAnecdote(inputValue);
      setInputValue('');
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <h4>Create new</h4>
      <form onSubmit={onCreate}>
        <input name='anecdote' value={inputValue} onChange={handleInputChange} />
        <button type='submit'>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
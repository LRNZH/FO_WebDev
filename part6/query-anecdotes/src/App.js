/* App.js */
import React, { useReducer } from 'react';
import AnecdoteForm from './components/AnecdoteForm';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import requests from './requests';

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.payload;
    case 'REMOVE_NOTIFICATION':
      return null;
    default:
      return state;
  }
};

const App = () => {
  const queryClient = useQueryClient();

  const { data: anecdotes, isLoading, error } = useQuery('anecdotes', requests.getAll, {
    refetchOnWindowFocus: false,
    onError: () => {
      setNotification('Error loading anecdotes', true);
    },
  });

  const { mutate: createAnecdote } = useMutation(requests.createNew, {
    onSuccess: (anecdote) => {
      queryClient.invalidateQueries('anecdotes');
      setNotification(`New anecdote "${anecdote.content}" added`);
    },
    onError: () => {
      setNotification('Error adding new anecdote', true);
    },
  });

  const { mutate: voteAnecdote } = useMutation(requests.vote, {
    onSuccess: (anecdote) => {
      queryClient.invalidateQueries('anecdotes');
      setNotification(`Anecdote "${anecdote.content}" voted`);
    },
    onError: () => {
      setNotification('Error voting anecdote', true);
    },
  });

  const handleVote = (anecdote) => {
    voteAnecdote(anecdote);
  };

  const [notification, dispatchNotification] = useReducer(notificationReducer, null);

  const setNotification = (message, isError = false) => {
    dispatchNotification({ type: 'SET_NOTIFICATION', payload: { message, isError } });
    setTimeout(() => {
      dispatchNotification({ type: 'REMOVE_NOTIFICATION' });
    }, 5000);
  };

  return (
    <div>
      <h3>Anecdote app</h3>
      <div>
        {notification && (
          <div
            style={{
              border: 'solid 1px',
              padding: '10px',
              marginBottom: '5px',
              color: 'white',
              background: notification.isError ? 'red' : 'green',
            }}
          >
            {notification.message}
          </div>
        )}
      </div>
      <h4>Existing:</h4>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error.message}</div>
      ) : (
        anecdotes
          .sort((a, b) => b.votes - a.votes)
          .map((anecdote) => (
            <div key={anecdote.id}>
              <li>
                "{anecdote.content}" has {anecdote.votes} votes
                <button onClick={() => handleVote(anecdote)}>vote</button>
              </li>
            </div>
          ))
      )}
      <AnecdoteForm createAnecdote={createAnecdote} />
    </div>
  );
};

export default App;
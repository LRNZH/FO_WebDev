import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { showMessage } from '../reducers/notificationReducer'
import { voteAnecdote } from '../reducers/anecdoteReducer'


const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector((state) => {
    const filter = state.filter
    const filteredAnecdotes = state.anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    )
    return filteredAnecdotes
  })

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote))
    dispatch(showMessage(`You voted for "${anecdote.content}"`, 2.5, 'blue'))
  }

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => vote(anecdote)}
        />
      ))}
    </div>
  )
}

export default AnecdoteList
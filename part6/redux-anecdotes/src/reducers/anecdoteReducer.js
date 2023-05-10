import { createSlice } from '@reduxjs/toolkit'
import anecdotes from '../services/anecdotes'
import { showMessage } from './notificationReducer'

const anecdoteReducer = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    initializeAnecdotes: (state, action) => {
      return action.payload
    },
    addAnecdote: (state, action) => {
      state.push(action.payload)
    },
    voteAnecdote: (state, action) => {
      const anecdoteToVote = state.find((a) => a.id === action.payload.id)
      anecdoteToVote.votes++
      anecdotes.update(anecdoteToVote)
      state.sort((a, b) => b.votes - a.votes)
    },
  },
})

export const { initializeAnecdotes, addAnecdote, voteAnecdote } =
  anecdoteReducer.actions

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdotes.createNew(content)
    dispatch(addAnecdote(newAnecdote))
    dispatch(showMessage(`You added '${newAnecdote.content}'`, 2.5, 'black'))
  }
}

export const initializeAnecdotesFromServer = () => {
  return async (dispatch) => {
    const anecdotesFromServer = await anecdotes.getAll()
    anecdotesFromServer.sort((a, b) => b.votes - a.votes)
    dispatch(initializeAnecdotes(anecdotesFromServer))
    anecdotesFromServer.forEach((anecdote) =>
      anecdotes.update(anecdote)
    )
  }
}

export default anecdoteReducer.reducer
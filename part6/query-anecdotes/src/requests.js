import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
};

const createNew = async (content) => {
    if (content.length < 5) {
        throw new Error('Anecdote must be at least 5 characters long');
    }
    const response = await axios.post(baseUrl, { content, votes: 0 });
    return response.data;
};

const vote = async (anecdote) => {
    const response = await axios.patch(`${baseUrl}/${anecdote.id}`, {
        ...anecdote,
        votes: anecdote.votes + 1,
    });
    return response.data;
};

export default {
    getAll,
    createNew,
    vote,
};
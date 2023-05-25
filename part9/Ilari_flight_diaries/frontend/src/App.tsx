import React from 'react';
import DiaryList from './components/DiaryList';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Diary</h1>
      </header>
      <DiaryList />
    </div>
  );
};

export default App;

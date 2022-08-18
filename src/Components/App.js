import React from 'react';
import GameField from './GameField';
import Header from './Header';
import { TimerProvider } from './TimerContext';
import '../Styles/App.css';
function App() {
  return (
    <div className="App">
      <TimerProvider>
        <Header />
        <GameField />
      </TimerProvider>
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import './App.css';

// Initial song data
const tier4Songs = [
  ["Middle of the Road", "The Meters"],
  ["Better By the Pound", "Funkadelic"],
  ["Sofa No. 1", "Frank Zappa"]
];

const tier3Songs = [
  ["Games People Play", "The Spinners"],
  ["Magic", "Pilot"],
  ["At Seventeen", "Janis Ian"]
];

const tier2Songs = [
  ["Ballroom Blitz", "Sweet"],
  ["Sister Golden Hair", "America"],
  ["Love Rollercoaster", "Ohio Players"]
];

const tier1Songs = [
  ["Bohemian Rhapsody", "Queen"],
  ["Wish You Were Here", "Pink Floyd"],
  ["Born to Run", "Bruce Springsteen"]
];

function App() {
  const [currentTier, setCurrentTier] = useState(4);
  const [songPool, setSongPool] = useState([...tier4Songs]);
  const [champion, setChampion] = useState(null);
  const [challenger, setChallenger] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [streak, setStreak] = useState(0);

  const startGame = () => {
    const firstChampion = songPool[0];
    const firstChallenger = songPool[1];
    setSongPool(songPool.slice(2));
    setChampion(firstChampion);
    setChallenger(firstChallenger);
    setGameStarted(true);
  };

  const handleChoice = (keepChampion) => {
    if (songPool.length === 0) {
      if (currentTier > 1) {
        const nextTier = currentTier - 1;
        setCurrentTier(nextTier);
        const nextSongs = nextTier === 3 ? tier3Songs : nextTier === 2 ? tier2Songs : tier1Songs;
        setSongPool(nextSongs.slice(1));
        setChallenger(nextSongs[0]);
        setStreak(keepChampion ? streak + 1 : 1);
      }
      return;
    }

    const nextChallenger = songPool[0];
    setSongPool(songPool.slice(1));
    if (keepChampion) {
      setStreak(streak + 1);
      setChallenger(nextChallenger);
    } else {
      setChampion(challenger);
      setChallenger(nextChallenger);
      setStreak(1);
    }
  };

  if (!gameStarted) {
    return (
      <div className="game-container">
        <h1>Zepp Denier</h1>
        <p>The honky quest for the ultimate song from 1975</p>
        <button onClick={startGame}>Start Game</button>
      </div>
    );
  }

  return (
    <div className="game-container">
      <h1>Zepp Denier</h1>
      <div className="game-info">
        <p>Tier {currentTier}</p>
        {streak > 1 && <p>Streak: {streak}</p>}
      </div>
      {champion && challenger && (
        <div className="matchup">
          <div className="song-card">
            <h2>Current Favorite</h2>
            <button onClick={() => handleChoice(true)}>
              <h3>{champion[0]}</h3>
              <p>{champion[1]}</p>
            </button>
          </div>
          <div className="song-card">
            <h2>Challenger</h2>
            <button onClick={() => handleChoice(false)}>
              <h3>{challenger[0]}</h3>
              <p>{challenger[1]}</p>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

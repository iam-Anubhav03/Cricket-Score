import React, { useState } from "react";
import "./App.css";

const INITIAL_PLAYERS = [
  { name: "Player 1", runs: 0, out: false },
  { name: "Player 2", runs: 0, out: false },
  { name: "Player 3", runs: 0, out: false },
  { name: "Player 4", runs: 0, out: false },
  { name: "Player 5", runs: 0, out: false },
  { name: "Player 6", runs: 0, out: false },
];

const App = () => {
  const [teamA, setTeamA] = useState({ runs: 0, wickets: 0, players: [...INITIAL_PLAYERS] });
  const [teamB, setTeamB] = useState({ runs: 0, wickets: 0, players: [...INITIAL_PLAYERS] });

  const [currentBatsman, setCurrentBatsman] = useState(0);
  const [battingTeam, setBattingTeam] = useState("A"); // "A" for Team A, "B" for Team B

  const updateScore = (runs) => {
    if (battingTeam === "A") {
      setTeamA((prev) => {
        const updatedPlayers = [...prev.players];
        if (!updatedPlayers[currentBatsman].out) {
          updatedPlayers[currentBatsman].runs += runs;
        }
        return { ...prev, runs: prev.runs + runs, players: updatedPlayers };
      });
    } else {
      setTeamB((prev) => {
        const updatedPlayers = [...prev.players];
        if (!updatedPlayers[currentBatsman].out) {
          updatedPlayers[currentBatsman].runs += runs;
        }
        return { ...prev, runs: prev.runs + runs, players: updatedPlayers };
      });
    }
  };

  const handleWicket = () => {
    if (battingTeam === "A" && teamA.wickets < 5) {
      setTeamA((prev) => {
        const updatedPlayers = [...prev.players];
        updatedPlayers[currentBatsman].out = true;
        return { ...prev, wickets: prev.wickets + 1, players: updatedPlayers };
      });
      setCurrentBatsman((prev) => prev + 1);
    } else if (battingTeam === "B" && teamB.wickets < 5) {
      setTeamB((prev) => {
        const updatedPlayers = [...prev.players];
        updatedPlayers[currentBatsman].out = true;
        return { ...prev, wickets: prev.wickets + 1, players: updatedPlayers };
      });
      setCurrentBatsman((prev) => prev + 1);
    }
  };

  const switchInnings = () => {
    setBattingTeam(battingTeam === "A" ? "B" : "A");
    setCurrentBatsman(0);
  };

  const resetMatch = () => {
    setTeamA({ runs: 0, wickets: 0, players: [...INITIAL_PLAYERS] });
    setTeamB({ runs: 0, wickets: 0, players: [...INITIAL_PLAYERS] });
    setCurrentBatsman(0);
    setBattingTeam("A");
  };

  return (
    <div className="container">
      <h1>🏏 Cricket Scoreboard</h1>
      <h2>Batting: Team {battingTeam}</h2>

      <div className="scoreboard">
        <div className="team">
          <h2>Team A</h2>
          <p>Score: {teamA.runs}/{teamA.wickets}</p>
          <h3>Players:</h3>
          <ul>
            {teamA.players.map((player, index) => (
              <li key={index}>
                {player.name} - {player.runs} runs {player.out ? "❌ Out" : "🏏 Not Out"}
              </li>
            ))}
          </ul>
        </div>

        <div className="team">
          <h2>Team B</h2>
          <p>Score: {teamB.runs}/{teamB.wickets}</p>
          <h3>Players:</h3>
          <ul>
            {teamB.players.map((player, index) => (
              <li key={index}>
                {player.name} - {player.runs} runs {player.out ? "❌ Out" : "🏏 Not Out"}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="controls">
        <button onClick={() => updateScore(1)}>+1 Run</button>
        <button onClick={() => updateScore(4)}>+4 Runs</button>
        <button onClick={() => updateScore(6)}>+6 Runs</button>
        <button className="out" onClick={handleWicket}>Wicket ❌</button>
        <button className="switch" onClick={switchInnings}>Switch Innings</button>
        <button className="reset" onClick={resetMatch}>🔄 Reset Match</button>
      </div>
    </div>
  );
};

export default App;

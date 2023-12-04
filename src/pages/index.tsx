import { useState } from "react";

type Choice = "rock" | "paper" | "scissors";

const choices: Choice[] = ["rock", "paper", "scissors"];

const outcomes = {
  paper: { rock: 1, paper: 0, scissors: -1 },
  rock: { rock: 0, paper: -1, scissors: 1 },
  scissors: { rock: -1, paper: 1, scissors: 0 },
};

export default function Home() {
  const [userChoice, setUserChoice] = useState<Choice | null>(null);
  const [cpuChoice, setCpuChoice] = useState<Choice | null>(null);
  const [title, setTitle] = useState("");
  const [scores, setScores] = useState({ player: 0, bot: 0 });

  const handleUserChoice = (choice: Choice) => {
    setUserChoice(choice);
    const cpuRandoms = Math.floor(Math.random() * 3);
    const cpuRandomsChoice = choices[cpuRandoms];
    setCpuChoice(choices[cpuRandoms]);
    winner(choice, cpuRandomsChoice);
  };
  const winner = (usr: Choice, cpu: Choice) => {
    const outcome = outcomes[usr][cpu];
    if (outcome === 0) {
      setTitle("Tie");
    }
    if (outcome === 1) {
      setTitle("You won");
      setScores({ ...scores, player: scores.player + 1 });
    }
    if (outcome === -1) {
      setTitle("You lost");
      setScores({ ...scores, bot: scores.bot + 1 });
    }
  };

  return (
    <div className="h-screen grid place-items-center from-slate-200 bg-green-950 h-1080 w-1920">
      <div className="border-solid border-red-950 box-border h-100 w-150 p-4 border-4 bg-white">
        <h3 className="italic">ROSHAMBO</h3>
        <h1 className="italic">You({scores.player})</h1>
        <ul className="flex gap-4">
          <li
            className={`${userChoice !== "scissors" && "opacity-30 "} ${
              userChoice === null && "opacity-100 "
            }`}
            onClick={() => {
              handleUserChoice("scissors");
            }}
          >
            ✂️
          </li>
          <li
            className={`${userChoice !== "rock" && "opacity-30"} ${
              userChoice === null && "opacity-100"
            }`}
            onClick={() => {
              handleUserChoice("rock");
            }}
          >
            🪨
          </li>
          <li
            className={`${userChoice !== "paper" && "opacity-30"} ${
              userChoice === null && "opacity-100"
            }`}
            onClick={() => {
              handleUserChoice("paper");
            }}
          >
            📄
          </li>
        </ul>
        <h1 className="italic">BOT({scores.bot})</h1>
        <ul className="flex gap-4">
          <li
            className={`${cpuChoice !== "scissors" && "opacity-30"} ${
              cpuChoice === null && "opacity-100"
            }`}
          >
            ✂️
          </li>
          <li
            className={`${cpuChoice !== "rock" && "opacity-30"} ${
              cpuChoice === null && "opacity-100"
            }`}
          >
            🪨
          </li>
          <li
            className={`${cpuChoice !== "paper" && "opacity-30"} ${
              cpuChoice === null && "opacity-100"
            }`}
          >
            📄
          </li>
        </ul>
        <h1 className="italic">CPU Wins</h1>
      </div>
    </div>
  );
}

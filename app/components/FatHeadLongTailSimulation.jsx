"use client";

import { useRef, useState } from "react";

// Three participation styles — same survey, different energy levels.
const STUDENTS = [
  {
    id: "super",
    label: "Super Active Student",
    description: "Votes 20 times",
    targetVotes: 20,
    variant: "super",
  },
  {
    id: "normal",
    label: "Normal Student",
    description: "Votes 5 times",
    targetVotes: 5,
    variant: "normal",
  },
  {
    id: "busy",
    label: "Busy Student",
    description: "Votes only 1 time",
    targetVotes: 1,
    variant: "busy",
  },
];

const FINAL_MESSAGE =
  "Wiki Surveys do not require equal participation. Every contribution becomes useful data.";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function VoteBubbles({ total, filled, variant }) {
  return (
    <div className={`energy-vote-bubbles energy-vote-bubbles-${variant}`}>
      {Array.from({ length: total }, (_, index) => (
        <span
          key={index}
          className={`energy-vote-bubble ${index < filled ? "is-filled animate-popIn" : ""}`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

function StudentRow({ student, filledVotes, isRunning }) {
  const filled = filledVotes[student.id] ?? 0;

  return (
    <div className={`energy-student-card energy-student-${student.variant}`}>
      <div className="energy-student-header">
        <div className="energy-student-avatar" aria-hidden="true">
          {student.variant === "super" ? "⚡" : student.variant === "normal" ? "🙂" : "⏱"}
        </div>
        <div className="energy-student-copy">
          <h3 className="energy-student-name">{student.label}</h3>
          <p className="energy-student-desc">{student.description}</p>
        </div>
        <span className="energy-student-count">
          {filled}/{student.targetVotes}
        </span>
      </div>

      <VoteBubbles total={student.targetVotes} filled={filled} variant={student.variant} />

      {isRunning && filled === 0 && (
        <p className="energy-student-waiting">Waiting to vote…</p>
      )}
      {filled > 0 && filled < student.targetVotes && (
        <p className="energy-student-waiting">Voting…</p>
      )}
      {filled === student.targetVotes && (
        <p className="energy-student-done">Done — {filled} vote{filled > 1 ? "s" : ""} counted</p>
      )}
    </div>
  );
}

export default function FatHeadLongTailSimulation({ playSound }) {
  const [filledVotes, setFilledVotes] = useState({
    super: 0,
    normal: 0,
    busy: 0,
  });
  const [isRunning, setIsRunning] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const runTokenRef = useRef(0);

  const handleStartSimulation = async () => {
    if (isRunning) return;

    const runToken = runTokenRef.current + 1;
    runTokenRef.current = runToken;

    setIsRunning(true);
    setStatusMessage("");
    setFilledVotes({ super: 0, normal: 0, busy: 0 });
    playSound?.("click");

    // Fill each student's vote bubbles one at a time, student by student.
    for (const student of STUDENTS) {
      for (let vote = 1; vote <= student.targetVotes; vote += 1) {
        if (runTokenRef.current !== runToken) return;

        await sleep(student.variant === "super" ? 55 : student.variant === "normal" ? 90 : 120);
        setFilledVotes((prev) => ({ ...prev, [student.id]: vote }));
        playSound?.("vote");
      }
    }

    if (runTokenRef.current !== runToken) return;

    setStatusMessage(FINAL_MESSAGE);
    setIsRunning(false);
    playSound?.("unlock");
  };

  const totalVotes = Object.values(filledVotes).reduce((sum, count) => sum + count, 0);

  return (
    <div className="energy-simulation">
      <p className="energy-sim-caption animate-fadeIn">
        Different Students, Different Energy — same Wiki Survey, different participation levels.
      </p>

      <div className="energy-students-stack animate-fadeIn">
        {STUDENTS.map((student) => (
          <StudentRow
            key={student.id}
            student={student}
            filledVotes={filledVotes}
            isRunning={isRunning}
          />
        ))}
      </div>

      <div className="energy-controls animate-fadeIn">
        <button
          type="button"
          className="energy-start-btn"
          disabled={isRunning}
          onClick={handleStartSimulation}
          onMouseEnter={() => !isRunning && playSound?.("hover")}
        >
          {isRunning ? "Simulation running…" : "Start Participation Simulation"}
        </button>
        {totalVotes > 0 && !isRunning && (
          <span className="energy-total-pill">{totalVotes} total votes collected</span>
        )}
      </div>

      {statusMessage && (
        <p className="energy-status-message animate-popIn">{statusMessage}</p>
      )}
    </div>
  );
}

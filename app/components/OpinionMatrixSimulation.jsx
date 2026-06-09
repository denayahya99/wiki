"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const IDEAS = [
  { code: "A", label: "More practice sessions", short: "Practice sessions" },
  { code: "B", label: "Better transportation", short: "Transportation" },
  { code: "C", label: "Better study spaces", short: "Study spaces" },
];

const PAIRWISE_VOTES = [
  { student: "Student 1", pairs: ["A beats B", "A beats C", "C beats B"] },
  { student: "Student 2", pairs: ["B beats A", "C beats B", "C beats A"] },
  { student: "Student 3", pairs: ["A beats C", "A beats B", "B beats C"] },
];

const OPINION_MATRIX = [
  { student: "Student 1", A: 90, B: 40, C: 70 },
  { student: "Student 2", A: 30, B: 65, C: 95 },
  { student: "Student 3", A: 90, B: 60, C: 45 },
];

const FINAL_SCORES = [
  { code: "A", label: "Practice sessions", values: [90, 30, 90], score: 70 },
  { code: "B", label: "Transportation", values: [40, 65, 60], score: 55 },
  { code: "C", label: "Study spaces", values: [70, 95, 45], score: 70 },
];

const RANKING = [
  { label: "Practice sessions", score: 70 },
  { label: "Study spaces", score: 70 },
  { label: "Transportation", score: 55 },
];

const STEPS = [
  {
    title: "1. Three ideas",
    say: "We use only 3 ideas so students stay focused.",
    action: "continue",
  },
  {
    title: "2. Pairwise votes",
    say: "Students do not rank all ideas directly. They only choose between two ideas each time.",
    action: "continue",
  },
  {
    title: "3. Opinion matrix",
    say: "Each row is one student. Each column is one idea. Each number estimates how strongly that student values the idea.",
    action: "continue",
  },
  {
    title: "4. Final scores",
    say: "In the real article, the authors use a more advanced statistical model. For class, we average the matrix to get simple scores.",
    action: "complete",
  },
];

const FLOW_STAGES = [
  { id: "votes", label: "Pairwise Votes" },
  { id: "matrix", label: "Opinion Matrix" },
  { id: "scores", label: "Scores" },
  { id: "ranking", label: "Ranking" },
];

const OpinionMatrixContext = createContext(null);

function useOpinionMatrix() {
  const ctx = useContext(OpinionMatrixContext);
  if (!ctx) {
    throw new Error("OpinionMatrix components must be used within OpinionMatrixProvider");
  }
  return ctx;
}

function cellHeat(value) {
  const alpha = 0.15 + (value / 100) * 0.75;
  return `rgba(96, 165, 250, ${alpha})`;
}

export function OpinionMatrixProvider({ playSound, active = false, children }) {
  const [step, setStep] = useState(1);

  const currentStep = STEPS[step - 1];

  const resetSimulation = () => {
    setStep(1);
    playSound?.("theme");
  };

  const advanceStep = () => {
    setStep((prev) => Math.min(prev + 1, STEPS.length));
    playSound?.("click");
  };

  useEffect(() => {
    if (!active) setStep(1);
  }, [active]);

  const value = {
    step,
    currentStep,
    advanceStep,
    resetSimulation,
    IDEAS,
    PAIRWISE_VOTES,
    OPINION_MATRIX,
    FINAL_SCORES,
    RANKING,
  };

  if (!active) return children;

  return (
    <OpinionMatrixContext.Provider value={value}>
      {children}
    </OpinionMatrixContext.Provider>
  );
}

export function OpinionMatrixSidebar() {
  const { step, currentStep, advanceStep } = useOpinionMatrix();

  return (
    <div className="wiki-walkthrough-sidebar matrix-sidebar animate-fadeIn">
      <span className="eyebrow-badge">Act XII: Mathematics</span>
      <h1 className="cinematic-title">From Pairwise Votes to an Opinion Matrix</h1>
      <p className="subtitle">The matrix helps us estimate how much each student values each idea.</p>

      <div className="collab-step-guide animate-fadeIn">
        <div className="collab-step-badge">
          Step {step} / {STEPS.length}
        </div>
        <h2 className="collab-step-title">{currentStep?.title}</h2>
        <p className="collab-step-text">{currentStep?.say}</p>
      </div>

      {step < STEPS.length && (
        <button type="button" className="collab-continue-btn mt-2" onClick={advanceStep}>
          Continue
        </button>
      )}

      {step === STEPS.length && (
        <p className="matrix-final-note mt-2 animate-popIn">
          Pairwise votes → matrix → scores → ranking.
        </p>
      )}
    </div>
  );
}

function FlowPipeline({ step }) {
  const activeIndex = Math.min(step - 1, FLOW_STAGES.length - 1);

  return (
    <div className="matrix-flow-pipeline">
      {FLOW_STAGES.map((stage, index) => (
        <div key={stage.id} className="matrix-flow-segment-wrap">
          <div
            className={`matrix-flow-node ${index <= activeIndex ? "is-active" : ""} ${
              index === activeIndex ? "is-current" : ""
            }`}
          >
            <span className="matrix-flow-node-label">{stage.label}</span>
            {stage.id === "votes" && index <= activeIndex && (
              <span className="matrix-flow-node-detail">A beats B · C beats B · A beats C</span>
            )}
            {stage.id === "matrix" && index <= activeIndex && (
              <span className="matrix-flow-node-detail">Rows = students · Columns = ideas</span>
            )}
            {stage.id === "scores" && index <= activeIndex && (
              <span className="matrix-flow-node-detail">A = 70 · B = 55 · C = 70</span>
            )}
            {stage.id === "ranking" && index <= activeIndex && (
              <span className="matrix-flow-node-detail">Top campus ideas</span>
            )}
          </div>
          {index < FLOW_STAGES.length - 1 && (
            <span className={`matrix-flow-arrow ${index < activeIndex ? "is-active" : ""}`}>↓</span>
          )}
        </div>
      ))}
    </div>
  );
}

export function OpinionMatrixDashboard() {
  const {
    step,
    IDEAS,
    PAIRWISE_VOTES,
    OPINION_MATRIX,
    FINAL_SCORES,
    RANKING,
    resetSimulation,
  } = useOpinionMatrix();

  const maxScore = useMemo(
    () => Math.max(...FINAL_SCORES.map((item) => item.score), 1),
    []
  );

  return (
    <div className="graphics-opinion-matrix-sandbox">
      <div className="opinion-matrix-card animate-popIn">
        <p className="widget-caption">Opinion Matrix Made Simple</p>

        {step >= 1 && (
          <div className="matrix-section animate-fadeIn">
            <h3 className="matrix-section-title">Three ideas</h3>
            <div className="matrix-ideas-row">
              {IDEAS.map((idea) => (
                <div key={idea.code} className="matrix-idea-chip">
                  <span className="matrix-idea-code">{idea.code}</span>
                  <span className="matrix-idea-label">{idea.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {step >= 2 && (
          <div className="matrix-section animate-fadeIn">
            <h3 className="matrix-section-title">Pairwise votes</h3>
            <div className="matrix-table-wrap">
              <table className="matrix-data-table">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Pair 1</th>
                    <th>Pair 2</th>
                    <th>Pair 3</th>
                  </tr>
                </thead>
                <tbody>
                  {PAIRWISE_VOTES.map((row) => (
                    <tr key={row.student}>
                      <td>{row.student}</td>
                      {row.pairs.map((vote) => (
                        <td key={vote}>
                          <span className="matrix-vote-pill">{vote}</span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {step >= 3 && (
          <div className="matrix-section animate-fadeIn">
            <h3 className="matrix-section-title">Opinion matrix (0–100)</h3>
            <div className="matrix-table-wrap">
              <table className="matrix-data-table matrix-heatmap-table">
                <thead>
                  <tr>
                    <th>Respondent / Idea</th>
                    {IDEAS.map((idea) => (
                      <th key={idea.code}>
                        {idea.code}: {idea.short}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {OPINION_MATRIX.map((row) => (
                    <tr key={row.student}>
                      <td>{row.student}</td>
                      {IDEAS.map((idea) => (
                        <td key={idea.code}>
                          <span
                            className="matrix-heat-cell"
                            style={{ background: cellHeat(row[idea.code]) }}
                          >
                            {row[idea.code]}
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {step >= 4 && (
          <div className="matrix-section animate-fadeIn">
            <h3 className="matrix-section-title">Simple scores & ranking</h3>
            <div className="matrix-table-wrap">
              <table className="matrix-data-table">
                <thead>
                  <tr>
                    <th>Idea</th>
                    <th>Matrix values</th>
                    <th>Simple score</th>
                  </tr>
                </thead>
                <tbody>
                  {FINAL_SCORES.map((row) => (
                    <tr key={row.code}>
                      <td>
                        {row.code}: {row.label}
                      </td>
                      <td>{row.values.join(", ")}</td>
                      <td>
                        <strong>{row.score}</strong>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="matrix-ranking-list">
              <span className="matrix-ranking-title">Final ranking</span>
              {RANKING.map((item, index) => (
                <div key={item.label} className="matrix-ranking-row">
                  <span className="matrix-rank-num">{index + 1}</span>
                  <span className="matrix-rank-label">{item.label}</span>
                  <div className="matrix-rank-bar-track">
                    <span
                      className="matrix-rank-bar-fill"
                      style={{ width: `${(item.score / maxScore) * 100}%` }}
                    />
                  </div>
                  <span className="matrix-rank-score">{item.score}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <FlowPipeline step={step} />

        <button type="button" className="reset-collaborative-btn matrix-reset-btn" onClick={resetSimulation}>
          Reset
        </button>
      </div>
    </div>
  );
}

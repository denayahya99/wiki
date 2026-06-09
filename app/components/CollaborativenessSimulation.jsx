"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const RESEARCHER_SEEDS = [
  "Parking",
  "Cafeteria",
  "Wi-Fi",
  "Study Rooms",
  "Bus Access",
];

const GUIDED_CHIPS = [
  "More charging stations",
  "Mental health support",
  "Better elevators",
];

const CUSTOM_IDEA_EXAMPLE = "More quiet study areas";

const EMPTY_SLOTS = ["—", "—", "—", "—", "—"];

const STEPS = [
  {
    id: 1,
    title: "1. Researcher seeds",
    say: "The researcher starts with basic seed ideas.",
    pointer: "Right: Parking, Cafeteria, Wi-Fi, Study Rooms, Bus Access.",
    deep: "Structure helps — but not everything students care about.",
    action: "continue",
  },
  {
    id: 2,
    title: "2. First student idea",
    say: "A student adds: more charging stations.",
    explain: "Not on the original list — but still important.",
    action: "chip",
    target: "More charging stations",
  },
  {
    id: 3,
    title: "3. Second student idea",
    say: "Another student adds mental health support.",
    deep: "Students bring needs researchers may miss.",
    action: "chip",
    target: "Mental health support",
  },
  {
    id: 4,
    title: "4. Third student idea",
    say: "Better elevators — a practical campus problem.",
    comic: "Slow elevator? Time to rethink your degree.",
    action: "chip",
    target: "Better elevators",
  },
  {
    id: 5,
    title: "5. Custom idea",
    say: "Type a new idea — the survey can grow.",
    action: "custom",
    target: CUSTOM_IDEA_EXAMPLE,
  },
  {
    id: 6,
    title: "6. Progress bar",
    say: "Collaboration % rises — the survey becomes participant-built.",
    action: "complete",
  },
];

const CollaborativenessContext = createContext(null);

function useCollaborativeness() {
  const ctx = useContext(CollaborativenessContext);
  if (!ctx) {
    throw new Error("Collaborativeness components must be used within CollaborativenessProvider");
  }
  return ctx;
}

export function CollaborativenessProvider({ playSound, active = false, children }) {
  const [step, setStep] = useState(1);
  const [studentIdeas, setStudentIdeas] = useState(EMPTY_SLOTS);
  const [inputText, setInputText] = useState("");

  const filledIdeas = useMemo(
    () => studentIdeas.filter((idea) => idea !== "—"),
    [studentIdeas]
  );
  const filledCount = filledIdeas.length;

  const collaborationPercent = useMemo(() => {
    const total = RESEARCHER_SEEDS.length + filledCount;
    if (total === 0) return 0;
    return Math.round((filledCount / total) * 100);
  }, [filledCount]);

  const currentStep = STEPS[step - 1];

  const resetSimulation = () => {
    setStep(1);
    setStudentIdeas(EMPTY_SLOTS);
    setInputText("");
    playSound?.("theme");
  };

  const advanceStep = () => {
    setStep((prev) => Math.min(prev + 1, STEPS.length));
  };

  const addStudentIdea = (rawText) => {
    const text = rawText.trim();
    if (!text) return false;

    let added = false;
    setStudentIdeas((prev) => {
      if (prev.includes(text)) return prev;
      const next = [...prev];
      const emptyIndex = next.findIndex((idea) => idea === "—");
      if (emptyIndex === -1) return prev;
      next[emptyIndex] = text;
      added = true;
      return next;
    });

    if (added) playSound?.("click");
    return added;
  };

  const handleContinueStep = () => {
    if (step !== 1) return;
    playSound?.("click");
    advanceStep();
  };

  const handleChipClick = (idea) => {
    if (currentStep?.action !== "chip" || currentStep.target !== idea) return;
    if (!addStudentIdea(idea)) return;
    advanceStep();
  };

  const handleCustomSubmit = (event) => {
    event.preventDefault();
    if (step !== 5) return;
    if (!addStudentIdea(inputText)) return;
    setInputText("");
    advanceStep();
  };

  const value = {
    step,
    currentStep,
    studentIdeas,
    filledCount,
    collaborationPercent,
    inputText,
    setInputText,
    resetSimulation,
    handleContinueStep,
    handleChipClick,
    handleCustomSubmit,
    RESEARCHER_SEEDS,
    GUIDED_CHIPS,
    CUSTOM_IDEA_EXAMPLE,
  };

  useEffect(() => {
    if (!active) {
      setStep(1);
      setStudentIdeas(EMPTY_SLOTS);
      setInputText("");
    }
  }, [active]);

  if (!active) {
    return children;
  }

  return (
    <CollaborativenessContext.Provider value={value}>
      {children}
    </CollaborativenessContext.Provider>
  );
}

export function CollaborativenessSidebar() {
  const {
    step,
    currentStep,
    studentIdeas,
    inputText,
    setInputText,
    handleContinueStep,
    handleChipClick,
    handleCustomSubmit,
    GUIDED_CHIPS,
    CUSTOM_IDEA_EXAMPLE,
  } = useCollaborativeness();

  const isChipStep = currentStep?.action === "chip";
  const isCustomStep = step === 5;

  return (
    <div className="wiki-walkthrough-sidebar collaborative-sidebar animate-fadeIn">
      <span className="eyebrow-badge">Act VII: Principle Two — Collaborativeness</span>
      <h1 className="cinematic-title">Researcher Starts, Students Complete</h1>

      <div className="collab-step-guide animate-fadeIn">
        <div className="collab-step-badge">
          Step {step} / {STEPS.length}
        </div>
        <h2 className="collab-step-title">{currentStep?.title}</h2>

        <div className="collab-step-block">
          <p className="collab-step-text">{currentStep?.say}</p>
        </div>

        {currentStep?.pointer && (
          <div className="collab-step-block">
            <p className="collab-step-text collab-step-muted">{currentStep.pointer}</p>
          </div>
        )}

        {currentStep?.explain && (
          <div className="collab-step-block">
            <p className="collab-step-text">{currentStep.explain}</p>
          </div>
        )}

        {currentStep?.deep && (
          <div className="collab-step-block collab-step-deep">
            <p className="collab-step-text">{currentStep.deep}</p>
          </div>
        )}

        {currentStep?.comic && (
          <div className="collab-step-block collab-step-comic">
            <p className="collab-step-text">{currentStep.comic}</p>
          </div>
        )}
      </div>

      <div className="stepper-content-body mt-2">
        {step === 1 ? (
          <button
            type="button"
            className="collab-continue-btn"
            onClick={handleContinueStep}
          >
            Continue
          </button>
        ) : (
          <>
            <p className="step-normal-txt font-bold collab-action-label">
              {isCustomStep
                ? `Type "${CUSTOM_IDEA_EXAMPLE}" → Add`
                : isChipStep
                  ? `Click: ${currentStep.target}`
                  : step === 6
                    ? "Check the progress bar →"
                    : ""}
            </p>

            <div className="student-chips-grid">
              {GUIDED_CHIPS.map((idea) => {
                const isAdded = studentIdeas.includes(idea);
                const isTarget = isChipStep && currentStep?.target === idea;
                const isEnabled = isTarget && !isAdded;

                return (
                  <button
                    key={idea}
                    type="button"
                    className={`student-chip-btn ${isAdded ? "added" : ""} ${isTarget ? "is-target" : ""}`}
                    disabled={!isEnabled}
                    onClick={() => handleChipClick(idea)}
                  >
                    {idea}
                  </button>
                );
              })}
            </div>

            <form onSubmit={handleCustomSubmit} className="custom-collaborative-input-row mt-3">
              <input
                type="text"
                className="glow-text-input"
                placeholder={
                  isCustomStep
                    ? `Try: ${CUSTOM_IDEA_EXAMPLE}`
                    : "Unlocks in Step 5"
                }
                value={inputText}
                onChange={(event) => setInputText(event.target.value)}
                disabled={!isCustomStep}
                maxLength={40}
              />
              <button
                type="submit"
                className="add-custom-idea-btn"
                disabled={!isCustomStep || inputText.trim() === ""}
              >
                Add
              </button>
            </form>
          </>
        )}

        <div className="collaborative-meaning-card mt-3">
          <p className="meaning-txt">
            <strong>Collaborative</strong> = researcher + participants build the survey together.
          </p>
        </div>
      </div>
    </div>
  );
}

export function CollaborativenessDashboard() {
  const {
    step,
    studentIdeas,
    filledCount,
    collaborationPercent,
    resetSimulation,
    RESEARCHER_SEEDS,
  } = useCollaborativeness();

  const highlightSeeds = step === 1;
  const highlightProgress = step >= 6;

  return (
    <div className="graphics-collaborative-queue-sandbox">
      <div className="collaborative-dashboard-card animate-popIn">
        <p className="widget-caption">Co-Creation Table</p>

        <div className="collaborative-comparative-grid">
          <div
            className={`comparative-column researcher-column ${highlightSeeds ? "is-highlighted" : ""}`}
          >
            <div className="col-header">
              <span className="col-header-icon" aria-hidden="true">
                🎓
              </span>
              Researcher Seeds
            </div>
            <div className="ideas-pills-list">
              {RESEARCHER_SEEDS.map((idea, index) => (
                <div key={idea} className="idea-pill-row researcher-pill">
                  <span className="pill-index">{index + 1}</span>
                  <span className="pill-text">{idea}</span>
                </div>
              ))}
            </div>
            {highlightSeeds && (
              <p className="collab-dashboard-hint animate-popIn">
                Structure first — not the whole story.
              </p>
            )}
          </div>

          <div className="comparative-column student-column">
            <div className="col-header">
              <span className="col-header-icon" aria-hidden="true">
                🙋
              </span>
              Student Ideas
            </div>
            <div className="ideas-pills-list">
              {studentIdeas.map((idea, index) => {
                const isEmpty = idea === "—";
                return (
                  <div
                    key={`${idea}-${index}`}
                    className={`idea-pill-row student-pill ${
                      isEmpty ? "empty-slot-pill" : "filled-slot-pill animate-popIn"
                    }`}
                  >
                    <span className="pill-index">{index + 1}</span>
                    <span className="pill-text">{idea}</span>
                    {!isEmpty && <span className="badge-new-item">ADDED</span>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div
          className={`collaborative-dashboard-footer mt-4 ${
            highlightProgress ? "is-highlighted" : ""
          }`}
        >
          <div className="co-creation-meter-container">
            <div className="meter-header">
              <span>Collaboration:</span>
              <strong className="text-yellow-glow">{collaborationPercent}%</strong>
            </div>
            <div className="co-creation-progress-bar">
              <div
                className="co-creation-progress-fill"
                style={{ width: `${collaborationPercent}%` }}
              />
            </div>
            <span className="meter-subtext">
              {filledCount} student · {RESEARCHER_SEEDS.length + filledCount} total ideas
            </span>
            {highlightProgress && (
              <p className="collab-progress-note animate-popIn">
                More participant-built, less researcher-only.
              </p>
            )}
          </div>

          <button
            type="button"
            className="reset-collaborative-btn"
            onClick={resetSimulation}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

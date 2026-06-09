"use client";

import { useMemo, useState } from "react";
import { ClipboardList } from "lucide-react";

// --- Simulation configuration (campus improvement example) ---
const SIM_STEPS = 8;

const MAIN_QUESTION =
  "What is the most important thing that needs to be improved on campus?";

const INITIAL_IDEAS = [
  "Parking",
  "Wi-Fi",
  "Cafeteria",
  "Library Hours",
  "Study Rooms",
  "Bus Access",
  "More Shade",
  "Course Schedule",
];

// First voting round: three fixed pairs shown one after another.
const START_PAIRWISE = [
  { a: "Parking", b: "Wi-Fi" },
  { a: "Cafeteria", b: "Library Hours" },
  { a: "Study Rooms", b: "Bus Access" },
];

const SPEECH_BUBBLES = [
  "A closed survey gives me boxes. A Wiki Survey gives me a voice.",
  "Parking is not just an option. It is a daily campus challenge.",
  "Now my idea can join the survey, not just stay in my head.",
];

const STEP_COPY = [
  {
    title: "Step 1: Show the Open Question",
    body:
      "Researchers start with one open question. Participants will answer it through simple pairwise choices instead of one long essay.",
  },
  {
    title: "Step 2: Show Initial Ideas",
    body:
      "Researchers prepare a starting list of ideas. This list is helpful, but it is not final.",
  },
  {
    title: "Step 3: Pairwise Voting",
    body:
      "Show two ideas at a time. Each click counts as one vote. After each vote, the next pair appears automatically.",
  },
  {
    title: "Step 4: Add a New Idea",
    body:
      "After several votes, participants can submit one or more missing ideas. Add as many as you like — each one is reviewed before becoming active.",
  },
  {
    title: "Step 5: Moderation",
    body:
      "Review each submitted idea. The checklist is a guide only — you decide whether to approve or reject every idea.",
  },
  {
    title: "Step 6: Continue Voting",
    body:
      "After approval, the new idea appears in future pairwise comparisons with the other campus ideas.",
  },
  {
    title: "Step 7: Calculate Scores",
    body:
      "Click Calculate Results to turn every pairwise win into a score. Ideas are sorted from highest to lowest.",
  },
  {
    title: "Step 8: Explanation",
    body:
      "Wiki Surveys stay open because people can add ideas. They stay quantifiable because every vote can be counted.",
  },
];

const EXPLANATION =
  "Wiki Surveys are open because participants can add new ideas. They are quantifiable because every pairwise vote can be counted and turned into scores.";

function buildWinMap(ideas) {
  return Object.fromEntries(ideas.map((idea) => [idea, 0]));
}

function getSpeechForStep(step) {
  if (step <= 2) return SPEECH_BUBBLES[0];
  if (step === 3 || step === 6) return SPEECH_BUBBLES[1];
  return SPEECH_BUBBLES[2];
}

function getModerationChecks(idea, activeIdeas) {
  if (!idea) {
    return { notEmpty: false, notDuplicate: false, related: false };
  }

  return {
    notEmpty: idea.trim().length > 0,
    notDuplicate: !activeIdeas.some(
      (existing) => existing.toLowerCase() === idea.toLowerCase()
    ),
    related:
      /campus|student|library|study|wifi|parking|cafeteria|bus|shade|course|health|access|room|food|transport|class/i.test(
        idea
      ) || idea.trim().length > 8,
  };
}

export default function WikiSurveySimulation({ playSound }) {
  const [step, setStep] = useState(1);
  const [pairIndex, setPairIndex] = useState(0);
  const [phaseThreeComplete, setPhaseThreeComplete] = useState(false);
  const [phaseSixComplete, setPhaseSixComplete] = useState(false);
  const [newIdeaInput, setNewIdeaInput] = useState("");
  const [submittedIdeas, setSubmittedIdeas] = useState([]);
  const [submissionNotice, setSubmissionNotice] = useState("");
  const [ideaDecisions, setIdeaDecisions] = useState({});
  const [approvedIdeas, setApprovedIdeas] = useState([]);
  const [activeIdeas, setActiveIdeas] = useState(INITIAL_IDEAS);
  const [winCounts, setWinCounts] = useState(() => buildWinMap(INITIAL_IDEAS));
  const [resultsVisible, setResultsVisible] = useState(false);
  const [lastVoteLabel, setLastVoteLabel] = useState("");

  // Pairs used after moderation — include every approved participant idea.
  const continuedPairs = useMemo(() => {
    if (approvedIdeas.length === 0) return [];

    const pairs = [];
    approvedIdeas.forEach((idea) => {
      pairs.push({ a: idea, b: "Parking" });
      pairs.push({ a: idea, b: "Wi-Fi" });
      pairs.push({ a: idea, b: "Study Rooms" });
    });

    return pairs.slice(0, 6);
  }, [approvedIdeas]);

  const currentPairs = step === 6 ? continuedPairs : START_PAIRWISE;
  const currentPair = currentPairs[pairIndex] ?? null;

  const sortedScores = useMemo(() => {
    return Object.entries(winCounts)
      .map(([name, wins]) => ({ name, wins }))
      .sort((a, b) => b.wins - a.wins);
  }, [winCounts]);

  const maxWins = Math.max(1, ...sortedScores.map((row) => row.wins));

  const goToStep = (nextStep) => {
    setStep(nextStep);
    if (nextStep === 3) {
      setPairIndex(0);
      setPhaseThreeComplete(false);
      setLastVoteLabel("");
    }
    if (nextStep === 6) {
      setPairIndex(0);
      setPhaseSixComplete(false);
      setLastVoteLabel("");
    }
    if (nextStep === 7) setResultsVisible(false);
    playSound("click");
  };

  // Register one pairwise vote and advance to the next pair.
  const handlePairVote = (winner, pair) => {
    setWinCounts((prev) => ({
      ...prev,
      [winner]: (prev[winner] ?? 0) + 1,
    }));
    setLastVoteLabel(`Vote counted for ${winner}.`);
    playSound("click");

    const nextIndex = pairIndex + 1;
    if (nextIndex >= currentPairs.length) {
      if (step === 3) setPhaseThreeComplete(true);
      if (step === 6) setPhaseSixComplete(true);
      return;
    }

    window.setTimeout(() => setPairIndex(nextIndex), 280);
  };

  const handleSubmitIdea = (event) => {
    event.preventDefault();
    const trimmed = newIdeaInput.trim();
    if (!trimmed) return;

    const duplicateInQueue = submittedIdeas.some(
      (idea) => idea.toLowerCase() === trimmed.toLowerCase()
    );
    const duplicateInActive = activeIdeas.some(
      (idea) => idea.toLowerCase() === trimmed.toLowerCase()
    );

    if (duplicateInQueue || duplicateInActive) {
      setSubmissionNotice("That idea is already on the list.");
      playSound("click");
      return;
    }

    setSubmittedIdeas((prev) => [...prev, trimmed]);
    setNewIdeaInput("");
    setSubmissionNotice("New idea submitted. It will be reviewed before becoming active.");
    playSound("click");
  };

  const handleApproveIdea = (idea) => {
    setIdeaDecisions((prev) => ({ ...prev, [idea]: "approved" }));

    if (!approvedIdeas.includes(idea)) {
      setApprovedIdeas((prev) => [...prev, idea]);
    }

    const alreadyActive = activeIdeas.some(
      (existing) => existing.toLowerCase() === idea.toLowerCase()
    );
    if (!alreadyActive) {
      setActiveIdeas((prev) => [...prev, idea]);
      setWinCounts((prev) => ({ ...prev, [idea]: prev[idea] ?? 0 }));
    }

    playSound("click");
  };

  const handleRejectIdea = (idea) => {
    setIdeaDecisions((prev) => ({ ...prev, [idea]: "rejected" }));
    setApprovedIdeas((prev) => prev.filter((item) => item !== idea));

    if (!INITIAL_IDEAS.some((existing) => existing.toLowerCase() === idea.toLowerCase())) {
      setActiveIdeas((prev) =>
        prev.filter((item) => item.toLowerCase() !== idea.toLowerCase())
      );
      setWinCounts((prev) => {
        const next = { ...prev };
        delete next[idea];
        return next;
      });
    }

    playSound("click");
  };

  const getIdeaDecision = (idea) => ideaDecisions[idea] ?? "pending";
  const rejectedCount = submittedIdeas.filter((idea) => getIdeaDecision(idea) === "rejected").length;

  const renderPairwise = () => {
    if (!currentPair) {
      return <p className="wiki-visual-caption">All comparison pairs completed for this phase.</p>;
    }

    return (
      <div className="pairwise-question-card wiki-sim-transition">
        <h3 className="comparison-prompt">Which is more important?</h3>
        <div className="pairwise-cards-container">
          <div className="comparison-layout animate-popIn" key={`${step}-${pairIndex}`}>
            <button
              type="button"
              className="pairwise-vote-card side-a"
              onClick={() => handlePairVote(currentPair.a, currentPair)}
            >
              <span className="card-letter">A</span>
              <p className="card-txt">{currentPair.a}</p>
            </button>
            <div className="vs-divider-pill">VS</div>
            <button
              type="button"
              className="pairwise-vote-card side-b"
              onClick={() => handlePairVote(currentPair.b, currentPair)}
            >
              <span className="card-letter">B</span>
              <p className="card-txt">{currentPair.b}</p>
            </button>
          </div>
        </div>
        {lastVoteLabel && <p className="round-result-note">{lastVoteLabel}</p>}
        <p className="wiki-visual-caption">
          Pair {Math.min(pairIndex + 1, currentPairs.length)} of {currentPairs.length}
        </p>
      </div>
    );
  };

  const renderStage = () => {
    switch (step) {
      case 1:
        return (
          <div className="step-open-question wiki-sim-transition animate-fadeIn">
            <div className="visual-badge">
              <ClipboardList size={14} /> Open Question
            </div>
            <div className="wiki-question-card">
              <p className="wiki-question-en">{MAIN_QUESTION}</p>
            </div>
            <p className="wiki-visual-caption">
              One open question starts the Wiki Survey.
            </p>
          </div>
        );

      case 2:
        return (
          <div className="step-initial-options wiki-sim-transition animate-fadeIn">
            <div className="visual-badge">
              <ClipboardList size={14} /> Initial Ideas ({INITIAL_IDEAS.length})
            </div>
            <div className="options-grid">
              {INITIAL_IDEAS.map((idea, idx) => (
                <div
                  key={idea}
                  className="option-tile animate-popIn"
                  style={{ "--delay": `${idx * 40}ms` }}
                >
                  <span className="tile-num">{idx + 1}</span>
                  <span className="tile-txt">{idea}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="step-pairwise-simulator wiki-sim-transition animate-fadeIn">
            <div className="visual-badge">
              <ClipboardList size={14} /> Pairwise Voting
            </div>
            {renderPairwise()}
            {phaseThreeComplete && (
              <p className="wiki-success-note">Great! You finished the first voting round.</p>
            )}
          </div>
        );

      case 4:
        return (
          <div className="step-add-idea wiki-sim-transition animate-fadeIn">
            <div className="visual-badge">
              <ClipboardList size={14} /> Add Your Idea
            </div>
            <form onSubmit={handleSubmitIdea} className="custom-collaborative-input-row">
              <input
                type="text"
                className="glow-text-input"
                placeholder="Add your own idea…"
                value={newIdeaInput}
                onChange={(event) => setNewIdeaInput(event.target.value)}
                maxLength={70}
              />
              <button type="submit" className="add-custom-idea-btn" disabled={!newIdeaInput.trim()}>
                Submit
              </button>
            </form>
            {submissionNotice && (
              <p className="wiki-submission-notice animate-popIn">{submissionNotice}</p>
            )}
            {submittedIdeas.length > 0 && (
              <div className="wiki-submitted-ideas-list">
                <p className="wiki-visual-caption">Your submitted ideas:</p>
                {submittedIdeas.map((idea) => (
                  <div key={idea} className="wiki-submitted-idea-row animate-popIn">
                    <span>{idea}</span>
                  </div>
                ))}
                <p className="wiki-visual-caption">Keep typing above to add more ideas.</p>
              </div>
            )}
          </div>
        );

      case 5:
        return (
          <div className="step-filter-ideas wiki-sim-transition animate-fadeIn">
            <div className="visual-badge">
              <ClipboardList size={14} /> Moderation
            </div>
            <p className="wiki-visual-caption">
              You decide for each idea. The checks below are only suggestions.
            </p>
            {submittedIdeas.length === 0 ? (
              <p className="wiki-visual-caption">Submit at least one idea in Step 4 first.</p>
            ) : (
              <div className="wiki-review-grid scrollable">
                {submittedIdeas.map((idea) => {
                  const checks = getModerationChecks(idea, activeIdeas);
                  const decision = getIdeaDecision(idea);

                  return (
                    <div
                      key={idea}
                      className={`wiki-review-card ${decision === "approved" ? "is-approved" : ""} ${decision === "rejected" ? "is-rejected" : ""}`}
                    >
                      <div className="wiki-review-card-header">
                        <p className="wiki-review-idea">{idea}</p>
                        {decision === "approved" && (
                          <span className="wiki-review-status approved">Approved</span>
                        )}
                        {decision === "rejected" && (
                          <span className="wiki-review-status rejected">Rejected</span>
                        )}
                        {decision === "pending" && (
                          <span className="wiki-review-status pending">Pending</span>
                        )}
                      </div>
                      <ul className="wiki-check-list compact">
                        <li className={checks.notEmpty ? "pass" : "fail"}>Not empty</li>
                        <li className={checks.notDuplicate ? "pass" : "fail"}>Not duplicate</li>
                        <li className={checks.related ? "pass" : "fail"}>
                          Related to campus improvement
                        </li>
                      </ul>
                      <div className="wiki-moderation-actions">
                        <button
                          type="button"
                          className={`wiki-approve-btn ${decision === "approved" ? "is-active" : ""}`}
                          onClick={() => handleApproveIdea(idea)}
                        >
                          Approve Idea
                        </button>
                        <button
                          type="button"
                          className={`wiki-reject-btn ${decision === "rejected" ? "is-active" : ""}`}
                          onClick={() => handleRejectIdea(idea)}
                        >
                          Reject Idea
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            {(approvedIdeas.length > 0 || rejectedCount > 0) && (
              <p className="wiki-success-note">
                {approvedIdeas.length} approved
                {rejectedCount > 0 ? ` · ${rejectedCount} rejected` : ""}
              </p>
            )}
          </div>
        );

      case 6:
        return (
          <div className="step-pairwise-simulator wiki-sim-transition animate-fadeIn">
            <div className="visual-badge">
              <ClipboardList size={14} /> Continue Voting
            </div>
            {approvedIdeas.length === 0 ? (
              <p className="wiki-visual-caption">Approve at least one idea in Step 5 first.</p>
            ) : (
              <>
                {renderPairwise()}
                {phaseSixComplete && (
                  <p className="wiki-success-note">
                    Your new ideas are now part of the voting process.
                  </p>
                )}
              </>
            )}
          </div>
        );

      case 7:
        return (
          <div className="step-score-table wiki-sim-transition animate-fadeIn">
            <div className="visual-badge">
              <ClipboardList size={14} /> Calculate Results
            </div>
            <button
              type="button"
              className="wiki-calculate-btn"
              onClick={() => {
                setResultsVisible(true);
                playSound("click");
              }}
            >
              Calculate Results
            </button>
            {resultsVisible && (
              <div className="wiki-bar-chart animate-fadeIn">
                {sortedScores.map((row) => (
                  <div key={row.name} className="wiki-bar-row">
                    <span className="wiki-bar-label">{row.name}</span>
                    <div className="wiki-bar-track">
                      <div
                        className="wiki-bar-fill"
                        style={{ width: `${(row.wins / maxWins) * 100}%` }}
                      />
                    </div>
                    <span className="wiki-bar-score">{row.wins}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 8:
        return (
          <div className="step-new-ideas-analysis wiki-sim-transition animate-fadeIn">
            <div className="visual-badge">
              <ClipboardList size={14} /> Final Explanation
            </div>
            {resultsVisible ? (
              <div className="wiki-bar-chart compact">
                {sortedScores.slice(0, 6).map((row) => (
                  <div key={row.name} className="wiki-bar-row">
                    <span className="wiki-bar-label">{row.name}</span>
                    <div className="wiki-bar-track">
                      <div
                        className="wiki-bar-fill"
                        style={{ width: `${(row.wins / maxWins) * 100}%` }}
                      />
                    </div>
                    <span className="wiki-bar-score">{row.wins}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="wiki-visual-caption">Run Step 7 first to generate the chart.</p>
            )}
            <p className="wiki-final-explanation">{EXPLANATION}</p>
          </div>
        );

      default:
        return null;
    }
  };

  const canGoNext =
    (step === 1) ||
    (step === 2) ||
    (step === 3 && phaseThreeComplete) ||
    (step === 4 && submittedIdeas.length > 0) ||
    (step === 5 && approvedIdeas.length > 0) ||
    (step === 6 && phaseSixComplete) ||
    (step === 7 && resultsVisible) ||
    step === 8;

  return (
    <div className="wiki-sim-layout">
      <header className="wiki-sim-header">
        <span className="eyebrow-badge">Act III: The Solution</span>
        <h1 className="cinematic-title">What Are Wiki Surveys?</h1>
        <p className="subtitle wiki-sim-subtitle">
          Wiki Surveys combine openness with quantification.
        </p>
      </header>

      <div className="wiki-sim-step-bar" aria-label="Simulation steps">
        <div className="wiki-sim-step-toolbar">
          <span className="wiki-sim-step-label">
            Step {step} / {SIM_STEPS}
          </span>

          <nav className="wiki-sim-step-nav" aria-label="Step navigation">
            <div className="stepper-dots-container wiki-sim-step-dots">
              {Array.from({ length: SIM_STEPS }, (_, index) => index + 1).map((stepNumber) => (
                <button
                  key={stepNumber}
                  type="button"
                  className={`stepper-dot-btn ${step === stepNumber ? "active" : ""}`}
                  onClick={() => goToStep(stepNumber)}
                  aria-label={`Go to step ${stepNumber}`}
                  aria-current={step === stepNumber ? "step" : undefined}
                >
                  {stepNumber}
                </button>
              ))}
            </div>
          </nav>

          <div className="stepper-navigation-bar wiki-sim-step-nav-buttons">
            <button
              type="button"
              className="stepper-nav-btn prev"
              disabled={step === 1}
              onClick={() => goToStep(step - 1)}
            >
              ← Prev
            </button>
            <button
              type="button"
              className="stepper-nav-btn next"
              disabled={step === SIM_STEPS || !canGoNext}
              onClick={() => goToStep(step + 1)}
            >
              Next →
            </button>
          </div>
        </div>

        <div className="wiki-sim-progress-track">
          <span
            className="wiki-sim-progress-fill"
            style={{ width: `${(step / SIM_STEPS) * 100}%` }}
          />
        </div>

        <div className="wiki-sim-step-copy animate-fadeIn" key={step}>
          <h3 className="step-title-text">{STEP_COPY[step - 1].title}</h3>
          <p className="step-normal-txt">{STEP_COPY[step - 1].body}</p>
        </div>
      </div>

      <div className="wiki-sim-stage">
        <div className="wiki-sim-interactive-row">
          <div className="wiki-sim-avatar-panel">
            <div className="wiki-student-guide animate-fadeIn" key={step}>
              <div className="wiki-student-bubble">
                <p>{getSpeechForStep(step)}</p>
                <span className="bubble-tail" />
              </div>
              <img src="/dina_memoji.png" alt="Student avatar" className="wiki-student-avatar" />
              <span className="wiki-student-label">Student</span>
            </div>
          </div>

          <div className="wiki-sim-sandbox-panel">
            <div className="graphics-solution-sandbox wiki-step-sandbox">{renderStage()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

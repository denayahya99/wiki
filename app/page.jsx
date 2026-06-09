"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import {
  GraduationCap,
  ClipboardList,
  Mic,
  MessageSquare,
  BarChart2,
  AlertTriangle,
  MousePointerClick,
  CheckCircle2,
  XCircle,
  Car,
  UtensilsCrossed,
  Wifi,
  BookOpen,
  Sun,
  Moon,
  Palette,
  Sparkles,
  Zap,
  Compass,
  Snowflake,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
} from "lucide-react";
import WikiSurveySimulation from "./components/WikiSurveySimulation";
import FatHeadLongTailSimulation from "./components/FatHeadLongTailSimulation";
import {
  CollaborativenessProvider,
  CollaborativenessSidebar,
  CollaborativenessDashboard,
} from "./components/CollaborativenessSimulation";
import {
  OpinionMatrixProvider,
  OpinionMatrixSidebar,
  OpinionMatrixDashboard,
} from "./components/OpinionMatrixSimulation";

const slides = [
  {
    eyebrow: "Research Methods — Seminar",
    title: "Wiki Surveys: Open and Quantifiable Social Data Collection",
    subtitle: "Presenting the research method used in the article",
    actor: "dina",
    scene: "cover",
    points: [],
    closing: "Interaction: What do you think a Wiki Survey means before we explain it?"
  },
  {
    eyebrow: "Act I.A: Campus Example",
    title: "Closed Survey — Campus Improvement",
    subtitle: "Imagine the university asks: What is the most important thing that needs to be improved on campus?",
    actor: "student",
    scene: "campus_closed_survey",
    points: [],
    closing: "Interaction: Try selecting your answer below!"
  },
  {
    eyebrow: "Act I.B: Campus Example",
    title: "Open Interview — Campus Improvement",
    subtitle: "Imagine the university asks: What is the most important thing that needs to be improved on campus?",
    actor: "student",
    scene: "campus_open_interview",
    points: [],
    closing: "Interaction: Think about what you would say!"
  },
  {
    eyebrow: "Act I: Introduction",
    title: "The Problem in Traditional Data Collection",
    subtitle: "The article tries to solve this methodological tension.",
    actor: "happy",
    scene: "intro_splash",
    points: [
      "Closed surveys are easy to analyze but restrict participants.",
      "Open interviews allow unexpected ideas but are harder to quantify.",
      "Researchers need a method that is both open and measurable."
    ],
    closing: "Interaction: Would you prefer answering fixed options or writing your own answer? Why?"
  },
  {
    eyebrow: "Act II: The Dilemma",
    title: "Closed Surveys vs. Open Interviews",
    subtitle: "Each method has strengths and weaknesses.",
    actor: "puzzled",
    scene: "problem",
    points: [
      "Closed surveys: Predefined answers, easy to count and compare, limited by the researcher's assumptions.",
      "Open interviews: Rich, personal, unexpected answers, harder to analyze statistically, time-consuming."
    ],
    closing: "Interaction: Give a quick example: 'What do students need most?' and compare fixed answers vs. open answers."
  },
  {
    eyebrow: "Act III: The Solution",
    title: "What Are Wiki Surveys?",
    subtitle: "Wiki Surveys combine openness with quantification.",
    actor: "idea",
    scene: "solution",
    points: [
      "A new type of research instrument.",
      "Inspired by Wikipedia and traditional survey research.",
      "Respondents can answer and also contribute new ideas.",
      "The survey evolves over time."
    ],
    closing: "Interaction: How is this similar to Wikipedia?"
  },
  {
    eyebrow: "Act IV: The Inspiration",
    title: "From Wikipedia to Survey Research",
    subtitle: "The survey becomes collaborative, not fully researcher-controlled.",
    actor: "idea",
    scene: "wikipedia_inspiration",
    points: [
      "Wikipedia grows through user contributions.",
      "Wiki Surveys also grow through respondent contributions.",
      "Participants help build the content.",
      "The method reduces the researcher's control over all possible answers."
    ],
    closing: "Interaction: Can the public sometimes suggest better ideas than experts?"
  },
  {
    eyebrow: "Act V: Design Guidelines",
    title: "Three Core Principles",
    subtitle: "These three principles define the method.",
    actor: "instructor",
    scene: "principles",
    cards: [
      {
        label: "Greedy",
        text: "Accepts as much or as little information as respondents want to provide.",
        color: "var(--yellow)"
      },
      {
        label: "Collaborative",
        text: "Allows respondents to add new ideas.",
        color: "var(--pink)"
      },
      {
        label: "Adaptive",
        text: "Uses previous responses to improve future data collection.",
        color: "var(--green)"
      }
    ],
    points: [
      "1. Greedy: accepts as much or as little information as respondents want to provide.",
      "2. Collaborative: allows respondents to add new ideas.",
      "3. Adaptive: uses previous responses to improve future data collection."
    ],
    closing: "Interaction: Ask students to match each principle with a simple example."
  },
  {
    eyebrow: "Act VI: Principle One",
    title: "Greediness: Capturing Unequal Participation",
    subtitle: "Unequal participation becomes a resource, not a problem.",
    actor: "scholar",
    scene: "greedy_fathead",
    points: [
      "Traditional surveys usually require a fixed amount of answers.",
      "Wiki Surveys allow unequal participation.",
      "Some respondents answer many times.",
      "Some respondents answer only a few times.",
      "Both types of participation are useful."
    ],
    closing: "Interaction: Is someone who answers only twice still useful for the study?"
  },
  {
    eyebrow: "Act VI: Principle One",
    title: "Fat Head and Long Tail",
    subtitle: "The method fits online participation patterns.",
    actor: "scholar",
    scene: "fat_head_static",
    points: [
      "Students participate with different levels of energy.",
      "Some vote many times; others vote once or twice.",
      "Traditional surveys often require equal participation.",
      "Wiki Surveys capture every contribution — big or small."
    ],
    closing: "Interaction: Does a student who votes only once still help the study?"
  },
  {
    eyebrow: "Act VII: Principle Two",
    title: "Collaborativeness: Respondents Help Build the Survey",
    subtitle: "Participants are not only respondents; they are co-creators.",
    actor: "diplomat",
    scene: "collaborative_queue",
    points: [
      "In traditional surveys, researchers write the questions and answers.",
      "In Wiki Surveys, respondents can add new ideas.",
      "These new ideas are shown to future respondents.",
      "This makes the survey dynamic and community-driven."
    ],
    closing: "Interaction: Ask students to suggest one idea that could be added to a university improvement survey."
  },
  {
    eyebrow: "Act VII: Principle Two",
    title: "More Than an \"Other\" Option",
    subtitle: "Wiki Surveys transform individual suggestions into collective evaluation.",
    actor: "diplomat",
    scene: "other_static",
    points: [
      "In traditional surveys, 'Other' answers are usually seen only by researchers later.",
      "In Wiki Surveys, new ideas become part of the survey.",
      "Future respondents can vote on these new ideas."
    ],
    closing: "Interaction: Show an 'Other' answer and ask: 'Should this idea be evaluated by others?'"
  },
  {
    eyebrow: "Act VIII: Principle Three",
    title: "Adaptivity: The Survey Learns While Running",
    subtitle: "Adaptivity means using what is already known to learn more.",
    actor: "scholar",
    scene: "adaptive_routing",
    points: [
      "Traditional surveys are static.",
      "Wiki Surveys can use collected data to decide what to ask next.",
      "The system can show comparisons that are more informative.",
      "This increases efficiency."
    ],
    closing: "Interaction: If two ideas are very close in popularity, should we compare them again?"
  },
  {
    eyebrow: "Act IX: The Sandbox",
    title: "Practical Benefits of Pairwise Comparison",
    subtitle: "Pairwise voting helps participants choose priorities clearly and quickly.",
    actor: "referee",
    scene: "strengths_scorecard",
    points: [
      "Simple decision-making: Participants compare only two ideas at a time, instead of ranking a long list.",
      "Forces prioritization: Participants must choose one option, so the method reveals what they value more.",
      "Easy participation: A participant can contribute with just one quick vote, or continue voting many times.",
      "Quantifiable results: Many small votes are converted into scores and rankings.",
      "Supports new ideas: If participants add new ideas, those ideas can later be compared and scored too."
    ],
    closing: "Interaction: Is it easier to choose between two options or rank ten options?"
  },
  {
    eyebrow: "Act X: Platforms",
    title: "All Our Ideas",
    subtitle: "The method was implemented in a real online platform.",
    actor: "referee",
    scene: "allourideas_replica",
    points: [
      "The researchers created a free, open-source website: All Our Ideas.",
      "It allows anyone to create a pairwise wiki survey.",
      "The platform collected many surveys, items, and responses.",
      "It served as a real-world testbed for the method."
    ],
    closing: "Interaction: What topic would you create a Wiki Survey about?"
  },
  {
    eyebrow: "Act XI: Case Studies",
    title: "PlaNYC — New York City Sustainability Plan",
    subtitle: "The New York City Mayor's Office used a Wiki Survey to collect public ideas for PlaNYC 2030.",
    actor: "diplomat",
    scene: "case_studies",
    points: [
      "Goal: collect residents' ideas for making New York City \"greener and greater.\"",
      "The survey started with 25 seed ideas from the Mayor's Office.",
      "Residents could vote between pairs of ideas and add new ideas.",
      "The active idea pool grew from 25 to 269 ideas.",
      "Many top-ranked ideas came from respondents, not from the original seed list."
    ],
    closing: "What to say: \"The city started with only 25 ideas, but residents added many more. The method did not only collect votes; it expanded the range of possible policy ideas.\""
  },
  {
    eyebrow: "Act XI: Case Studies",
    title: "OECD — Global Education Policy",
    subtitle: "The OECD used a Wiki Survey to collect ideas before education policy events.",
    actor: "diplomat",
    scene: "case_studies",
    points: [
      "Goal: collect fresh ideas from education stakeholders.",
      "The question focused on the most important action needed in education today.",
      "Participants could compare ideas, vote, skip, or add new ideas.",
      "The active idea pool grew from 60 to 285 ideas.",
      "One strong user framing was: \"Teach to think, not to regurgitate.\""
    ],
    closing: "What to say: \"The OECD case shows that Wiki Surveys can also work in global education policy. Participants can contribute not only content, but also meaningful language.\""
  },
  {
    eyebrow: "Act XII: Mathematics",
    title: "From Pairwise Votes to an Opinion Matrix",
    subtitle: "The matrix helps us estimate how much each student values each idea.",
    actor: "scholar",
    scene: "matrix_theta",
    points: [
      "Three ideas: practice sessions, transportation, study spaces.",
      "Students vote in pairs — not full rankings.",
      "The matrix rows are students; columns are ideas.",
      "Averages become simple scores and a final ranking."
    ],
    closing: "In the article, a more advanced model is used. This is the classroom version."
  },
  {
    eyebrow: "Act XIII: Results",
    title: "What the Method Produced",
    subtitle: "The method expanded the pool of ideas dramatically.",
    actor: "detective",
    scene: "graph_yield",
    points: [
      "PlaNYC: active ideas increased from 25 to 269.",
      "OECD: active ideas increased from 60 to 285.",
      "Many new ideas were added by respondents.",
      "In PlaNYC, 8 of the top 10 ideas came from users.",
      "In OECD, 7 of the top 10 ideas came from users."
    ],
    closing: "What to say: \"The best ideas were not always the ideas prepared by the organization. Many top ideas came from the crowd.\""
  },
  {
    eyebrow: "Act XIII: Results",
    title: "What Kind of Value Did User Ideas Add?",
    subtitle: "Participants contributed both new information and new framing.",
    actor: "detective",
    scene: "qualitative_results_static",
    points: [
      "User ideas added two kinds of qualitative value.",
      "Novel information: ideas the organization did not expect.",
      "Alternative framing: new ways of expressing known problems.",
      "Numbers show which ideas were popular; interviews explain why they mattered."
    ],
    closing: "What to say: \"Some ideas gave completely new information, while others gave a new and stronger way to frame an existing issue.\""
  },
  {
    eyebrow: "Act XIV: Limitations",
    title: "Limitations of Wiki Surveys",
    subtitle: "Wiki Surveys are promising, but they still need further methodological development.",
    actor: "shocked",
    scene: "spam_defender",
    points: [
      "The case studies did not use probabilistic sampling.",
      "Results represent participants, not necessarily the whole population.",
      "Statistical analysis is complex because not every respondent sees every idea.",
      "Some ideas are added late, so not all ideas get equal exposure.",
      "More testing is needed for consistency, validity, and pair-selection algorithms."
    ],
    closing: "What to say: \"The main limitation is generalizability, because the case studies did not use probability sampling.\""
  },
  {
    eyebrow: "Act XV: The Horizon",
    title: "Why Wiki Surveys Matter",
    subtitle: "Wiki Surveys combine open ideas, collective participation, and measurable results.",
    actor: "happy",
    scene: "conclusion_celebrate",
    points: [
      "Wiki Surveys are a hybrid method.",
      "They combine openness with quantification.",
      "Participants can add unexpected ideas and help rank them.",
      "They are useful for policy, education, planning, and community decision-making.",
      "They are not a replacement for surveys or interviews, but a complementary method."
    ],
    closing: "What to say: \"Wiki Surveys bridge a methodological gap. Traditional surveys are measurable but closed. Interviews are open but hard to quantify. Wiki Surveys combine both.\""
  }
];

const shortMapTitles = [
  "Wiki Surveys",
  "Closed Survey",
  "Open Interview",
  "Main Problem",
  "Core Dilemma",
  "The Solution",
  "Wikipedia Link",
  "3 Principles",
  "Greediness",
  "Fat Head / Tail",
  "Collaborative",
  "Beyond Other",
  "Adaptivity",
  "Pairwise Benefits",
  "All Our Ideas",
  "NYC Case",
  "OECD Case",
  "Opinion Matrix",
  "Main Results",
  "User Ideas",
  "Limitations",
  "Why It Matters"
];

export default function Presentation() {
  const [current, setCurrent] = useState(0);
  const slide = slides[current];
  const [isPlaying, setIsPlaying] = useState(false);
  const [synthEnabled, setSynthEnabled] = useState(true);
  const [revealHidden, setRevealHidden] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("navy");
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Global mouse coordinates and eye-tracking pupil vectors
  const avatarRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });

  // ----------------------------------------------------
  // INDIVIDUAL SLIDE INTERACTIVE WIDGET STATES
  // ----------------------------------------------------

  // Slide 5: Wikipedia Inspiration Graph
  const [wikiNodes, setWikiNodes] = useState([
    { id: 0, label: "Wiki Surveys Hub", x: 150, y: 100, color: "var(--blue)" },
    { id: 1, label: "Openness Concept", x: 70, y: 50, color: "var(--pink)" },
    { id: 2, label: "Quantifiable Stats", x: 230, y: 50, color: "var(--yellow)" },
    { id: 3, label: "Wikipedia Model", x: 150, y: 170, color: "var(--green)" }
  ]);
  const [wikiLinks, setWikiLinks] = useState([
    { from: 0, to: 1 },
    { from: 0, to: 2 },
    { from: 0, to: 3 }
  ]);

  // Slide 10: More Than an Other Option Conveyor
  const [otherInputText, setOtherInputText] = useState("");
  const [conveyorIdea, setConveyorIdea] = useState(null);
  const [conveyorStatus, setConveyorStatus] = useState("idle");

  // Slide 19: Qualitative Value Framing Matcher
  const [framingScore, setFramingScore] = useState(0);
  const [selectedFramingIdx, setSelectedFramingIdx] = useState(null);
  const [framingFeedback, setFramingFeedback] = useState("");
  const [framingAttempts, setFramingAttempts] = useState(0);

  // Slide 1: Welcome splash tone trigger
  const [toneActivated, setToneActivated] = useState(false);

  // Campus Closed Survey slide: step 0=intro, 1-3=student answers, 4=result
  const [campusClosedStep, setCampusClosedStep] = useState(0);
  const [campusStudentAnswers, setCampusStudentAnswers] = useState([[], [], []]);
  const campusOptions = [
    { label: "Parking", Icon: Car },
    { label: "Cafeteria", Icon: UtensilsCrossed },
    { label: "Wi-Fi", Icon: Wifi },
    { label: "Library Hours", Icon: BookOpen },
    { label: "Study Rooms", Icon: GraduationCap },
    { label: "Bus Access", Icon: Car },
    { label: "More Shade", Icon: Sun },
    { label: "Course Schedule", Icon: ClipboardList },
  ];
  const campusStudentResponses = [
    { name: "Student 1", note: "Choose the answers for Student 1." },
    { name: "Student 2", note: "Now choose the answers for Student 2." },
    { name: "Student 3", note: "Finally, choose the answers for Student 3." },
  ];
  const activeCampusStudentIndex = campusClosedStep - 1;
  const activeCampusResponse = campusStudentResponses[campusClosedStep - 1];
  const campusResultCounts = campusOptions.map((_, optionIndex) =>
    campusStudentAnswers.reduce((count, answers) => count + (answers.includes(optionIndex) ? 1 : 0), 0)
  );

  const handleCampusCheck = (idx) => {
    if (activeCampusStudentIndex < 0 || activeCampusStudentIndex > 2) return;
    setCampusStudentAnswers((answers) => {
      const next = answers.map((studentAnswers) => [...studentAnswers]);
      const currentAnswers = next[activeCampusStudentIndex];

      if (currentAnswers.includes(idx)) {
        next[activeCampusStudentIndex] = currentAnswers.filter((optionIndex) => optionIndex !== idx);
      } else {
        next[activeCampusStudentIndex] = [...currentAnswers, idx];
      }

      return next;
    });
    playSound("click");
  };

  // Campus Open Interview slide: step 0=question, 1=open, 2=analysis
  const [campusOpenStep, setCampusOpenStep] = useState(0);

  // Slide 5: Greedy Walkthrough States
  const [greedyMode, setGreedyMode] = useState(null);
  const [greedyQuickChoice, setGreedyQuickChoice] = useState(null);
  const [greedyTripleChoices, setGreedyTripleChoices] = useState([null, null, null]);
  const [greedyCustomIdea, setGreedyCustomIdea] = useState("");
  const [greedySubmitted, setGreedySubmitted] = useState(false);

  // Slide 7: Adaptive Walkthrough States
  const [adaptiveSelectedScenario, setAdaptiveSelectedScenario] = useState(null); // null | 'close' | 'decisive'
  const [adaptiveVotesA, setAdaptiveVotesA] = useState(0);
  const [adaptiveVotesB, setAdaptiveVotesB] = useState(0);

  // Slide 2: Rigidity balance beam value
  const [rigidityVal, setRigidityVal] = useState(50);
  const [isInSweetZone, setIsInSweetZone] = useState(true);

  // Slide 3: Idea tree constructor
  const [customIdeaInput, setCustomIdeaInput] = useState("");
  const [wikiIdeas, setWikiIdeas] = useState([
    { id: "w1", text: "Subsidize community-led rooftop urban farms", votes: 4 },
    { id: "w2", text: "Create free electric shuttle loops downtown", votes: 8 },
    { id: "w3", text: "Convert parking lots to wild pocket parks", votes: 11 }
  ]);

  // Slide 4: Principles Card Dashboards
  const [activePrincipleIndex, setActivePrincipleIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [motivationEffort, setMotivationEffort] = useState(25);
  const [crowdPowerRatio, setCrowdPowerRatio] = useState(50);

  // Slide 5: Greediness power-law curve Alpha
  const [powerAlpha, setPowerAlpha] = useState(1.0);

  // Slide 6: Moderation Queue Simulator
  const [modQueue, setModQueue] = useState([
    { id: "m1", text: "Install native wildflower belts for butterflies" },
    { id: "m2", text: "Free warm cinnamon donuts for all citizens" },
    { id: "m3", text: "Deploy public municipal fiber broadband gigabit networks" }
  ]);
  const [moderatedItems, setModeratedItems] = useState([]); // approved items
  const [currentModIndex, setCurrentModIndex] = useState(0);

  // Slide 7: Entropic Adaptive Router
  const [adaptiveRouterNodes, setAdaptiveRouterNodes] = useState([
    { id: 0, label: "Community Shuttles", stdError: 85, color: "var(--pink)" },
    { id: 1, label: "Rooftop Farming", stdError: 45, color: "var(--yellow)" },
    { id: 2, label: "Elevated Bike Lanes", stdError: 95, color: "var(--blue)" },
    { id: 3, label: "Rainwater Harvesting", stdError: 25, color: "var(--green)" }
  ]);
  const [isRouting, setIsRouting] = useState(false);
  const [selectedRouteNodeId, setSelectedRouteNodeId] = useState(null);

  // Slide 8: Pairwise Elo Presets & Pool
  const templates = {
    campus: [
      { id: "1", text: "Improve campus Wi-Fi", votes: 11, rating: 63 },
      { id: "2", text: "Mental health support during exams", votes: 17, rating: 74 },
      { id: "3", text: "More charging stations", votes: 14, rating: 68 },
      { id: "4", text: "More shaded areas", votes: 9, rating: 59 },
      { id: "5", text: "Add more study rooms", votes: 6, rating: 55 }
    ],
    city: [
      { id: "1", text: "More parking spaces", votes: 12, rating: 60 },
      { id: "2", text: "Mental health support during exams", votes: 17, rating: 74 },
      { id: "3", text: "More charging stations", votes: 14, rating: 68 },
      { id: "4", text: "Improve campus Wi-Fi", votes: 11, rating: 63 },
      { id: "5", text: "More shaded areas", votes: 9, rating: 59 }
    ],
    scifi: [
      { id: "s1", text: "Install orbital laser-relayed solar sails", votes: 14, rating: 62 },
      { id: "s2", text: "Subsidize neural cybernetic language chipsets", votes: 18, rating: 79 },
      { id: "s3", text: "Deploy atmospheric micro-cloud seeding clusters", votes: 9, rating: 56 },
      { id: "s4", text: "Establish legal rights and voting for sentient AI", votes: 22, rating: 85 }
    ],
    ai: [
      { id: "a1", text: "Mandate open weights for models over 10^25 FLOPs", votes: 24, rating: 77 },
      { id: "a2", text: "Tax compute farms to fund universal basic income", votes: 13, rating: 60 },
      { id: "a3", text: "Deploy cryptographic origin tags on all cameras", votes: 17, rating: 66 },
      { id: "a4", text: "Establish community-governed data licensing hubs", votes: 21, rating: 72 }
    ]
  };
  const [activeTemplate, setActiveTemplate] = useState("campus");
  const [ideas, setIdeas] = useState(templates.campus);
  const [pairwisePair, setPairwisePair] = useState([0, 4]);
  const [floatingVotes, setFloatingVotes] = useState([]);
  const [customEloIdeaText, setCustomEloIdeaText] = useState("");
  const [showMathDrawer, setShowMathDrawer] = useState(false);
  const [lastVoteDetails, setLastVoteDetails] = useState(null);

  // Slide 9: Replica skip buttons
  const [skipCount, setSkipCount] = useState(0);
  const [skipDrawerOpen, setSkipDrawerOpen] = useState(false);
  const [skipReasonSelected, setSkipReasonSelected] = useState("");

  // Slide 10: Matrix Theta Heat estimation — moved to OpinionMatrixSimulation

  // Slide 11: Case study metric dashboards
  // Derived from slide index — no toggle needed
  const activeCaseStudy = current === 16 ? "oecd" : "planyc";

  // Slide 12: Horizontal ranking results & toggles
  const [revealAuthorship, setRevealAuthorship] = useState(false);

  // Slide 13: Pairwise benefits vote demo
  const [benefitVoteChoice, setBenefitVoteChoice] = useState(null);
  const [showBenefitSpeech, setShowBenefitSpeech] = useState(false);

  // Slide 14: Spam vulnerability click detector
  const [spamMeter, setSpamMeter] = useState(0);
  const [isSpamLocked, setIsSpamLocked] = useState(false);
  const [spamAttemptCount, setSpamAttemptCount] = useState(0);

  // Slide 15: Celebrating thesis portal
  const [celebrated, setCelebrated] = useState(false);
  const [confettiPool, setConfettiPool] = useState([]);

  // Ref structures
  const flashlightRef = useRef(null);
  const [flashlightPos, setFlashlightPos] = useState({ x: 150, y: 100 });
  const playTimer = useRef(null);
  const progress = useMemo(() => ((current + 1) / slides.length) * 100, [current]);

  // activeCaseStudy is now derived from `current` (no useEffect needed)
  useEffect(() => {
    // Reset campus survey states when navigating away
    if (slide && slide.scene !== "campus_closed_survey") {
      setCampusClosedStep(0);
      setCampusStudentAnswers([[], [], []]);
    }
    if (slide && slide.scene !== "campus_open_interview") {
      setCampusOpenStep(0);
    }
    if (slide && slide.scene !== "greedy_fathead") {
      setGreedyMode(null);
      setGreedyQuickChoice(null);
      setGreedyTripleChoices([null, null, null]);
      setGreedyCustomIdea("");
      setGreedySubmitted(false);
    }
    if (slide && slide.scene !== "adaptive_routing") {
      setAdaptiveSelectedScenario(null);
      setAdaptiveVotesA(0);
      setAdaptiveVotesB(0);
    }
  }, [current]);

  // Fullscreen controller
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    playSound("click");
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error("Error enabling fullscreen:", err);
      });
    } else {
      document.exitFullscreen();
    }
  };

  // ----------------------------------------------------
  // WEB AUDIO SYNTHESIZER
  // ----------------------------------------------------
  const playSound = (type) => {
    if (!synthEnabled || typeof window === "undefined") return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;

      if (type === "hover") {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.connect(g);
        g.connect(ctx.destination);
        osc.type = "sine";
        osc.frequency.setValueAtTime(1400, now);
        g.gain.setValueAtTime(0.008, now);
        g.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);
        osc.start(now);
        osc.stop(now + 0.04);
      } else if (type === "click") {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.connect(g);
        g.connect(ctx.destination);
        osc.type = "sine";
        osc.frequency.setValueAtTime(580, now);
        osc.frequency.exponentialRampToValueAtTime(1100, now + 0.05);
        g.gain.setValueAtTime(0.04, now);
        g.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);
        osc.start(now);
        osc.stop(now + 0.07);
      } else if (type === "theme") {
        const frequencies = [261.63, 329.63, 392.00, 523.25]; // C major chord sweep
        frequencies.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const g = ctx.createGain();
          osc.connect(g);
          g.connect(ctx.destination);
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, now + i * 0.03);
          g.gain.setValueAtTime(0, now + i * 0.03);
          g.gain.linearRampToValueAtTime(0.025, now + i * 0.03 + 0.04);
          g.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.03 + 0.5);
          osc.start(now + i * 0.03);
          osc.stop(now + i * 0.03 + 0.6);
        });
      } else if (type === "vote") {
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const g1 = ctx.createGain();
        const g2 = ctx.createGain();
        osc1.connect(g1);
        g1.connect(ctx.destination);
        osc2.connect(g2);
        g2.connect(ctx.destination);

        osc1.type = "sine";
        osc1.frequency.setValueAtTime(587.33, now); // D5
        g1.gain.setValueAtTime(0.05, now);
        g1.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);

        osc2.type = "sine";
        osc2.frequency.setValueAtTime(783.99, now + 0.06); // G5
        g2.gain.setValueAtTime(0.05, now + 0.06);
        g2.gain.exponentialRampToValueAtTime(0.0001, now + 0.06 + 0.22);

        osc1.start(now);
        osc1.stop(now + 0.22);
        osc2.start(now + 0.06);
        osc2.stop(now + 0.06 + 0.28);
      } else if (type === "submit") {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.connect(g);
        g.connect(ctx.destination);
        osc.type = "triangle";
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.13);
        g.gain.setValueAtTime(0.06, now);
        g.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
      } else if (type === "alarm") {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.connect(g);
        g.connect(ctx.destination);
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.linearRampToValueAtTime(90, now + 0.35);
        g.gain.setValueAtTime(0.1, now);
        g.gain.exponentialRampToValueAtTime(0.0001, now + 0.38);

        const lfo = ctx.createOscillator();
        const lfoG = ctx.createGain();
        lfo.frequency.value = 22;
        lfoG.gain.value = 35;
        lfo.connect(lfoG);
        lfoG.connect(osc.frequency);

        lfo.start(now);
        lfo.stop(now + 0.38);
        osc.start(now);
        osc.stop(now + 0.38);
      } else if (type === "unlock") {
        const notes = [523.25, 659.25, 783.99, 1046.50]; // Shimmer arpeggio
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const g = ctx.createGain();
          osc.connect(g);
          g.connect(ctx.destination);
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, now + idx * 0.05);
          g.gain.setValueAtTime(0, now + idx * 0.05);
          g.gain.linearRampToValueAtTime(0.035, now + idx * 0.05 + 0.02);
          g.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.05 + 0.28);
          osc.start(now + idx * 0.05);
          osc.stop(now + idx * 0.05 + 0.32);
        });
      } else if (type === "slide") {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.connect(g);
        g.connect(ctx.destination);
        osc.type = "sine";
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(480, now + 0.16);
        g.gain.setValueAtTime(0.035, now);
        g.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);
        osc.start(now);
        osc.stop(now + 0.18);
      }
    } catch (e) {
      console.warn("Audio Synth Error: ", e);
    }
  };

  const goTo = (index) => {
    const nextIndex = Math.min(Math.max(index, 0), slides.length - 1);
    if (nextIndex !== current) {
      playSound("slide");
      setCurrent(nextIndex);
      setRevealHidden(false);

      // Clear alerts/shaking parameters on slide change
      setIsSpamLocked(false);
      setSpamMeter(0);
      setSkipDrawerOpen(false);
    }
  };

  // ----------------------------------------------------
  // INTERACTIVE EVENT LISTENERS & TRIGGERS
  // ----------------------------------------------------

  // Cursor tracker
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Pupil vector positioning
  useEffect(() => {
    if (!avatarRef.current) return;
    const rect = avatarRef.current.getBoundingClientRect();
    const eyeCenterX = rect.left + rect.width / 2;
    const eyeCenterY = rect.top + 45;

    const dx = mousePos.x - eyeCenterX;
    const dy = mousePos.y - eyeCenterY;
    const distance = Math.hypot(dx, dy);

    const maxMove = 5;
    if (distance === 0) {
      setPupilOffset({ x: 0, y: 0 });
    } else {
      const ratio = Math.min(maxMove, distance / 40);
      setPupilOffset({
        x: (dx / distance) * ratio,
        y: (dy / distance) * ratio
      });
    }
  }, [mousePos]);

  // Key navigation (skip while typing in form fields)
  useEffect(() => {
    const onKeyDown = (event) => {
      const target = event.target;
      const isTyping =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement ||
        target.isContentEditable;

      if (isTyping) return;

      if (event.key === "ArrowRight" || event.key === " ") {
        event.preventDefault();
        goTo(current + 1);
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goTo(current - 1);
      }
      if (event.key === "Home") goTo(0);
      if (event.key === "End") goTo(slides.length - 1);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [current]);

  // Autoplay
  useEffect(() => {
    if (isPlaying) {
      playTimer.current = setInterval(() => {
        if (current < slides.length - 1) {
          goTo(current + 1);
        } else {
          setIsPlaying(false);
        }
      }, 7000);
    } else {
      clearInterval(playTimer.current);
    }
    return () => clearInterval(playTimer.current);
  }, [isPlaying, current]);

  // Slide 5 Wikipedia growth handler
  const handleGrowWikiGraph = () => {
    if (wikiNodes.length >= 10) {
      // reset
      setWikiNodes([
        { id: 0, label: "Wiki Surveys Hub", x: 150, y: 100, color: "var(--blue)" },
        { id: 1, label: "Openness Concept", x: 70, y: 50, color: "var(--pink)" },
        { id: 2, label: "Quantifiable Stats", x: 230, y: 50, color: "var(--yellow)" },
        { id: 3, label: "Wikipedia Model", x: 150, y: 170, color: "var(--green)" }
      ]);
      setWikiLinks([
        { from: 0, to: 1 },
        { from: 0, to: 2 },
        { from: 0, to: 3 }
      ]);
      playSound("theme");
      return;
    }
    playSound("submit");
    const labels = [
      "OECD Case Study",
      "PlaNYC Mayor",
      "Crowd Filtering",
      "Adaptive Sampling",
      "Elo Tournaments",
      "Fat Head Distribution"
    ];
    const colors = ["var(--pink)", "var(--yellow)", "var(--green)", "var(--blue)"];
    const angle = (wikiNodes.length * 60 * Math.PI) / 180;
    const r = 80;
    const newNode = {
      id: wikiNodes.length,
      label: labels[wikiNodes.length - 4] || "User Suggestion",
      x: Math.round(150 + Math.cos(angle) * r),
      y: Math.round(100 + Math.sin(angle) * r),
      color: colors[wikiNodes.length % colors.length]
    };
    setWikiNodes((prev) => [...prev, newNode]);
    setWikiLinks((prev) => [...prev, { from: 0, to: newNode.id }]);
  };

  // Slide 10 Conveyor simulator handlers
  const handleTraceOtherPath = (e) => {
    e.preventDefault();
    if (!otherInputText.trim() || conveyorStatus === "animating") return;

    playSound("submit");
    setConveyorIdea(otherInputText.trim());
    setConveyorStatus("animating");

    setTimeout(() => {
      playSound("click");
    }, 1000);

    setTimeout(() => {
      playSound("unlock");
      setConveyorStatus("completed");
    }, 3000);
  };

  const handleResetConveyor = () => {
    playSound("theme");
    setOtherInputText("");
    setConveyorIdea(null);
    setConveyorStatus("idle");
  };

  // Slide 19 Qualitative Framing selector handlers
  const framingQuiz = {
    researcherDry: "Dry Researcher Framing: 'We need to survey policy methods to decrease maritime emissions.'",
    options: [
      { text: "A. Mandate lower speed limits for cargo shipping containers.", value: "poor", feedback: "Too narrow! Standard pre-coded solution." },
      { text: "B. Connect cruise ships to the municipal electricity grid while docked.", value: "novel", feedback: " NOVEL INFORMATION! This is a major engineering solution the mayor's office completely missed!" },
      { text: "C. Reduce environmental carbon footprints on shipping lanes.", value: "poor", feedback: "Too generic! Sounds like researcher jargon." }
    ]
  };

  const handleSelectFraming = (idx) => {
    if (selectedFramingIdx !== null) return;
    setSelectedFramingIdx(idx);
    setFramingAttempts((prev) => prev + 1);

    const choice = framingQuiz.options[idx];
    if (choice.value === "novel") {
      playSound("unlock");
      setFramingScore((prev) => prev + 100);
      setFramingFeedback(choice.feedback);
    } else {
      playSound("alarm");
      setFramingFeedback(choice.feedback);
    }
  };

  const handleResetFramingGame = () => {
    playSound("theme");
    setSelectedFramingIdx(null);
    setFramingFeedback("");
  };

  // Slide 1 Welcome tone trigger
  const handleActivateTone = () => {
    setToneActivated(true);
    playSound("unlock");
  };

  // Slide 2 Rigidity sweep trigger
  useEffect(() => {
    const balanced = rigidityVal >= 42 && rigidityVal <= 58;
    if (balanced !== isInSweetZone) {
      setIsInSweetZone(balanced);
      if (balanced) {
        playSound("unlock");
      }
    }
  }, [rigidityVal, isInSweetZone]);

  // Slide 3 Idea publisher
  const publishIdea = (e) => {
    e.preventDefault();
    if (!customIdeaInput.trim()) return;

    playSound("submit");
    const newItem = {
      id: "w_" + Math.random().toString(36).substr(2, 9),
      text: customIdeaInput.trim(),
      votes: 0
    };
    setWikiIdeas((prev) => [newItem, ...prev]);
    setCustomIdeaInput("");
  };

  // Slide 4 Flipping dashboard
  const handleFlipCard = (idx) => {
    playSound("click");
    if (activePrincipleIndex === idx) {
      setIsFlipped(!isFlipped);
    } else {
      setActivePrincipleIndex(idx);
      setIsFlipped(true);
    }
  };

  // Slide 6 Moderation approvals
  const handleModeration = (approved) => {
    if (currentModIndex >= modQueue.length) return;

    if (approved) {
      playSound("submit");
      const approvedIdea = {
        id: "am_" + Math.random().toString(36).substr(2, 9),
        text: modQueue[currentModIndex].text,
        votes: 1
      };
      setModeratedItems((prev) => [approvedIdea, ...prev]);
    } else {
      playSound("alarm");
    }

    setCurrentModIndex((prev) => prev + 1);
  };

  // Slide 7 Entropic Router trigger
  const handleTriggerEntropyRouter = () => {
    if (isRouting) return;
    playSound("theme");
    setIsRouting(true);
    setSelectedRouteNodeId(null);

    // Pick node with HIGHEST stdError
    let maxVal = -1;
    let targetNodeIndex = 0;
    adaptiveRouterNodes.forEach((node, idx) => {
      if (node.stdError > maxVal) {
        maxVal = node.stdError;
        targetNodeIndex = idx;
      }
    });

    setTimeout(() => {
      playSound("unlock");
      setSelectedRouteNodeId(adaptiveRouterNodes[targetNodeIndex].id);

      setAdaptiveRouterNodes((prev) =>
        prev.map((node, idx) =>
          idx === targetNodeIndex
            ? { ...node, stdError: Math.max(10, node.stdError - 40) }
            : node
        )
      );
      setIsRouting(false);
    }, 1500);
  };

  // Slide 8 Pairwise Voting arena
  const handleTemplateChange = (tmpl) => {
    playSound("theme");
    setActiveTemplate(tmpl);
    setIdeas(templates[tmpl]);
    setPairwisePair(tmpl === "campus" ? [0, 4] : [0, 1]);
  };

  const addCustomEloIdea = (e) => {
    e.preventDefault();
    if (!customEloIdeaText.trim()) return;

    playSound("submit");
    const newItem = {
      id: "c_" + Math.random().toString(36).substr(2, 9),
      text: customEloIdeaText.trim(),
      votes: 0,
      rating: 60
    };
    setIdeas((prev) => [newItem, ...prev]);
    setCustomEloIdeaText("");
  };

  const handleVote = (winnerIndex, loserIndex, e) => {
    playSound("vote");

    if (e) {
      const rect = e.currentTarget.getBoundingClientRect();
      const newFloating = {
        id: Math.random().toString(),
        text: "+14 score",
        x: e.clientX - rect.left + (Math.random() * 20 - 10),
        y: e.clientY - rect.top - 20
      };
      setFloatingVotes((prev) => [...prev, newFloating]);
      setTimeout(() => {
        setFloatingVotes((prev) => prev.filter((item) => item.id !== newFloating.id));
      }, 1000);
    }

    setIdeas((prev) => {
      const next = [...prev];
      const winItem = { ...next[winnerIndex] };
      const loseItem = { ...next[loserIndex] };

      const expectedWin = 1 / (1 + Math.pow(10, (loseItem.rating - winItem.rating) / 400));
      const ratingShift = Math.round(24 * (1 - expectedWin));

      winItem.rating += ratingShift;
      winItem.votes += 1;
      loseItem.rating -= ratingShift;
      loseItem.votes += 1;

      setLastVoteDetails({
        winner: winItem.text,
        loser: loseItem.text,
        winOld: next[winnerIndex].rating,
        winNew: winItem.rating,
        loseOld: next[loserIndex].rating,
        loseNew: loseItem.rating,
        prob: Math.round(expectedWin * 100),
        shift: ratingShift
      });

      next[winnerIndex] = winItem;
      next[loserIndex] = loseItem;
      return next;
    });

    let nextA = Math.floor(Math.random() * ideas.length);
    let nextB = Math.floor(Math.random() * ideas.length);
    while (nextA === nextB && ideas.length > 1) {
      nextB = Math.floor(Math.random() * ideas.length);
    }
    setPairwisePair([nextA, nextB]);
  };

  // Slide 9 Skip triggers
  const handleSkipQuestion = (reason) => {
    playSound("click");
    setSkipCount((prev) => prev + 1);
    setSkipReasonSelected(reason);
    setSkipDrawerOpen(false);

    // Serve next pair
    let nextA = Math.floor(Math.random() * ideas.length);
    let nextB = Math.floor(Math.random() * ideas.length);
    while (nextA === nextB && ideas.length > 1) {
      nextB = Math.floor(Math.random() * ideas.length);
    }
    setPairwisePair([nextA, nextB]);
  };

  // Slide 11 Case Study select

  // Slide 14 Spam rig clicker game
  const triggerSpamClick = () => {
    if (isSpamLocked) return;
    playSound("vote");
    setSpamAttemptCount((prev) => prev + 1);
    setSpamMeter((prev) => Math.min(100, prev + 25));

    if (spamAttemptCount >= 4) {
      playSound("alarm");
      setIsSpamLocked(true);
      setSpamMeter(100);
    }
  };

  const resetSpamGame = () => {
    playSound("theme");
    setSpamAttemptCount(0);
    setSpamMeter(0);
    setIsSpamLocked(false);
  };

  // Slide 15 Celebrations Confetti
  const handleCelebrateCompletion = () => {
    if (celebrated) return;
    playSound("unlock");
    setCelebrated(true);

    // Spawn 15 colorful float blocks
    const colors = ["#ff8787", "#4dabf7", "#38d9a9", "#fcc419", "#b197fc"];
    const arr = Array.from({ length: 20 }).map((_, idx) => ({
      id: idx,
      x: Math.random() * 100,
      y: 110,
      size: Math.random() * 12 + 6,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
    setConfettiPool(arr);
  };

  // derived mathematical items
  const derivedActorState = useMemo(() => {
    if (isSpamLocked) return "shocked";

    // Check custom overrides per scene to make visual panels matching the sliders
    if (slide && slide.scene === "problem") {
      if (rigidityVal < 20) return "bureaucrat";
      if (rigidityVal > 80) return "puzzled";
      return "puzzled";
    }

    return (slide && slide.actor) || "happy";
  }, [rigidityVal, isSpamLocked, slide]);

  const avatarSrc = useMemo(() => {
    switch (derivedActorState) {
      case "scholar":
        return "/scholar_memoji.png";
      case "referee":
        return "/referee_memoji.png";
      case "diplomat":
        return "/diplomat_memoji.png";
      case "detective":
        return "/detective_memoji.png";
      case "bureaucrat":
        return "/bureaucrat_memoji.png";
      case "shocked":
        return "/shocked_memoji.png";
      case "happy":
        return "/happy_memoji.png";
      case "puzzled":
        return "/puzzled_memoji.png";
      case "idea":
        return "/idea_memoji.png";
      case "instructor":
        return "/instructor_memoji.png";
      case "student":
        return "/student_haifa_memoji.png";
      default:
        return "/dina_memoji.png";
    }
  }, [derivedActorState]);

  const avatarAlt = useMemo(() => {
    switch (derivedActorState) {
      case "scholar":
        return "Scholar Researcher Apple Memoji Avatar";
      case "referee":
        return "Referee Moderator Apple Memoji Avatar";
      case "diplomat":
        return "Diplomat Representative Apple Memoji Avatar";
      case "detective":
        return "Detective Analyst Apple Memoji Avatar";
      case "bureaucrat":
        return "Strict Bureaucrat Apple Memoji Avatar";
      case "shocked":
        return "Shocked Responder Apple Memoji Avatar";
      case "happy":
        return "Happy Supporter Apple Memoji Avatar";
      case "puzzled":
        return "Puzzled Thinker Apple Memoji Avatar";
      case "idea":
        return "Inspired Innovator Apple Memoji Avatar";
      case "instructor":
        return "Instructor Teacher Apple Memoji Avatar";
      case "student":
        return "University of Haifa Student Avatar";
      default:
        return "Dina Apple Memoji Presenter Avatar";
    }
  }, [derivedActorState]);

  const changeTheme = (theme) => {
    setCurrentTheme(theme);
    playSound("theme");
  };

  return (
    <main className={`presentation-shell theme-${currentTheme}`}>
      <div className="ambient-spotlight spot-purple" />
      <div className="ambient-spotlight spot-pink" />
      <div className="ambient-spotlight spot-blue" />

      {/* Presentation Toolbar */}
      <header className="story-toolbar">
        {/* Dynamic theme swappers */}
        <div className="theme-selectors-container">
          <div className="mode-toggle-group">
            <button
              className={`theme-pill-btn mode-btn ${currentTheme !== "light" ? "active" : ""}`}
              onClick={() => {
                if (currentTheme === "light") {
                  changeTheme("navy");
                }
              }}
              onMouseEnter={() => playSound("hover")}
              title="Switch to Night Mode"
            >
              <Moon className="w-3.5 h-3.5 mr-1.5 inline-block align-middle" />
              <span className="align-middle">Night</span>
            </button>
            <button
              className={`theme-pill-btn mode-btn ${currentTheme === "light" ? "active" : ""}`}
              onClick={() => changeTheme("light")}
              onMouseEnter={() => playSound("hover")}
              title="Switch to Light Mode"
            >
              <Sun className="w-3.5 h-3.5 mr-1.5 inline-block align-middle" />
              <span className="align-middle">Light</span>
            </button>
          </div>

          {currentTheme !== "light" && (
            <div className="night-palettes-group animate-slideLeft">
              <span className="palette-label">
                Palettes:
              </span>
              {[
                { id: "navy", name: "Navy", icon: Palette },
                { id: "nebula", name: "Nebula", icon: Sparkles },
                { id: "cyberpunk", name: "Neon", icon: Zap },
                { id: "emerald", name: "Emerald", icon: Compass },
                { id: "sunset", name: "Sunset", icon: Moon },
                { id: "nordic", name: "Nordic", icon: Snowflake }
              ].map(({ id, name, icon: IconComponent }) => (
                <button
                  key={id}
                  className={`theme-pill-btn ${currentTheme === id ? "active" : ""}`}
                  onClick={() => changeTheme(id)}
                  onMouseEnter={() => playSound("hover")}
                  title={`${name} palette`}
                >
                  <IconComponent className="w-3.5 h-3.5 mr-1.5 inline-block align-middle" />
                  <span className="align-middle">{name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="toolbar-controls">
          <button
            className={`tool-btn ${synthEnabled ? "active" : ""}`}
            onClick={() => {
              setSynthEnabled(!synthEnabled);
              playSound("click");
            }}
            onMouseEnter={() => playSound("hover")}
            title="Toggle Sound Effects"
            aria-label="Toggle Sound"
          >
            {synthEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>

          <button
            className={`tool-btn fullscreen-btn ${isFullscreen ? "active" : ""}`}
            onClick={toggleFullscreen}
            onMouseEnter={() => playSound("hover")}
            title="Toggle Fullscreen Mode"
            aria-label="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
        </div>
      </header>

      {/* Narrative Side Navigation Chrono Map */}
      <aside className="slide-map" aria-label="Story Chapters">
        <div className="map-header">
          <span className="pulse-icon" />
          <p>Narrative Path</p>
        </div>
        <div className="map-scroll-area">
          {slides.map((item, index) => {
            const isActive = index === current;
            return (
              <button
                className={`map-dot ${isActive ? "active" : ""}`}
                key={item.title}
                onClick={() => goTo(index)}
                onMouseEnter={() => playSound("hover")}
                aria-label={`Chapter ${index + 1}: ${item.title}`}
              >
                <div className="dot-index">
                  <span>{index + 1}</span>
                  {isActive && <div className="dot-radar" />}
                </div>
                <div className="dot-label">
                  <strong>{shortMapTitles[index] || item.title}</strong>
                </div>
              </button>
            );
          })}
        </div>
      </aside>

      {/* Main Slides Canvas */}
      <section className="deck" key={current}>
        <div className="progress-track">
          <span className="progress-fill" style={{ width: `${progress}%` }} />
        </div>

        <div className={`slide-content ${slide.scene === "solution" ? "slide-content-solution" : ""}`}>
          {slide.scene === "solution" ? (
            <WikiSurveySimulation playSound={playSound} />
          ) : (
            <CollaborativenessProvider
              playSound={playSound}
              active={slide.scene === "collaborative_queue"}
            >
            <OpinionMatrixProvider
              playSound={playSound}
              active={slide.scene === "matrix_theta"}
            >
            <>
          {/* Narrative Content Column */}
          <div className="copy-panel">
            {slide.scene === "greedy_fathead" ? (
              <div className="wiki-walkthrough-sidebar greedy-sidebar animate-fadeIn">
                <span className="eyebrow-badge">Act VI: Principle One — Greediness</span>
                <h1 className="cinematic-title">Choose Your Contribution Level</h1>
                
                <div className="stepper-content-body mt-2">
                  <p className="step-normal-txt font-bold text-yellow-glow" style={{ color: "var(--yellow)", fontSize: "0.85rem", marginBottom: "0.6rem" }}>
                    How much do you want to contribute to the campus improvement survey?
                  </p>

                  <div className="contribution-options-stack">
                    <button
                      type="button"
                      className={`contribution-option-btn ${greedyMode === "quick" ? "active" : ""}`}
                      onClick={() => {
                        setGreedyMode("quick");
                        playSound("click");
                      }}
                    >
                       Option 1: One quick vote
                    </button>
                    <button
                      type="button"
                      className={`contribution-option-btn ${greedyMode === "triple" ? "active" : ""}`}
                      onClick={() => {
                        setGreedyMode("triple");
                        playSound("click");
                      }}
                    >
                       Option 2: Answer 3 comparisons
                    </button>
                    <button
                      type="button"
                      className={`contribution-option-btn ${greedyMode === "add" ? "active" : ""}`}
                      onClick={() => {
                        setGreedyMode("add");
                        playSound("click");
                      }}
                    >
                       Option 3: Add a new idea
                    </button>
                  </div>

                  {greedyMode === null ? (
                    <div className="greedy-empty-state animate-pulse mt-4">
                      <p className="step-normal-txt italic">Select a contribution option or ask a classmate to choose one to start the simulation!</p>
                    </div>
                  ) : (
                    <div className="greedy-story-response animate-fadeIn mt-4">
                      {greedyMode === "quick" && (
                        <div>
                          <div className="narration-box">
                            <span className="narration-speaker">You say:</span>
                            <blockquote className="narrator-quote">
                              “Even one small answer gives the system useful information.”
                            </blockquote>
                          </div>
                        </div>
                      )}

                      {greedyMode === "triple" && (
                        <div>
                          <div className="narration-box">
                            <span className="narration-speaker">You say:</span>
                            <blockquote className="narrator-quote">
                              “If the participant wants to give more effort, the system collects more information.”
                            </blockquote>
                          </div>
                        </div>
                      )}

                      {greedyMode === "add" && (
                        <div>
                          <div className="narration-box">
                            <span className="narration-speaker">You say:</span>
                            <blockquote className="narrator-quote">
                              “This gives the system even richer information.”
                            </blockquote>
                          </div>
                        </div>
                      )}

                      {/* Unified Principle Meaning */}
                      <div className="greedy-principle-meaning-card mt-3">
                        <span className="meaning-hdr"> Method Principle: Greediness</span>
                        <p className="meaning-txt">
                          <strong>Greedy</strong> = the system accepts <strong>any amount</strong> of contribution.
                        </p>
                        <ul className="meaning-bullets">
                          <li>One vote is useful.</li>
                          <li>Many votes are useful.</li>
                          <li>A new idea is useful.</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : slide.scene === "collaborative_queue" ? (
              <CollaborativenessSidebar />
            ) : slide.scene === "matrix_theta" ? (
              <OpinionMatrixSidebar />
            ) : slide.scene === "adaptive_routing" ? (
              <div className="wiki-walkthrough-sidebar adaptive-sidebar animate-fadeIn">
                <span className="eyebrow-badge">Act VIII: Principle Three — Adaptivity</span>
                <h1 className="cinematic-title">“The System Chooses the Next Question”</h1>
                
                <div className="stepper-content-body mt-2">
                  <p className="step-normal-txt font-bold" style={{ color: "var(--yellow)", fontSize: "0.85rem", marginBottom: "0.6rem" }}>
                    Simulate Classroom Vote Result:
                  </p>

                  <div className="adaptive-scenarios-stack">
                    <button
                      type="button"
                      className={`scenario-btn ${adaptiveSelectedScenario === "close" ? "active" : ""}`}
                      onClick={() => {
                        setAdaptiveSelectedScenario("close");
                        setAdaptiveVotesA(12);
                        setAdaptiveVotesB(11);
                        playSound("click");
                      }}
                      onMouseEnter={() => playSound("hover")}
                    >
                       Scenario 1: Close Vote (12 vs 11)
                    </button>
                    <button
                      type="button"
                      className={`scenario-btn ${adaptiveSelectedScenario === "decisive" ? "active" : ""}`}
                      onClick={() => {
                        setAdaptiveSelectedScenario("decisive");
                        setAdaptiveVotesA(20);
                        setAdaptiveVotesB(3);
                        playSound("unlock");
                      }}
                      onMouseEnter={() => playSound("hover")}
                    >
                       Scenario 2: Decisive Vote (20 vs 3)
                    </button>
                  </div>

                  {/* Narration response and meaning card */}
                  {adaptiveSelectedScenario !== null && (
                    <div className="adaptive-story-response animate-fadeIn mt-3">
                      <div className="narration-box">
                        <span className="narration-speaker">You say:</span>
                        <blockquote className="narrator-quote" style={{ fontSize: "0.8rem" }}>
                          {adaptiveSelectedScenario === "close"
                            ? "“Because the result is close, the system is still uncertain. It may ask more comparisons involving these ideas.”"
                            : "“Now the system is more confident and can move to another uncertain idea.”"}
                        </blockquote>
                      </div>
                    </div>
                  )}

                  {/* Adaptive Principle Meaning */}
                  <div className="adaptive-meaning-card mt-3">
                    <span className="meaning-hdr"> Adaptive Principle</span>
                    <p className="meaning-txt">
                      <strong>Adaptive</strong> = the system learns from previous votes and chooses <strong>smarter next questions</strong> to maximize information gain.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <span className="eyebrow-badge">{slide.eyebrow}</span>
                <h1 className="cinematic-title">{slide.title}</h1>
                <p className="subtitle">{slide.subtitle}</p>

                {slide.points?.length > 0 && (
                  <ul className="point-list">
                    {slide.points.map((point, index) => (
                      <li key={point} style={{ "--delay": `${index * 120}ms` }} className="story-point">
                        <span className="bullet-indicator" />
                        <p>{point}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </div>

          {/* Interactive Stage & Graphics Column */}
          <div className="visual-panel">
            {/* The Intelligent Eye-Tracking vector Avatar */}
            {slide.scene !== "cover" && slide.scene !== "solution" && (
              <div className={`actor-canvas state-${derivedActorState}`} ref={avatarRef}>
                <div className="actor-speech-bubble">
                  <p>
                    {derivedActorState === "dina" && "Hello! We are Dina & Ayelet. Welcome to our Master's Thesis presentation on Wiki Surveys! Let's begin..."}
                    {derivedActorState === "happy" && slide.scene !== "cover" && "Excellent progress! Wiki surveys combine best-of-both methodology."}
                    {derivedActorState === "puzzled" && "Qualitative depth is so hard to capture at large quantitative scales!"}
                    {derivedActorState === "bureaucrat" && slide.scene === "problem" && "Closed preset surveys only! No custom values allowed!"}
                    {derivedActorState === "bureaucrat" && slide.scene !== "problem" && "Rigid grids keep data clean, but block true discovery."}
                    {derivedActorState === "idea" && "What if surveys could grow organically like Wikipedia?!"}
                    {derivedActorState === "instructor" && "Let's examine the three design guidelines..."}
                    {derivedActorState === "scholar" && slide.scene === "fat_head_static" && "Some students vote 20 times. Others vote once. Wiki Surveys use both."}
                    {derivedActorState === "scholar" && slide.scene === "greedy_fathead" && "Greediness captures the full motivation curve."}
                    {derivedActorState === "scholar" && slide.scene === "adaptive_routing" && "Adaptivity targets uncertainty to optimize click-value."}
                    {derivedActorState === "scholar" && slide.scene === "matrix_theta" && "Pairwise votes help estimate how much each student values each idea."}
                    {derivedActorState === "referee" && slide.scene !== "strengths_scorecard" && "Vote in the live pairwise card to adjust ratings!"}
                    {derivedActorState === "referee" && slide.scene === "strengths_scorecard" && (
                      <>
                        {showBenefitSpeech
                          ? "This shows the benefit of pairwise voting: the task is simple, but it forces prioritization."
                          : "Press the button to reveal the presenter line."}
                        <button
                          type="button"
                          className="speech-action-btn"
                          onClick={() => {
                            setShowBenefitSpeech(true);
                            playSound("click");
                          }}
                        >
                          Show presenter line
                        </button>
                      </>
                    )}
                    {derivedActorState === "diplomat" && slide.scene === "collaborative_queue" && "Researcher starts. Students complete."}
                    {derivedActorState === "diplomat" && slide.scene !== "collaborative_queue" && "We are bridging the quantitative chasm together!"}
                    {derivedActorState === "detective" && "Look! 8 out of the top 10 choices were added by respondents!"}
                    {derivedActorState === "shocked" && "SPAM ATTACK! Algorithmic lock deflected the voter abuse!"}
                    {derivedActorState === "student" && slide.scene === "campus_closed_survey" && "Hi! I'm a student at the University of Haifa. Click the slide to see what the university asked us!"}
                    {derivedActorState === "student" && slide.scene === "campus_open_interview" && "What if instead of fixed options, you just asked us freely? Click to explore!"}
                  </p>
                  <span className="bubble-tail" />
                </div>

                {/* Apple-style Researcher Memoji Avatars with dynamic accessories */}
                <div className="avatars-group-container">
                  <div className="dina-avatar-memoji-container">
                    <span className="memoji-radar-glow" />
                    <img
                      src={avatarSrc}
                      alt={avatarAlt}
                      className="dina-memoji-img"
                    />
                    <span className="avatar-label-tag">{derivedActorState === "dina" ? "Dina" : derivedActorState}</span>
                  </div>

                  {derivedActorState === "dina" && (
                    <div className="ayalet-avatar-memoji-container animate-popIn">
                      <span className="memoji-radar-glow-pink" />
                      <img
                        src="/ayalet_memoji.png"
                        alt="Ayelet Apple Memoji Avatar"
                        className="ayalet-memoji-img"
                      />
                      <span className="avatar-label-tag-pink">Ayelet</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Slide Bespoke Sandbox Container */}
            <div className="stage-visual">

              {/* COVER SLIDE: Title Presentation Panel */}
              {slide.scene === "cover" && (
                <div className="graphics-cover-sandbox">
                  <div className="cover-orbit-ring" />
                  <div className="cover-orbit-ring ring-2" />

                  <div className="cover-presenters-stack">
                    <div className="cover-presenters-row">
                      <div className="cover-presenter-card">
                        <div className="cover-avatar-wrap cover-avatar-blue">
                          <span className="memoji-radar-glow" />
                          <img src="/dina_memoji.png" alt="Dina Memoji" className="cover-avatar-img" />
                        </div>
                        <span className="cover-presenter-name">Dina</span>
                        <span className="cover-presenter-role">Presenter</span>
                      </div>

                      <div className="cover-presenter-card">
                        <div className="cover-avatar-wrap cover-avatar-pink">
                          <span className="memoji-radar-glow-pink" />
                          <img src="/ayalet_memoji.png" alt="Ayelet Memoji" className="cover-avatar-img" />
                        </div>
                        <span className="cover-presenter-name">Ayelet</span>
                        <span className="cover-presenter-role">Presenter</span>
                      </div>
                    </div>

                    <div className="cover-presenters-row cover-lecturer-row">
                      <div className="cover-presenter-card">
                        <div className="cover-avatar-wrap cover-avatar-gold">
                          <span className="memoji-radar-glow-gold" />
                          <img src="/irit_memoji.png" alt="Prof. Irit Hadar Memoji" className="cover-avatar-img" />
                        </div>
                        <span className="cover-presenter-name">Prof. Irit Hadar</span>
                        <span className="cover-presenter-role">Course Lecturer</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 2 (was 1): Welcome Splash & Tone Activator */}
              {slide.scene === "intro_splash" && (
                <div className="graphics-intro-sandbox">
                  <p className="widget-caption">Master Presentation Interactive Portal</p>

                  <div className="welcome-splash-panel">
                    <div className="words-matrix-glow">
                      <span className="matrix-word float-1">Qualitative</span>
                      <span className="matrix-word float-2">Quantitative</span>
                      <span className="matrix-word float-3">Adaptive</span>
                      <span className="matrix-word float-4">Wikipedia</span>
                      <span className="matrix-word float-5">Rigor</span>
                    </div>

                    <button
                      className={`activate-tone-btn ${toneActivated ? "active" : ""}`}
                      onClick={handleActivateTone}
                    >
                      {toneActivated ? " Synthesizer Activated" : " Activate Tone Synthesizer"}
                    </button>
                  </div>
                </div>
              )}

              {/* CAMPUS CLOSED SURVEY: Three-student simulation */}
              {slide.scene === "campus_closed_survey" && (
                <div className="campus-survey-sandbox">
                  {/* TOP: Question header — always visible */}
                  <div className="campus-header-top animate-popIn">
                    <div className="campus-uni-badge">
                      <GraduationCap size={13} strokeWidth={2.5} />
                      University of Haifa — Student Survey
                    </div>
                    <h3 className="campus-question-text">
                      What is the most important thing that needs to be improved on campus?
                    </h3>
                    {campusClosedStep === 0 && (
                      <p className="campus-tap-hint">Start, choose answers for 3 students, then calculate the result.</p>
                    )}
                    {campusClosedStep > 0 && campusClosedStep < 4 && activeCampusResponse && (
                      <p className="campus-tap-hint">{activeCampusResponse.name} is answering now. Select one or more options.</p>
                    )}
                  </div>

                  {/* BOTTOM: Interactive widget area */}
                  <div className="campus-widget-bottom">
                    {campusClosedStep >= 1 && campusClosedStep < 4 && activeCampusResponse && (
                      <div className="campus-options-card animate-popIn">
                        <div className="campus-uni-badge">
                          <ClipboardList size={13} strokeWidth={2.5} />
                          {activeCampusResponse.name} answers
                        </div>
                        <div className="student-answer-note">
                          {activeCampusResponse.note}
                        </div>
                        <div className="campus-options-list">
                          {campusOptions.map(({ label, Icon }, idx) => (
                            <button
                              type="button"
                              key={idx}
                              className={`campus-option-row ${campusStudentAnswers[activeCampusStudentIndex]?.includes(idx) ? "checked" : ""}`}
                              onClick={() => handleCampusCheck(idx)}
                            >
                              <span className={`campus-checkbox ${campusStudentAnswers[activeCampusStudentIndex]?.includes(idx) ? "checked" : ""}`}>
                                {campusStudentAnswers[activeCampusStudentIndex]?.includes(idx) ? <CheckCircle2 size={14} strokeWidth={3} /> : ""}
                              </span>
                              <Icon size={16} strokeWidth={2} className="campus-option-icon" />
                              <span className="campus-option-label">{label}</span>
                            </button>
                          ))}
                        </div>
                        <button
                          type="button"
                          className="campus-next-student-btn"
                          onClick={() => {
                            setCampusClosedStep((step) => Math.min(step + 1, 4));
                            playSound("click");
                          }}
                        >
                          {campusClosedStep < 3 ? "Save and go to next student" : "Calculate results"}
                        </button>
                      </div>
                    )}

                    {campusClosedStep >= 4 && (
                      <div className="campus-result-card animate-popIn">
                        <div className="campus-result-icon">
                          <BarChart2 size={40} strokeWidth={1.5} color="var(--blue)" />
                        </div>
                        <h3 className="campus-result-title">Calculated Results After 3 Students</h3>
                        <p className="campus-result-text">
                          The fixed options are easy to count and turn into a diagram. But the survey can only measure ideas that were already on the list.
                        </p>
                        <div className="campus-bar-chart" aria-label="Student answer bar chart">
                          {campusOptions.map(({ label }, idx) => (
                            <div key={idx} className="campus-chart-column">
                              <span className="campus-chart-count">{campusResultCounts[idx]}</span>
                              <div className="campus-chart-track">
                                <div
                                  className={`campus-chart-fill ${campusResultCounts[idx] > 0 ? "selected" : ""}`}
                                  style={{ height: `${Math.max(campusResultCounts[idx] * 30, 6)}%` }}
                                />
                              </div>
                              <span className="campus-chart-label">{label}</span>
                            </div>
                          ))}
                        </div>
                        <p className="campus-tap-hint">Diagram shows number of students who selected each option</p>
                        <button
                          type="button"
                          className="campus-next-student-btn"
                          onClick={() => {
                            setCampusClosedStep(1);
                            setCampusStudentAnswers([[], [], []]);
                            playSound("click");
                          }}
                        >
                          Try again
                        </button>
                      </div>
                    )}

                    {campusClosedStep === 0 && (
                      <div className="campus-placeholder-pulse">
                        <span className="pulse-ring" />
                        <span className="pulse-icon">
                          <MousePointerClick size={36} strokeWidth={1.5} color="var(--blue)" />
                        </span>
                        <button
                          type="button"
                          className="campus-next-student-btn"
                          onClick={() => {
                            setCampusClosedStep(1);
                            playSound("click");
                          }}
                        >
                          Start Student 1
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* CAMPUS OPEN INTERVIEW: Multi-step click */}
              {slide.scene === "campus_open_interview" && (
                <div
                  className="campus-survey-sandbox open-interview-sandbox"
                  onClick={() => {
                    if (campusOpenStep < 2) {
                      setCampusOpenStep(s => s + 1);
                      playSound("click");
                    }
                  }}
                >
                  {/* TOP: Question header — always visible */}
                  <div className="campus-header-top animate-popIn" style={{borderColor: "rgba(72,187,120,0.3)"}}>
                    <div className="campus-uni-badge" style={{background:"var(--green)"}}>
                      <Mic size={13} strokeWidth={2.5} />
                      Open Interview
                    </div>
                    <h3 className="campus-question-text">
                      You could also ask an open question:
                      <em style={{display:"block", marginTop:"0.4rem", color:"var(--yellow)", fontStyle:"italic"}}>
                        "What do you think needs to be improved on campus?"
                      </em>
                    </h3>
                    {campusOpenStep === 0 && (
                      <p className="campus-tap-hint">Tap to see what students might say →</p>
                    )}
                  </div>

                  {/* BOTTOM: Interactive widget area */}
                  <div className="campus-widget-bottom">
                    {campusOpenStep === 0 && (
                      <div className="campus-placeholder-pulse">
                        <span className="pulse-ring" />
                        <span className="pulse-icon">
                          <MousePointerClick size={36} strokeWidth={1.5} color="var(--green)" />
                        </span>
                        <span className="pulse-text">Tap anywhere to continue</span>
                      </div>
                    )}

                    {campusOpenStep === 1 && (
                      <div className="campus-open-answers animate-popIn">
                        <div className="campus-uni-badge" style={{background:"var(--green)"}}>
                          <MessageSquare size={13} strokeWidth={2.5} />
                          Student Responses
                        </div>
                        <div className="open-answer-bubbles">
                          <div className="open-bubble b1">"The elevators are always broken!"</div>
                          <div className="open-bubble b2">"We need more mental health support!"</div>
                          <div className="open-bubble b3">"The library needs longer hours on Sundays."</div>
                          <div className="open-bubble b4">"A bike rental station near the dorms."</div>
                          <div className="open-bubble b5">"Better wheelchair ramps in building C."</div>
                        </div>
                        <p className="campus-tap-hint">Tap to see the analysis problem &rarr;</p>
                      </div>
                    )}

                    {campusOpenStep >= 2 && (
                      <div className="campus-result-card animate-popIn" style={{borderColor:"var(--green)"}}>
                        <div className="campus-result-icon">
                          <BarChart2 size={40} strokeWidth={1.5} color="var(--green)" />
                        </div>
                        <h3 className="campus-result-title">The Problem with Open Interviews</h3>
                        <p className="campus-result-text">
                          Here we get <strong>new and surprising ideas</strong>, but it is very difficult to <strong>compare and measure</strong> all the answers — we cannot easily quantify them!
                        </p>
                        <div className="open-problem-grid">
                          <div className="open-problem-item good"><CheckCircle2 size={14} strokeWidth={2.5} /> Rich, personal insights</div>
                          <div className="open-problem-item good"><CheckCircle2 size={14} strokeWidth={2.5} /> Unexpected ideas surface</div>
                          <div className="open-problem-item bad"><XCircle size={14} strokeWidth={2.5} /> Hard to count &amp; compare</div>
                          <div className="open-problem-item bad"><XCircle size={14} strokeWidth={2.5} /> Time-consuming to analyze</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* SLIDE 2: Rigidity vs Chaos Balance Scale */}
              {slide.scene === "problem" && (
                <div className="graphics-problem-sandbox">
                  <p className="widget-caption">Balance Rigidity (Surveys) vs. Chaos (Interviews)</p>

                  <div className="scale-simulation-arena">
                    <svg className="balance-scale-svg" viewBox="0 0 300 200">
                      <path d="M140 180 L160 180 L154 70 L146 70 Z" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                      <rect x="110" y="180" width="80" height="8" rx="4" fill="rgba(255,255,255,0.25)" />
                      <circle cx="150" cy="70" r="6" fill="var(--yellow)" />

                      <g style={{ transform: `rotate(${(rigidityVal - 50) * 0.4}deg)`, transformOrigin: "150px 70px", transition: "transform 0.15s ease" }}>
                        <line x1="50" y1="70" x2="250" y2="70" stroke="var(--yellow)" strokeWidth="6" strokeLinecap="round" />
                        <line x1="50" y1="70" x2="250" y2="70" stroke="#ffffff" strokeWidth="2" strokeOpacity="0.4" />

                        <line x1="50" y1="70" x2="20" y2="130" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
                        <line x1="50" y1="70" x2="80" y2="130" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />

                        <line x1="250" y1="70" x2="220" y2="130" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
                        <line x1="250" y1="70" x2="280" y2="130" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />

                        <path d="M15 130 Q50 165 85 130 Z" fill="var(--pink-glow)" stroke="var(--pink)" strokeWidth="2" />
                        <path d="M215 130 Q250 165 285 130 Z" fill="var(--blue-glow)" stroke="var(--blue)" strokeWidth="2" />

                        <rect x="42" y="115" width="16" height="16" rx="3" fill="var(--pink)" style={{ opacity: Math.max(0.2, rigidityVal / 100) }} />
                        <rect x="242" y="115" width="16" height="16" rx="3" fill="var(--blue)" style={{ opacity: Math.max(0.2, (100 - rigidityVal) / 100) }} />
                      </g>
                    </svg>
                  </div>

                  <div className="balance-controls">
                    <div className="meter-label-row">
                      <span className="meter-label pink-txt">Qualitative Depth: <strong>{rigidityVal}%</strong></span>
                      <span className="meter-label blue-txt">Quantitative Scale: <strong>{100 - rigidityVal}%</strong></span>
                    </div>

                    <input
                      type="range"
                      min="5"
                      max="95"
                      value={rigidityVal}
                      onChange={(e) => setRigidityVal(Number(e.target.value))}
                      className="slider-instrument-control"
                      aria-label="Tension scale slider"
                    />

                    {isInSweetZone ? (
                      <div className="sweet-spot-badge-neon">
                         WIKI SURVEY SWEET SPOT FOUND!
                      </div>
                    ) : (
                      <div className="balancing-status-hint">
                        {rigidityVal < 42 ? " Too rigid: Missing qualitative exploration" : " Too chaotic: Hard to scale and analyze quantitative values"}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* SLIDE 5: Wikipedia Inspiration Graph */}
              {slide.scene === "wikipedia_inspiration" && (
                <div className="graphics-wikipedia-sandbox">
                  <p className="widget-caption">Wikipedia Model: Click to Grow Collaborative Network</p>

                  <div className="wikipedia-interactive-arena">
                    <svg className="wikipedia-graph-svg" viewBox="0 0 300 200">
                      {/* Lines */}
                      {wikiLinks.map((link, idx) => {
                        const fromNode = wikiNodes.find(n => n.id === link.from);
                        const toNode = wikiNodes.find(n => n.id === link.to);
                        if (!fromNode || !toNode) return null;
                        return (
                          <line
                            key={`link-${idx}`}
                            x1={fromNode.x}
                            y1={fromNode.y}
                            x2={toNode.x}
                            y2={toNode.y}
                            stroke="rgba(255,255,255,0.15)"
                            strokeWidth="1.5"
                            className="neon-graph-line"
                          />
                        );
                      })}

                      {/* Nodes */}
                      {wikiNodes.map((node) => (
                        <g key={`node-${node.id}`} className="neon-graph-node">
                          <circle
                            cx={node.x}
                            cy={node.y}
                            r={node.id === 0 ? 12 : 8}
                            fill={node.color}
                            className="pulsing-circle"
                          />
                          <text
                            x={node.x}
                            y={node.id === 0 ? node.y + 20 : node.y - 12}
                            textAnchor="middle"
                            fill="#ffffff"
                            fontSize="5.5"
                            fontWeight="800"
                            className="node-label-svg"
                          >
                            {node.label}
                          </text>
                        </g>
                      ))}
                    </svg>

                    <div className="graph-controls-panel">
                      <button
                        className="grow-graph-btn"
                        onClick={handleGrowWikiGraph}
                        onMouseEnter={() => playSound("hover")}
                      >
                        {wikiNodes.length >= 10 ? " Reset Collaborative Network" : " Citizen Contribution (+1 Node)"}
                      </button>
                      <div className="graph-stats-label">
                        Network size: <strong>{wikiNodes.length} nodes</strong> ({wikiLinks.length} collaborative links)
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* SLIDE 4: Principles Card Flipping Dashboards */}
              {slide.scene === "principles" && (
                <div className="graphics-principles-sandbox">
                  <div className="tab-menu">
                    {slide.cards.map((card, idx) => (
                      <button
                        key={card.label}
                        className={`tab-pill ${activePrincipleIndex === idx ? "active" : ""}`}
                        style={{ "--hover-color": card.color }}
                        onClick={() => handleFlipCard(idx)}
                        onMouseEnter={() => playSound("hover")}
                      >
                        {card.label}
                      </button>
                    ))}
                  </div>

                  <div className={`flip-card-viewport ${isFlipped ? "flipped" : ""}`}>
                    <div className="flip-card-inner">
                      {/* Front: Basic Description */}
                      <div className="flip-card-front" style={{ borderColor: slide.cards[activePrincipleIndex].color }}>
                        <span className="card-indicator" style={{ background: slide.cards[activePrincipleIndex].color }} />
                        <h3 className="card-face-title">{slide.cards[activePrincipleIndex].label}</h3>
                        <p className="card-face-desc">{slide.cards[activePrincipleIndex].text}</p>
                        <button className="flip-interactive-trigger" onClick={() => setIsFlipped(true)}>
                           Open Simulator Dashboard
                        </button>
                      </div>

                      {/* Back: Mini Interactive Playground */}
                      <div className="flip-card-back" style={{ borderColor: slide.cards[activePrincipleIndex].color }}>
                        <div className="back-content-wrapper">
                          <div className="back-header">
                            <span className="back-title-badge">{slide.cards[activePrincipleIndex].label} Simulator</span>
                            <button className="close-back-btn" onClick={() => setIsFlipped(false)}> Close</button>
                          </div>

                          {activePrincipleIndex === 0 && (
                            <div className="greedy-back-sim">
                              <p className="back-sim-lbl">Adjust Participant Motivation Level:</p>
                              <input
                                type="range"
                                min="1"
                                max="100"
                                value={motivationEffort}
                                onChange={(e) => setMotivationEffort(Number(e.target.value))}
                                className="slider-instrument-control"
                                aria-label="Motivation effort range slider"
                              />
                              <div className="greedy-output-stats">
                                <div className="stat-card">
                                  <span>Task Effort</span>
                                  <strong>{motivationEffort < 33 ? " Quick Vote (1 sec)" : motivationEffort < 66 ? " Multiple Votes" : " Write New Idea (60s)"}</strong>
                                </div>
                                <div className="stat-card">
                                  <span>Information Gained</span>
                                  <strong>+{Math.round(motivationEffort * 1.5)} bits</strong>
                                </div>
                              </div>
                            </div>
                          )}

                          {activePrincipleIndex === 1 && (
                            <div className="collaborative-back-sim">
                              <p className="back-sim-lbl">Researcher vs. Crowd Pool Influence:</p>
                              <input
                                type="range"
                                min="5"
                                max="95"
                                value={crowdPowerRatio}
                                onChange={(e) => setCrowdPowerRatio(Number(e.target.value))}
                                className="slider-instrument-control"
                                aria-label="Crowd ratio range slider"
                              />
                              <div className="collaborative-visual-bars">
                                <div className="pool-indicator-bar-left" style={{ width: `${100 - crowdPowerRatio}%` }}>
                                  <span>Researcher Grid: {100 - crowdPowerRatio}%</span>
                                </div>
                                <div className="pool-indicator-bar-right" style={{ width: `${crowdPowerRatio}%` }}>
                                  <span>Crowd Discoveries: {crowdPowerRatio}%</span>
                                </div>
                              </div>
                              <p className="sim-helper-text">
                                {crowdPowerRatio > 60 ? " High collaborative discovery! Uncovering ideas researcher never thought of." : " Highly controlled, but risking critical blind spots."}
                              </p>
                            </div>
                          )}

                          {activePrincipleIndex === 2 && (
                            <div className="adaptive-back-sim">
                              <div className="adaptive-graph-visual">
                                <div className="adaptive-pathway-node state-analyzed">
                                  <span>Standard Error Low</span>
                                  <small>Serve Less Often</small>
                                </div>
                                <div className="adaptive-path-connector" />
                                <div className="adaptive-pathway-node state-unstable animate-pulse-amber">
                                  <span>Standard Error High</span>
                                  <small>Targeting Next Vote!</small>
                                </div>
                              </div>
                              <p className="sim-helper-text">
                                Adaptive algorithms dynamically serve questions that have high variance to maximize computational entropy.
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 5: Principle 1: Choose Your Contribution Level Sandbox */}
              {slide.scene === "greedy_fathead" && (
                <div className="graphics-greedy-sandbox contribution-level-sandbox">
                  {/* Empty State */}
                  {greedyMode === null && (
                    <div className="greedy-visual-empty-state animate-fadeIn">
                      <div className="pulsing-radar-finger">
                        <MousePointerClick size={44} strokeWidth={1.5} color="var(--yellow)" />
                      </div>
                      <h3 className="empty-title">Simulation Awaiting Input</h3>
                      <p className="empty-text">
                        Select a contribution option on the left sidebar to simulate a student's answer flow!
                      </p>
                    </div>
                  )}

                  {/* Option 1: One Quick Vote */}
                  {greedyMode === "quick" && (
                    <div className="greedy-quick-vote-arena animate-fadeIn">
                      <div className="visual-badge pink-badge">
                         Option 1: One Quick Vote
                      </div>
                      <h3 className="comparison-prompt-txt">Which is more important?</h3>
                      
                      <div className="pairwise-cards-container">
                        <div className="comparison-layout">
                          <button
                            type="button"
                            className={`pairwise-vote-card side-a ${greedyQuickChoice === "a" ? "winner-glowing" : ""}`}
                            onClick={() => {
                              setGreedyQuickChoice("a");
                              playSound("click");
                            }}
                          >
                            <span className="card-letter">A</span>
                            <p className="card-txt">Better Wi-Fi</p>
                            {greedyQuickChoice === "a" && <span className="winner-tag animate-bounce">Selected</span>}
                          </button>

                          <div className="vs-divider-pill">VS</div>

                          <button
                            type="button"
                            className={`pairwise-vote-card side-b ${greedyQuickChoice === "b" ? "winner-glowing" : ""}`}
                            onClick={() => {
                              setGreedyQuickChoice("b");
                              playSound("click");
                            }}
                          >
                            <span className="card-letter">B</span>
                            <p className="card-txt">More study rooms</p>
                            {greedyQuickChoice === "b" && <span className="winner-tag animate-bounce">Selected</span>}
                          </button>
                        </div>
                      </div>

                      <div className="simulator-note-footer">
                        {greedyQuickChoice !== null ? (
                          <span className="text-green-glow" style={{ color: "var(--green)", fontWeight: "bold" }}>
                             Recorded! Even one small answer gives the system useful information.
                          </span>
                        ) : (
                          <span className="text-yellow-glow animate-pulse" style={{ color: "var(--yellow)", fontWeight: "bold" }}>
                             Click Option A or B to cast your quick vote!
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Option 2: Answer 3 Comparisons */}
                  {greedyMode === "triple" && (
                    <div className="greedy-triple-votes-arena animate-fadeIn">
                      <div className="visual-badge green-badge">
                         Option 2: Answer 3 Comparisons
                      </div>
                      <h3 className="comparison-prompt-txt" style={{ marginBottom: "0.8rem" }}>Evaluate all 3 pairs below:</h3>

                      <div className="triple-rounds-list">
                        {[
                          { index: 0, a: "Parking", b: "Wi-Fi" },
                          { index: 1, a: "Cafeteria", b: "Study Rooms" },
                          { index: 2, a: "Bus Access", b: "More Shade" }
                        ].map((round) => (
                          <div key={round.index} className="triple-round-row animate-popIn" style={{ "--delay": `${round.index * 60}ms` }}>
                            <span className="round-lbl-badge">Pair {round.index + 1}</span>
                            <div className="triple-cards-row">
                              <button
                                type="button"
                                className={`triple-vote-btn ${greedyTripleChoices[round.index] === "a" ? "active" : ""}`}
                                onClick={() => {
                                  setGreedyTripleChoices((prev) => {
                                    const next = [...prev];
                                    next[round.index] = "a";
                                    return next;
                                  });
                                  playSound("click");
                                }}
                              >
                                {round.a}
                              </button>
                              <span className="vs-txt-lbl">vs</span>
                              <button
                                type="button"
                                className={`triple-vote-btn ${greedyTripleChoices[round.index] === "b" ? "active" : ""}`}
                                onClick={() => {
                                  setGreedyTripleChoices((prev) => {
                                    const next = [...prev];
                                    next[round.index] = "b";
                                    return next;
                                  });
                                  playSound("click");
                                }}
                              >
                                {round.b}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="simulator-note-footer" style={{ marginTop: "1rem" }}>
                        {greedyTripleChoices.filter(x => x !== null).length === 3 ? (
                          <span className="text-green-glow" style={{ color: "var(--green)", fontWeight: "bold" }}>
                             All 3 comparisons recorded! The system collected richer information.
                          </span>
                        ) : (
                          <span className="text-yellow-glow animate-pulse" style={{ color: "var(--yellow)", fontWeight: "bold" }}>
                             Click options for all 3 pairs to submit comparisons ({greedyTripleChoices.filter(x => x !== null).length}/3 completed)
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Option 3: Add a New Idea */}
                  {greedyMode === "add" && (
                    <div className="greedy-add-idea-arena animate-fadeIn">
                      <div className="visual-badge yellow-badge">
                         Option 3: Add a New Idea
                      </div>
                      
                      {!greedySubmitted ? (
                        <div className="add-idea-form-visual animate-popIn">
                          <h3 className="comparison-prompt-txt">Suggest a new campus improvement:</h3>
                          
                          <div className="preset-suggestion-chip-row">
                            <span className="chip-lbl">Pre-fill idea:</span>
                            <button
                              type="button"
                              className="suggestion-helper-chip"
                              onClick={() => {
                                setGreedyCustomIdea("More charging stations");
                                playSound("click");
                              }}
                            >
                              "More charging stations"
                            </button>
                          </div>

                          <div className="interactive-input-block">
                            <input
                              type="text"
                              value={greedyCustomIdea}
                              onChange={(e) => setGreedyCustomIdea(e.target.value)}
                              placeholder="Type your new idea here..."
                              className="glow-text-input"
                              maxLength={60}
                            />
                            <button
                              type="button"
                              className="publish-node-btn"
                              disabled={greedyCustomIdea.trim() === ""}
                              onClick={() => {
                                setGreedySubmitted(true);
                                playSound("click");
                              }}
                            >
                               Publish Node
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="idea-submission-success-visual animate-fadeIn">
                          <div className="success-glowing-ring">
                            <span></span>
                          </div>
                          <h3 className="success-title">Idea Added Successfully!</h3>
                          <div className="submitted-idea-bubble animate-bounce">
                            "{greedyCustomIdea}"
                          </div>
                          <p className="success-desc mt-2">
                            This gives the system even richer information! Future respondents can now vote on your idea.
                          </p>
                          <button
                            type="button"
                            className="next-round-simulator-btn mt-2"
                            onClick={() => {
                              setGreedySubmitted(false);
                              setGreedyCustomIdea("");
                              playSound("click");
                            }}
                          >
                            Add another idea
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
              {/* SLIDE 8: Fat Head and Long Tail interactive simulation */}
              {slide.scene === "fat_head_static" && (
                <div className="graphics-fathead-grid-sandbox">
                  <FatHeadLongTailSimulation playSound={playSound} />
                </div>
              )}
              {/* SLIDE 6: Principle 2: Collaborativeness - "Researcher Starts, Students Complete" */}
              {slide.scene === "collaborative_queue" && (
                <CollaborativenessDashboard />
              )}

              {/* SLIDE 10: More Than an Other Option Conveyor Path */}
              {slide.scene === "other_static" && (
                <div className="graphics-other-conveyor-sandbox">
                  <p className="widget-caption">Conveyor Pipeline: Compare Traditional vs. Wiki 'Other' Option</p>

                  <form className="interactive-other-form" onSubmit={handleTraceOtherPath}>
                    <input
                      type="text"
                      placeholder="Type a custom suggestion (e.g. Install rooftop solar panels)..."
                      value={otherInputText}
                      onChange={(e) => setOtherInputText(e.target.value)}
                      className="glow-text-input"
                      maxLength={60}
                      disabled={conveyorStatus === "animating"}
                      aria-label="Other option input"
                    />
                    <button type="submit" className="trace-path-btn" disabled={conveyorStatus === "animating"} onMouseEnter={() => playSound("hover")}>
                      {conveyorStatus === "animating" ? " Tracing Idea..." : " Trace Idea Path"}
                    </button>
                  </form>

                  <div className="conveyor-animation-arena">
                    {/* Path 1: Traditional Survey */}
                    <div className={`conveyor-path-panel traditional ${conveyorStatus}`}>
                      <span className="path-header-label">Traditional Survey "Other" Box</span>
                      <div className="path-visualization-lane">
                        {conveyorIdea && (
                          <div className={`animated-capsule traditional-cap step-${conveyorStatus}`}>
                            {conveyorIdea}
                          </div>
                        )}
                        <div className="terminal-container">
                          <span className="terminal-icon"></span>
                          <span className="terminal-label">Locked Filing Cabinet</span>
                          <small className="terminal-desc">Seen only by researchers after study closes. Never evaluated by the crowd.</small>
                        </div>
                      </div>
                    </div>

                    {/* Path 2: Wiki Survey */}
                    <div className={`conveyor-path-panel wiki ${conveyorStatus}`}>
                      <span className="path-header-label">Wiki Survey Pipeline</span>
                      <div className="path-visualization-lane">
                        {conveyorIdea && (
                          <div className={`animated-capsule wiki-cap step-${conveyorStatus}`}>
                            {conveyorIdea}
                          </div>
                        )}
                        <div className="terminal-container">
                          <span className="terminal-icon"></span>
                          <span className="terminal-label">Active Elo Pool</span>
                          <small className="terminal-desc">Injected instantly. Future respondents compare and evaluate it live.</small>
                        </div>
                      </div>
                    </div>
                  </div>

                  {conveyorStatus === "completed" && (
                    <button className="reset-conveyor-btn" onClick={handleResetConveyor}>
                       Reset Pipeline Demo
                    </button>
                  )}
                </div>
              )}

              {/* SLIDE 7: Principle 3: Adaptivity - "The System Chooses the Next Question" */}
              {slide.scene === "adaptive_routing" && (
                <div className="graphics-adaptive-routing-sandbox">
                  <div className="adaptive-dashboard-card animate-popIn">
                    <p className="widget-caption">Interactive Dashboard: Active Confidence Monitor</p>

                    <div className="adaptive-grid-workspace">
                      {/* Left Block: Confidence Table */}
                      <div className="confidence-table-container">
                        <div className="col-header">
                          <span className="col-header-icon"></span>
                          Idea Confidence Levels
                        </div>
                        
                        <div className="confidence-rows-list">
                          {[
                            { name: "Wi-Fi", baseConfidence: "High" },
                            { name: "Parking", baseConfidence: "High" },
                            { name: "Study Rooms", baseConfidence: "Medium" },
                            { name: "Mental Health Support", baseConfidence: "Low", dynamic: true },
                            { name: "More Shade", baseConfidence: "Low" }
                          ].map((idea, idx) => {
                            let confidence = idea.baseConfidence;
                            if (idea.dynamic && adaptiveSelectedScenario === "decisive") {
                              confidence = "High";
                            }
                            
                            const isTargeted = confidence === "Low";
                            return (
                              <div
                                key={idx}
                                className={`confidence-pill-row ${isTargeted ? "targeted-low-row" : ""}`}
                              >
                                <span className="idea-name">{idea.name}</span>
                                <span className={`confidence-badge state-${confidence.toLowerCase()}`}>
                                  {confidence}
                                  {isTargeted && <span className="ping-uncertain-dot" />}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Right Block: Pairwise Dispatched Question */}
                      <div className="dispatcher-widget-container">
                        <div className="col-header">
                          <span className="col-header-icon"></span>
                          Active Question Dispatcher
                        </div>

                        <div className="dispatched-question-box">
                          <span className="dispatch-badge">NEXT SYSTEM COMPARISON</span>
                          
                          <div className="pairing-comparison-display">
                            <div className="pairing-option option-a">
                              <span className="option-label">Option A</span>
                              <span className="option-text">Mental Health Support</span>
                            </div>
                            <span className="vs-divider">VS</span>
                            <div className="pairing-option option-b">
                              <span className="option-label">Option B</span>
                              <span className="option-text">More Shade</span>
                            </div>
                          </div>

                          {/* Vote display and progress bars */}
                          <div className="dispatcher-vote-tallies">
                            {adaptiveSelectedScenario === null ? (
                              <div className="dispatcher-waiting-state">
                                <span className="pulsing-radar-icon"></span>
                                <p>Awaiting classroom vote simulation...</p>
                              </div>
                            ) : (
                              <div className="votes-result-bars animate-fadeIn">
                                <div className="vote-bar-row">
                                  <div className="vote-bar-labels">
                                    <span>Mental Health Support</span>
                                    <strong>{adaptiveVotesA} votes</strong>
                                  </div>
                                  <div className="vote-bar-rail">
                                    <div
                                      className="vote-bar-fill fill-option-a"
                                      style={{
                                        width: `${(adaptiveVotesA / (adaptiveVotesA + adaptiveVotesB)) * 100}%`
                                      }}
                                    />
                                  </div>
                                </div>

                                <div className="vote-bar-row mt-2">
                                  <div className="vote-bar-labels">
                                    <span>More Shade</span>
                                    <strong>{adaptiveVotesB} votes</strong>
                                  </div>
                                  <div className="vote-bar-rail">
                                    <div
                                      className="vote-bar-fill fill-option-b"
                                      style={{
                                        width: `${(adaptiveVotesB / (adaptiveVotesA + adaptiveVotesB)) * 100}%`
                                      }}
                                    />
                                  </div>
                                </div>

                                <div className="dispatcher-system-action-badge mt-3">
                                  {adaptiveSelectedScenario === "close" ? (
                                    <span className="system-tag uncertainty-tag">
                                       RESULT CLOSE: Uncertainty remains high. Comparing again...
                                    </span>
                                  ) : (
                                    <span className="system-tag success-tag">
                                       DECISIVE CHOICE: Confidence updated to HIGH for Mental Health Support!
                                    </span>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Reset button footer */}
                    {adaptiveSelectedScenario !== null && (
                      <div className="adaptive-dashboard-footer">
                        <button
                          className="reset-adaptive-btn"
                          onClick={() => {
                            setAdaptiveSelectedScenario(null);
                            setAdaptiveVotesA(0);
                            setAdaptiveVotesB(0);
                            playSound("theme");
                          }}
                          onMouseEnter={() => playSound("hover")}
                        >
                           Reset Simulation
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* SLIDE 9: replica All Our Ideas Platform with Can't Decide Skips */}
              {slide.scene === "allourideas_replica" && (
                <div className="graphics-allourideas-sandbox">
                  <p className="widget-caption">All Our Ideas Interface Replica (Skip Handling)</p>

                  <div className="aoi-replica-card-panel">
                    <div className="voting-arena">
                      <button
                        className="voting-card card-option-a"
                        onClick={(e) => handleVote(pairwisePair[0], pairwisePair[1], e)}
                        onMouseEnter={() => playSound("hover")}
                      >
                        <span className="voting-letter">Option A</span>
                        <p className="voting-text">{ideas[pairwisePair[0]]?.text}</p>
                      </button>

                      <div className="voting-versus">VS</div>

                      <button
                        className="voting-card card-option-b"
                        onClick={(e) => handleVote(pairwisePair[1], pairwisePair[0], e)}
                        onMouseEnter={() => playSound("hover")}
                      >
                        <span className="voting-letter">Option B</span>
                        <p className="voting-text">{ideas[pairwisePair[1]]?.text}</p>
                      </button>
                    </div>

                    <div className="skip-action-container">
                      <button
                        className="skip-cant-decide-btn"
                        onClick={() => { playSound("click"); setSkipDrawerOpen(!skipDrawerOpen); }}
                      >
                         I can't decide...
                      </button>

                      {skipDrawerOpen && (
                        <div className="skip-reason-drawer animate-popIn">
                          <p className="skip-drawer-title">Why can't you decide?</p>
                          <div className="skip-reasons-grid">
                            <button onClick={() => handleSkipQuestion("I like both")}> I like both</button>
                            <button onClick={() => handleSkipQuestion("Both are bad")}> Both are bad</button>
                            <button onClick={() => handleSkipQuestion("No preference")}> No preference</button>
                            <button onClick={() => handleSkipQuestion("Don't know enough")}> Don't know enough</button>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="skips-scoreboard-metrics">
                      <span className="stats-indicator">Current Skips count: <strong>{skipCount} skips registered</strong></span>
                      {skipReasonSelected && (
                        <span className="stats-indicator">Last skip reason: <strong style={{ color: "var(--yellow)" }}>"{skipReasonSelected}"</strong></span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {slide.scene === "matrix_theta" && <OpinionMatrixDashboard />}

              {/* SLIDE 17 & 18: Case Studies — auto-shows based on slide index */}
              {slide.scene === "case_studies" && (
                <div className="graphics-case-studies-sandbox">
                  <p className="widget-caption">
                    {activeCaseStudy === "planyc" ? "🏙️ PlaNYC — New York City" : "🌍 OECD — Global Education"}
                  </p>

                  <div className="case-study-dashboard-panel animate-popIn" key={activeCaseStudy}>
                    {activeCaseStudy === "planyc" ? (
                      <div className="case-study-full-layout">
                        <div className="case-study-header-row">
                          <div className="case-icon-badge nyc-badge">🏙️</div>
                          <div>
                            <span className="case-eyebrow-tag">PlaNYC 2030 — New York City</span>
                            <p className="case-tagline">"What one idea would make New York City greener and greater?"</p>
                          </div>
                        </div>

                        <div className="case-metrics-grid">
                          <div className="case-metric-card">
                            <span className="metric-number glow-green">1,436</span>
                            <span className="metric-label">Respondents</span>
                          </div>
                          <div className="case-metric-card">
                            <span className="metric-number glow-blue">31,893</span>
                            <span className="metric-label">Responses</span>
                          </div>
                          <div className="case-metric-card">
                            <span className="metric-number glow-yellow">464</span>
                            <span className="metric-label">User-Contributed Ideas</span>
                          </div>
                          <div className="case-metric-card highlight-growth">
                            <span className="metric-number glow-pink">25 → 269</span>
                            <span className="metric-label">Active Ideas (10.8× growth)</span>
                          </div>
                        </div>

                        <div className="case-growth-visual">
                          <div className="growth-bar-container">
                            <div className="growth-bar-label">
                              <span>Seed Ideas (Researcher)</span>
                              <strong>25</strong>
                            </div>
                            <div className="growth-bar-track">
                              <div className="growth-bar-fill seed-fill" style={{ width: "9.3%" }} />
                            </div>
                          </div>
                          <div className="growth-bar-container">
                            <div className="growth-bar-label">
                              <span>Active Ideas (After Crowd)</span>
                              <strong>269</strong>
                            </div>
                            <div className="growth-bar-track">
                              <div className="growth-bar-fill crowd-fill" style={{ width: "100%" }} />
                            </div>
                          </div>
                        </div>

                        <div className="case-insight-callout nyc-callout">
                          <span className="insight-icon">💡</span>
                          <p>8 of the top 10 ranked ideas were contributed by residents — not from the Mayor's original list.</p>
                        </div>
                      </div>
                    ) : (
                      <div className="case-study-full-layout">
                        <div className="case-study-header-row">
                          <div className="case-icon-badge oecd-badge">🌍</div>
                          <div>
                            <span className="case-eyebrow-tag">OECD — Global Education Policy</span>
                            <p className="case-tagline">"What is the most important action needed in education today?"</p>
                          </div>
                        </div>

                        <div className="case-metrics-grid">
                          <div className="case-metric-card">
                            <span className="metric-number glow-green">1,668</span>
                            <span className="metric-label">Respondents</span>
                          </div>
                          <div className="case-metric-card">
                            <span className="metric-number glow-blue">28,852</span>
                            <span className="metric-label">Responses</span>
                          </div>
                          <div className="case-metric-card">
                            <span className="metric-number glow-yellow">534</span>
                            <span className="metric-label">User-Contributed Ideas</span>
                          </div>
                          <div className="case-metric-card highlight-growth">
                            <span className="metric-number glow-pink">60 → 285</span>
                            <span className="metric-label">Active Ideas (4.75× growth)</span>
                          </div>
                        </div>

                        <div className="case-growth-visual">
                          <div className="growth-bar-container">
                            <div className="growth-bar-label">
                              <span>Seed Ideas (OECD)</span>
                              <strong>60</strong>
                            </div>
                            <div className="growth-bar-track">
                              <div className="growth-bar-fill seed-fill" style={{ width: "21%" }} />
                            </div>
                          </div>
                          <div className="growth-bar-container">
                            <div className="growth-bar-label">
                              <span>Active Ideas (After Stakeholders)</span>
                              <strong>285</strong>
                            </div>
                            <div className="growth-bar-track">
                              <div className="growth-bar-fill crowd-fill" style={{ width: "100%" }} />
                            </div>
                          </div>
                        </div>

                        <div className="case-insight-callout oecd-callout">
                          <span className="insight-icon">💡</span>
                          <p>Top user contribution: <em>"Teach to think, not to regurgitate."</em> — a powerful reframing of curriculum priorities.</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* SLIDE 20: What the Method Produced — Before → After */}
              {slide.scene === "graph_yield" && (
                <div className="graphics-graph-yield-sandbox">
                  <p className="widget-caption">Before → After: Idea Pool Growth</p>

                  <div className="before-after-grid">
                    {/* PlaNYC Row */}
                    <div className="before-after-case-block">
                      <div className="ba-case-header">
                        <span className="ba-case-icon">🏙️</span>
                        <span className="ba-case-title">PlaNYC — New York City</span>
                      </div>
                      <div className="ba-comparison-row">
                        <div className="ba-before-block">
                          <span className="ba-label">Seed Ideas</span>
                          <span className="ba-number seed-number">25</span>
                          <span className="ba-sublabel">Mayor's Office</span>
                        </div>
                        <div className="ba-arrow-block">
                          <span className="ba-arrow-glyph">→</span>
                          <span className="ba-multiplier">×10.8</span>
                        </div>
                        <div className="ba-after-block">
                          <span className="ba-label">Active Ideas</span>
                          <span className="ba-number crowd-number">269</span>
                          <span className="ba-sublabel">After Residents</span>
                        </div>
                      </div>
                      <div className="ba-insight-strip">
                        <span className="ba-insight-badge crowd-badge">👥 Crowd</span>
                        8 of the top 10 ideas came from residents
                      </div>
                    </div>

                    <div className="ba-divider" />

                    {/* OECD Row */}
                    <div className="before-after-case-block">
                      <div className="ba-case-header">
                        <span className="ba-case-icon">🌍</span>
                        <span className="ba-case-title">OECD — Global Education</span>
                      </div>
                      <div className="ba-comparison-row">
                        <div className="ba-before-block">
                          <span className="ba-label">Seed Ideas</span>
                          <span className="ba-number seed-number">60</span>
                          <span className="ba-sublabel">OECD Staff</span>
                        </div>
                        <div className="ba-arrow-block">
                          <span className="ba-arrow-glyph">→</span>
                          <span className="ba-multiplier">×4.75</span>
                        </div>
                        <div className="ba-after-block">
                          <span className="ba-label">Active Ideas</span>
                          <span className="ba-number crowd-number">285</span>
                          <span className="ba-sublabel">After Stakeholders</span>
                        </div>
                      </div>
                      <div className="ba-insight-strip">
                        <span className="ba-insight-badge crowd-badge">👥 Crowd</span>
                        7 of the top 10 ideas came from stakeholders
                      </div>
                    </div>
                  </div>

                  <div className="ba-footer-callout">
                    <strong>Key finding:</strong> The best ideas were not always prepared by the organization — they came from the crowd.
                  </div>
                </div>
              )}

              {/* SLIDE 13: Strengths of Method Checklist Dashboard */}
              {slide.scene === "strengths_scorecard" && (
                <div className="graphics-strengths-sandbox">
                  <div className="benefit-vote-card">
                    <p className="benefit-vote-question">Which should the university improve first?</p>
                    <div className="benefit-vote-options">
                      <button
                        type="button"
                        className={`benefit-vote-option ${benefitVoteChoice === "wifi" ? "selected" : ""}`}
                        onClick={() => {
                          setBenefitVoteChoice("wifi");
                          playSound("vote");
                        }}
                      >
                        <span>Option A</span>
                        Improve Campus Wi-Fi
                      </button>
                      <button
                        type="button"
                        className={`benefit-vote-option ${benefitVoteChoice === "study" ? "selected" : ""}`}
                        onClick={() => {
                          setBenefitVoteChoice("study");
                          playSound("vote");
                        }}
                      >
                        <span>Option B</span>
                        Add More Study Rooms
                      </button>
                    </div>
                    <p className="benefit-vote-instruction">
                      You cannot choose both. Raise your hand for Wi-Fi. Now raise your hand for Study Rooms.
                    </p>
                    {benefitVoteChoice && (
                      <p className="benefit-vote-result">
                        Selected: {benefitVoteChoice === "wifi" ? "Improve Campus Wi-Fi" : "Add More Study Rooms"}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* SLIDE 21: Qualitative Value — Two Cards */}
              {slide.scene === "qualitative_results_static" && (
                <div className="graphics-qualitative-sandbox">
                  <p className="widget-caption">Two Types of Qualitative Value</p>

                  <div className="qualitative-cards-grid">
                    <div className="qualitative-value-card novel-card animate-popIn">
                      <div className="qv-card-header">
                        <span className="qv-card-icon">🔭</span>
                        <span className="qv-card-type">Novel Information</span>
                      </div>
                      <p className="qv-card-definition">
                        Ideas the organization <strong>did not expect</strong> and could not have generated alone.
                      </p>
                      <div className="qv-example-box">
                        <span className="qv-example-label">Example (PlaNYC):</span>
                        <blockquote className="qv-example-quote">
                          "Connecting ships to the electricity grid while docked to reduce emissions."
                        </blockquote>
                      </div>
                      <div className="qv-meaning-strip">
                        <span className="qv-meaning-icon">💡</span>
                        Users connected policy areas that organizations may treat separately.
                      </div>
                    </div>

                    <div className="qualitative-value-card framing-card animate-popIn">
                      <div className="qv-card-header">
                        <span className="qv-card-icon">✍️</span>
                        <span className="qv-card-type">Alternative Framing</span>
                      </div>
                      <p className="qv-card-definition">
                        <strong>New ways of expressing</strong> known problems — more direct, powerful, or resonant.
                      </p>
                      <div className="qv-example-box">
                        <span className="qv-example-label">Example (OECD):</span>
                        <blockquote className="qv-example-quote">
                          "Teach to think, not to regurgitate."
                        </blockquote>
                      </div>
                      <div className="qv-meaning-strip">
                        <span className="qv-meaning-icon">💡</span>
                        Users expressed an existing education concern in a direct and powerful way.
                      </div>
                    </div>
                  </div>

                  <div className="qualitative-footer-note">
                    Numbers show which ideas were popular. <strong>Interviews explain why they mattered.</strong>
                  </div>
                </div>
              )}

              {/* SLIDE 22: Limitations — What We Can and Cannot Claim */}
              {slide.scene === "spam_defender" && (
                <div className="graphics-limitations-sandbox">
                  <p className="widget-caption">Methodological Assessment Panel</p>

                  <div className="limitations-claims-grid">
                    <div className="claims-panel can-claim-panel animate-popIn">
                      <div className="claims-panel-header">
                        <span className="claims-panel-icon">✅</span>
                        <span className="claims-panel-title">What We Can Claim</span>
                      </div>
                      <ul className="claims-list">
                        <li className="claim-item">
                          <span className="claim-dot can-dot" />
                          The method collected <strong>many ideas</strong>.
                        </li>
                        <li className="claim-item">
                          <span className="claim-dot can-dot" />
                          Participants added <strong>valuable content</strong>.
                        </li>
                        <li className="claim-item">
                          <span className="claim-dot can-dot" />
                          The method produced <strong>measurable rankings</strong>.
                        </li>
                      </ul>
                    </div>

                    <div className="claims-panel cannot-claim-panel animate-popIn">
                      <div className="claims-panel-header">
                        <span className="claims-panel-icon">⚠️</span>
                        <span className="claims-panel-title">What We Cannot Fully Claim</span>
                      </div>
                      <ul className="claims-list">
                        <li className="claim-item">
                          <span className="claim-dot cannot-dot" />
                          Results represent the <strong>whole population</strong>.
                        </li>
                        <li className="claim-item">
                          <span className="claim-dot cannot-dot" />
                          The method is <strong>fully validated</strong>.
                        </li>
                        <li className="claim-item">
                          <span className="claim-dot cannot-dot" />
                          Every idea had the <strong>same chance to be seen</strong>.
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="limitations-footer-note">
                    <span className="limitations-footer-icon">📋</span>
                    <p>No probabilistic sampling was used. The statistical model is complex — different participants see different pairs.</p>
                  </div>
                </div>
              )}

              {/* SLIDE 23: Why Wiki Surveys Matter — Equation Panel */}
              {slide.scene === "conclusion_celebrate" && (
                <div className="graphics-conclusion-sandbox">
                  <p className="widget-caption">The Wiki Survey Equation</p>

                  <div className="conclusion-equation-board animate-popIn">
                    <div className="equation-component-stack">
                      <div className="equation-term open-term">
                        <span className="equation-icon">🗣️</span>
                        <span className="equation-text">Open Participation</span>
                        <span className="equation-desc">Anyone can contribute ideas and vote</span>
                      </div>

                      <div className="equation-plus-sign">+</div>

                      <div className="equation-term collab-term">
                        <span className="equation-icon">🤝</span>
                        <span className="equation-text">Collaborative Idea Generation</span>
                        <span className="equation-desc">Respondents expand the question itself</span>
                      </div>

                      <div className="equation-plus-sign">+</div>

                      <div className="equation-term pairwise-term">
                        <span className="equation-icon">⚖️</span>
                        <span className="equation-text">Pairwise Voting</span>
                        <span className="equation-desc">Simple choices produce quantitative scores</span>
                      </div>

                      <div className="equation-equals-sign">=</div>

                      <div className="equation-result-card">
                        <span className="equation-result-icon">📊</span>
                        <span className="equation-result-text">Measurable Public Priorities</span>
                        <span className="equation-result-desc">Open participation becomes rigorous data</span>
                      </div>
                    </div>

                    <div className="conclusion-method-bridge">
                      <div className="bridge-item">
                        <span className="bridge-label">Traditional Surveys</span>
                        <span className="bridge-tag closed-tag">Measurable but closed</span>
                      </div>
                      <div className="bridge-divider">↕</div>
                      <div className="bridge-item">
                        <span className="bridge-label">Wiki Surveys</span>
                        <span className="bridge-tag hybrid-tag">Open + Quantifiable ✨</span>
                      </div>
                      <div className="bridge-divider">↕</div>
                      <div className="bridge-item">
                        <span className="bridge-label">Open Interviews</span>
                        <span className="bridge-tag open-tag">Open but hard to quantify</span>
                      </div>
                    </div>

                    {celebrated && (
                      <div className="confetti-sky">
                        {confettiPool.map((c) => (
                          <span
                            key={c.id}
                            className="confetti-particle"
                            style={{
                              left: `${c.x}%`,
                              width: c.size,
                              height: c.size,
                              background: c.color,
                              animation: "nodeFloat 3s infinite alternate"
                            }}
                          />
                        ))}
                      </div>
                    )}

                    <button
                      className={`celebrate-btn ${celebrated ? "active-gold" : ""}`}
                      onClick={handleCelebrateCompletion}
                    >
                      {celebrated ? "🎉 Presentation Completed!" : "✨ Complete Thesis Presentation"}
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
            </>
            </OpinionMatrixProvider>
            </CollaborativenessProvider>
          )}
        </div>

        {/* Slides Navigation footer */}
        <footer className="controls">
          <button
            className="control-btn prev-btn"
            onClick={() => goTo(current - 1)}
            disabled={current === 0}
            onMouseEnter={() => playSound("hover")}
            aria-label="Previous Slide"
          >
            ← Previous
          </button>

          <div className="slide-counter">
            <span className="active-num">{current + 1}</span>
            <span className="divider">/</span>
            <span className="total-num">{slides.length}</span>
          </div>

          <button
            className="control-btn next-btn"
            onClick={() => goTo(current + 1)}
            disabled={current === slides.length - 1}
            onMouseEnter={() => playSound("hover")}
            aria-label="Next Slide"
          >
            Next →
          </button>
        </footer>
      </section>
    </main>
  );
}

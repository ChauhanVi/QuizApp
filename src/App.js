import React, { useState, useEffect } from "react";
import WelcomeScreen from "./WelcomeScreen";
import QuestionDisplay from "./QuestionDisplay";
import Options from "./Options";
import NextQuestionButton from "./NextQuestionButton";
import ResultsScreen from "./ResultsScreen";
import "./styles.css";

const QUESTIONS = [
  {
    question: "What is part of a database that holds only one type of information?",
    options: ["Report", "Record", "Field", "File"],
    correctOptionIndex: 2,
  },
  {
    question: " Which of the following command is used to install create-react-app?",
    options: ["npm install -g create-react-app", "npm install create-react-app", " npm install -f create-react-app", "install -g create-react-app"],
    correctOptionIndex: 0,
  },
  {
    question: "What of the following is used in React.js to increase performance?",
    options: ["Original DOM", "Virtual DOM", "Both A and B", "None of the above"],
    correctOptionIndex: 1,
  },
  {
    question: "Which of the following acts as the input of a class-based component?",
    options: ["Class", "Factory", "Render", "Props"],
    correctOptionIndex: 3,
  },
  {
    question: "What is a state in React?",
    options: ["A permanent storage.", " Internal storage of the component.", "External storage of the component.", "None of the above."],
    correctOptionIndex: 1,
  },

];

const App = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState(() => {
    const savedAnswers = localStorage.getItem("quizAnswers");
    return savedAnswers
      ? JSON.parse(savedAnswers)
      : new Array(QUESTIONS.length).fill(null);
  });
  
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);


  useEffect(() => {
    localStorage.setItem("quizAnswers", JSON.stringify(userAnswers));
  }, [userAnswers]);

  const handleStartQuiz = () => {
    setCurrentQuestionIndex(1);
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    setSelectedOptionIndex(null);
  };

  const handleSelectOption = (optionIndex) => {
    setUserAnswers(prevAnswers => {
      const newAnswers = [...prevAnswers];
      newAnswers[currentQuestionIndex - 1] = optionIndex;
      return newAnswers;
    });
    setSelectedOptionIndex(optionIndex); 
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(1);
    setUserAnswers(new Array(QUESTIONS.length).fill(null));
  };

  const calculateScore = () => {
    let score = 0;
    const answeredQuestions = Math.min(userAnswers.length, QUESTIONS.length);
    for (let i = 0; i < answeredQuestions; i++) {
      if (userAnswers[i] === QUESTIONS[i].correctOptionIndex) {
        score++;
      }
    }
    return score;
  };

  const isQuizCompleted = currentQuestionIndex > QUESTIONS.length;

  return (
    <div className="app">
      {!isQuizCompleted && currentQuestionIndex === 0 && (
        <WelcomeScreen onStartQuiz={handleStartQuiz} />
      )}

      {!isQuizCompleted &&
        currentQuestionIndex > 0 &&
        currentQuestionIndex <= QUESTIONS.length && (
          <>
            <QuestionDisplay
              question={QUESTIONS[currentQuestionIndex - 1].question}
            />
            <Options
              options={QUESTIONS[currentQuestionIndex - 1].options}
              onSelectOption={handleSelectOption}
            />
            <NextQuestionButton onNextQuestion={handleNextQuestion} />
          </>
        )}

      {isQuizCompleted && (
        <ResultsScreen
          score={calculateScore()}
          totalQuestions={QUESTIONS.length}
          onRestartQuiz={handleRestartQuiz}
        />
      )}
    </div>
  );
  
};

export default App;

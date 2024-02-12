import React from "react";

const WelcomeScreen = ({ onStartQuiz }) => {
  return (
    <div className="welcome-screen">
      <h1>Welcome to the Quiz</h1>
      <button onClick={onStartQuiz}>Start Quiz</button>
    </div>
  );
};

export default WelcomeScreen;

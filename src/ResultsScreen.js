import React from "react";

const ResultsScreen = ({ score, totalQuestions, onRestartQuiz }) => {
  return (
    <div className="results-screen">
      <h1>Quiz Completed!</h1>
      <p>
        Your score is: {score} out of {totalQuestions}
      </p>
      <button onClick={onRestartQuiz}>Restart Quiz</button>
    </div>
  );
};

export default ResultsScreen;

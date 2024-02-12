import React from "react";

const NextQuestionButton = ({ onNextQuestion }) => {
  return (
    <div className="next-question-button">
      <button onClick={onNextQuestion}>Next Question</button>
    </div>
  );
};

export default NextQuestionButton;

import React, { useCallback, useState } from "react";
import QUESTIONS from "../questions";
import quizComplete from "../assets/quiz-complete.png";
import Question from "./Question";

function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex = userAnswers.length;
  const isQuizComplete = QUESTIONS.length === activeQuestionIndex;

  if (isQuizComplete) {
    return (
      <div id="summary">
        <img src={quizComplete} alt="CompleteQuiz" />
        <h2>Quiz Completed</h2>
      </div>
    );
  }

  

  const handleSelectedAnswer = useCallback((selectedAnswer) => {
    setUserAnswers((prevState) => {
      return [...prevState, selectedAnswer];
    });
   
  }, []);

  const handleSkipAnswer = useCallback(
    () => handleSelectedAnswer(null),
    [handleSelectedAnswer]
  );
  return (
    <div id="quiz">
      <Question
        key={activeQuestionIndex}
        index = {activeQuestionIndex}
        onSkipAnswer = {handleSkipAnswer}
        onSelectAnswer = {handleSelectedAnswer}
      />
    </div>
  );
}

export default Quiz;

import React, {useState, useEffect} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {

const [item, setItem] =useState([])
const [questions, setQuestions] = useState([])

 
useEffect(() => {
  fetch("http://localhost:4000/questions")
    .then((r) => r.json())
    .then((questions) => {
      setQuestions(questions);
    });
}, []);

function handleDeleteClick(id) {
  fetch(`http://localhost:4000/questions/${id}`, {
    method: "DELETE",
  })
    .then((r) => r.json())
    .then(() => {
      const updatedQuestions = questions.filter((q) => q.id !== id);
      setQuestions(updatedQuestions);
    });
}

function handleUpdateAnswer(id, correctIndex){
  fetch(`http://localhost:4000/questions/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ correctIndex })
  })
    .then((resp) => resp.json()) 
    .then((questionUpdate) => {
      const questionUpdates = questions.map((question) => {
        if(question.id === questionUpdate) {
          return questionUpdate;
        }else {
          return question;
        }
      });
      setQuestions(questionUpdates);
    })
}

const questionItems = questions.map((question) => (
  <QuestionItem
    key={question.id}
    question={question}
    onDeleteItem={handleDeleteClick}
    onQuestionUpdate={handleUpdateAnswer}
  />
));

return (
  <section>
    <h1>Quiz Questions</h1>
    <ul>{questionItems}</ul>
  </section>
);
}

export default QuestionList;

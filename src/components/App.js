import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const[questions, setquestions]= useState([])

  useEffect(()=>{
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((questions) =>{ 
        setquestions(questions)});
  }, []);

  function handlenewquestion(newquestion){
    setquestions((prevquestions)=>[...prevquestions, newquestion])
    }

  function onDeletequestion(deletedquestion){
    const updatedQuestions= questions.filter((question)=> question.id !== deletedquestion.id)
    setquestions(updatedQuestions)
  }

  function onupdateanswer(updatedanswer){
    const updatedanswers = questions.map((question)=>{
      if(question.id===updatedanswer.id){
        return updatedanswer
      } else{
        return question
      }
    })
    setquestions(updatedanswers)
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm handlenewquestion={handlenewquestion}/> : <QuestionList questions={questions} onDeletequestion={onDeletequestion} onupdateanswer={onupdateanswer}/>}
    </main>
  );
}

export default App;

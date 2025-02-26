import React from "react";

function QuestionItem({ question , onDeletequestion,onupdateanswer}) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleClick(){
    fetch(`http://localhost:4000/questions/${question.id}`,{
      method:"DELETE",
    })
    .then((r) => r.json())
    .then(() =>{onDeletequestion(question)});
  }
  function handleChange(event){
    const newCorrectIndex = parseInt(event.target.value, 10)
    fetch(`http://localhost:4000/questions/${question.id}`,{
      method:"PATCH",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({"correctIndex": newCorrectIndex  })
    })
    .then((r) => r.json())
    .then((updatedanswer) =>{onupdateanswer(updatedanswer)});
  }
  

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select onChange={handleChange} defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={handleClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;

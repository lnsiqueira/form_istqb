import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';


export default function Formulario() {
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState([
    { text: '', correct: false },
    { text: '', correct: false },
    { text: '', correct: false },
    { text: '', correct: false },
  ]);
  const [explanation, setExplanation] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [erroValidacao, setErroValidacao] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'question') {
      setQuestion(value);
    } else if (name === 'explanation') {
      setExplanation(value);
    } else if (name === 'imageUrl') {
      setImageUrl(value);
    } else if (name.startsWith('answer')) {
      const index = parseInt(name.split('-')[1]);
      const newAnswers = [...answers];
      newAnswers[index].text = value;
      setAnswers(newAnswers);
    }
  };

  const handleCheckboxChange = (index, e) => {
    const newAnswers = [...answers];
    newAnswers.forEach((answer, i) => {
      if (i !== index) {
        answer.correct = false; // Desmarcar outras respostas
      }
    });
    newAnswers[index].correct = e.target.checked; // Marcar resposta correta atual
    setAnswers(newAnswers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar se pelo menos uma resposta está marcada como correta
    const hasCorrect = answers.some((answer) => answer.correct);
    if (!hasCorrect) {
      setErroValidacao('Select at least one correct answer.');
      return;
    }

    try {
      const firebaseConfig = {
        apiKey: "AIzaSyC18oHvjnKRLJ4Ii_Qpc6IAPwkn3Bbw4Mo",
        authDomain: "istqb-db.firebaseapp.com",
        projectId: "istqb-db",
        storageBucket: "istqb-db.appspot.com",
        messagingSenderId: "793612916034",
        appId: "1:793612916034:web:8f7a6522c0fedd56a7a4db",
        measurementId: "G-6VZWJ8KCPF"
      };
      firebase.initializeApp(firebaseConfig);

      const db = firebase.firestore();

      const docRef = await db.collection('Quiz').add({
        question,
        answers,
        explanation,
        imageUrl,
      });

      console.log('Documento salvo com ID:', docRef.id);
    } catch (error) {
      console.error('Erro ao salvar no Firestore:', error);
    }

    setQuestion('');
    setAnswers([
      { text: '', correct: false },
      { text: '', correct: false },
      { text: '', correct: false },
      { text: '', correct: false },
    ]);
    setExplanation('');
    setImageUrl('');
    setErroValidacao('');
  };

  return (
    <div>
       <h1>FORM -  ISTQB v.1.2</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="question">Question:</label>
        <textarea
          id="question"
          name="question"
          value={question}
          onChange={handleInputChange}
          rows="4"
          cols="50"
          required
        ></textarea>
        <br />
        {answers.map((answer, index) => (
          <div key={index}>
            <label htmlFor={`answer-${index}`}>Answer {index + 1}:</label>
            <textarea
              id={`answer-${index}`}
              name={`answer-${index}`}
              value={answer.text}
              onChange={handleInputChange}
              rows="2"
              cols="50"
              required
            ></textarea>
            <input
              type="checkbox"
              id={`correct-${index}`}
              checked={answer.correct}
              onChange={(e) => handleCheckboxChange(index, e)}
            />
            <label htmlFor={`correct-${index}`}>Correct</label>
          </div>
        ))}
          <br />
          <hr></hr>
        <label htmlFor="explanation">Explanation:</label>
        <textarea
          id="explanation"
          name="explanation"
          value={explanation}
          onChange={handleInputChange}
          rows="4"
          cols="50"
           
        ></textarea>
          <br />
          
        <label htmlFor="imageUrl">Image URL:</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={imageUrl}
          onChange={handleInputChange}
         
        />
        {erroValidacao && <p style={{ color: 'red' }}>{erroValidacao}</p>}
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

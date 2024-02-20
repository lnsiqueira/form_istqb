import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';


export default function Formulario() {
  const [question, setquestion] = useState('');
  const [answers, setAnswers] = useState([
    { text: '', correct: false },
    { text: '', correct: false },
    { text: '', correct: false },
    { text: '', correct: false },
  ]);
  const [erroValidacao, setErroValidacao] = useState('');

  const handleInputChange = (e) => {
    setquestion(e.target.value);
  };

  const handleRespostaChange = (index, e) => {
    const newAnswers = [...answers];
    newAnswers[index].text = e.target.value;
    setAnswers(newAnswers);
  };

  const handleCheckboxChange = (index, e) => {
    const newAnswers = [...answers];
    newAnswers.forEach((answer, i) => {
      if (i !== index) {
        answer.correct = false; // Desmarcar outras answers
      }
    });
    newAnswers[index].correct = e.target.checked; // Marcar answer correct atual
    setAnswers(newAnswers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('inicio....');
    // Validar se pelo menos uma answer está marcada como correct
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

    console.log('firebaseConfig....');
    firebase.initializeApp(firebaseConfig);

    // Conecta ao Firestore
    const db = firebase.firestore();
    console.log('Conecta....');

    // Cria a coleção
    const collectionRef = db.collection('minhaColecao');

    // Cria um documento na coleção
    const docData = {
      nome: 'Meu Documento',
      descricao: 'Este é um exemplo de documento'
    };
    collectionRef.add(docData).then(docRef => {
      console.log('Documento salvo com ID:', docRef.id);
    });

    
 

    const docRef2 = await db.collection('Quiz').add({
      question,
      answers,
       });
       console.log('Documento salvo com ID:', docRef2.id); 
 
     } catch (error) {
       console.error('Erro ao salvar no Firestore:', error);
     }
  
  };

  return (
    <div>
       <h1>FORM -  ISTQB v.10</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="question">Question:</label>
        <textarea
          id="question"
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
              value={answer.text}
              onChange={(e) => handleRespostaChange(index, e)}
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
        {erroValidacao && <p style={{ color: 'red' }}>{erroValidacao}</p>}
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

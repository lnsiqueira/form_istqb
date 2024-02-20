// 

//--------------- ok
// import { useState } from 'react';

// export default function Formulario() {
//   const [pergunta, setPergunta] = useState('');
//   const [respostas, setRespostas] = useState([
//     { texto: '', correta: false },
//     { texto: '', correta: false },
//     { texto: '', correta: false },
//     { texto: '', correta: false },
//   ]);

//   const handleInputChange = (e) => {
//     setPergunta(e.target.value);
//   };

//   const handleCheckboxChange = (index, e) => {
//     const newRespostas = [...respostas];
//     newRespostas.forEach((resposta, i) => {
//       if (i !== index) {
//         resposta.correta = false; // Desmarcar outras respostas
//       }
//     });
//     newRespostas[index].correta = e.target.checked; // Marcar resposta correta atual
//     setRespostas(newRespostas);
//   };

//   return (
//     <form>
//       <div>
//         <label htmlFor="pergunta">Pergunta:</label>
//         <input
//           type="text"
//           id="pergunta"
//           value={pergunta}
//           onChange={handleInputChange}
//         />
//       </div>
//       <div>
//         <label>Respostas:</label>
//         {respostas.map((resposta, index) => (
//           <div key={index} className="resposta">
//             <input
//               type="checkbox"
//               id={`resposta${index}`}
//               checked={resposta.correta}
//               onChange={(e) => handleCheckboxChange(index, e)}
//             />
//             <input
//               type="text"
//               value={resposta.texto}
//               onChange={(e) => {
//                 const newRespostas = [...respostas];
//                 newRespostas[index].texto = e.target.value;
//                 setRespostas(newRespostas);
//               }}
//             />
//           </div>
//         ))}
//       </div>
//       <button type="submit">Enviar</button>
//     </form>
//   );
// }


////-------------- ok

// import { useState } from 'react';

// export default function Formulario() {
//   const [pergunta, setPergunta] = useState('');
//   const [respostas, setRespostas] = useState([
//     { texto: '', correta: false },
//     { texto: '', correta: false },
//     { texto: '', correta: false },
//     { texto: '', correta: false },
//   ]);

//   const handleInputChange = (e) => {
//     setPergunta(e.target.value);
//   };

//   const handleCheckboxChange = (index, e) => {
//     const newRespostas = [...respostas];
//     newRespostas.forEach((resposta, i) => {
//       if (i !== index) {
//         resposta.correta = false; // Desmarcar outras respostas
//       }
//     });
//     newRespostas[index].correta = e.target.checked; // Marcar resposta correta atual
//     setRespostas(newRespostas);
//   };

//   return (
//     <form>
//       <div>
//       <h1>FORM -  ISTQB</h1>
//         <label htmlFor="pergunta">Question:</label>
//         <br></br>
//         <textarea
//           id="pergunta"
//           value={pergunta}
//           onChange={handleInputChange}
//           rows="4" // Defina o número de linhas aqui para aumentar o espaço
//           cols="50" // Defina o número de colunas aqui (opcional)
//           required
//         ></textarea>
//       </div>
//       <br></br>
//       <div>
//         <label>Answers:</label>
//         {respostas.map((resposta, index) => (
//           <div key={index} className="resposta">
//             <input
//               type="checkbox"
//               id={`resposta${index}`}
//               checked={resposta.correta}
//               onChange={(e) => handleCheckboxChange(index, e)}
//             />
//             <input
//               type="text"
//               value={resposta.texto}
//               onChange={(e) => {
//                 const newRespostas = [...respostas];
//                 newRespostas[index].texto = e.target.value;
//                 setRespostas(newRespostas);
//               }}
//             />
//           </div>
//         ))}
//       </div>
//       <br></br>
//       <button type="submit">Submit</button>
//     </form>
//   );
// }

import React, { useState } from 'react';
 import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';


export default function Formulario() {
  const [pergunta, setPergunta] = useState('');
  const [respostas, setRespostas] = useState([
    { texto: '', correta: false },
    { texto: '', correta: false },
    { texto: '', correta: false },
    { texto: '', correta: false },
  ]);
  const [erroValidacao, setErroValidacao] = useState('');

  const handleInputChange = (e) => {
    setPergunta(e.target.value);
  };

  const handleRespostaChange = (index, e) => {
    const newRespostas = [...respostas];
    newRespostas[index].texto = e.target.value;
    setRespostas(newRespostas);
  };

  const handleCheckboxChange = (index, e) => {
    const newRespostas = [...respostas];
    newRespostas.forEach((resposta, i) => {
      if (i !== index) {
        resposta.correta = false; // Desmarcar outras respostas
      }
    });
    newRespostas[index].correta = e.target.checked; // Marcar resposta correta atual
    setRespostas(newRespostas);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('inicio....');
    // Validar se pelo menos uma resposta está marcada como correta
    const hasCorreta = respostas.some((resposta) => resposta.correta);
    if (!hasCorreta) {
      setErroValidacao('Select at least one correct answer.');
      return;
    }

    try {

      


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

    


     //--2
     // Cria a coleção
    //  const collectionRef2 = db.collection('Quiz');

    //  // Cria um documento na coleção
    //  const docData2 = {
    //    nome: 'Meu Documento',
    //    descricao: 'Este é um exemplo de documento'
    //  };
    //  collectionRef2.add(docData2).then(docRef2 => {
    //    console.log('Documento salvo com ID:', docRef2.id);
    //  });
  

    const docRef2 = await db.collection('Quiz').add({
      pergunta,
         respostas,
       });
       console.log('Documento salvo com ID:', docRef2.id);

    

    setPergunta('');
      setRespostas([
        { texto: '', correta: false },
        { texto: '', correta: false },
        { texto: '', correta: false },
        { texto: '', correta: false },
      ]);
      setErroValidacao(''); 


    // // Initialize Firebase
    // const app = initializeApp(firebaseConfig);
    // const analytics = getAnalytics(app);

          
  
      
    //   // Acesse o Firestore
    //   const db = firebase.firestore();
      
    //   // Exemplo de uso do Firestore para gravar dados
    //   db.collection('nomedacolecao').add({
    //     campo1: 'valor1',
    //     campo2: 'valor2'
    //   })
    //   .then((docRef) => {
    //     console.log('Documento gravado com ID:', docRef.id);
    //   })
    //   .catch((error) => {
    //     console.error('Erro ao gravar no Firestore:', error);
    //   });


      //orig
    //   const docRef = await firestore.collection('Quiz').add({
    //     pergunta,
    //     respostas,
    //   });
    //   console.log('Documento salvo com ID:', docRef.id);

    //   setPergunta('');
    //   setRespostas([
    //     { texto: '', correta: false },
    //     { texto: '', correta: false },
    //     { texto: '', correta: false },
    //     { texto: '', correta: false },
    //   ]);
    //   setErroValidacao(''); // Limpar mensagem de erro se a submissão for bem-sucedida
     } catch (error) {
       console.error('Erro ao salvar no Firestore:', error);
     }
  
  };

  return (
    <div>
       <h1>FORM -  ISTQB</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="pergunta">Question:</label>
        <textarea
          id="pergunta"
          value={pergunta}
          onChange={handleInputChange}
          rows="4"
          cols="50"
          required
        ></textarea>
        <br />
        {respostas.map((resposta, index) => (
          <div key={index}>
            <label htmlFor={`resposta-${index}`}>Answer {index + 1}:</label>
            <textarea
              id={`resposta-${index}`}
              value={resposta.texto}
              onChange={(e) => handleRespostaChange(index, e)}
              rows="2"
              cols="50"
              required
            ></textarea>
            <input
              type="checkbox"
              id={`correta-${index}`}
              checked={resposta.correta}
              onChange={(e) => handleCheckboxChange(index, e)}
            />
            <label htmlFor={`correta-${index}`}>Correct</label>
          </div>
        ))}
        {erroValidacao && <p style={{ color: 'red' }}>{erroValidacao}</p>}
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

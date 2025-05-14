import React, { useEffect, useState } from "react";
import { Bars } from "react-loader-spinner";

const predefinedQAs = [
  {
    question: "quelle est le but de la plateforme forstek",
    answer:
      "La plateforme Forstek vise à soutenir les porteurs de projets en les aidant à concrétiser leurs idées innovantes. Elle permet de soumettre des idées, qui, si acceptées, nécessitent un investissement pour transformer le projet en startup. Forstek propose également une offre de stages gratuits au sein de startups pour aider les jeunes à acquérir de l'expérience tout en soutenant les entreprises émergentes. Les porteurs de projets sont accompagnés par des responsables dédiés pour gérer et faire avancer leurs initiatives.",
  },
  {
    question: "quels sont les offres disponibles",
    answer:
      "Forstek propose plusieurs offres : 1) Un programme pour soumettre des idées innovantes, avec la possibilité de les transformer en startups via un investissement. 2) Une offre de stages gratuits dans des startups pour les étudiants ou jeunes professionnels, leur permettant de contribuer au développement de jeunes entreprises. 3) Un accompagnement personnalisé par des porteurs de projets pour guider les entrepreneurs dans leurs démarches.",
  },
  {
    question: "est-ce que je peux prendre directement un rendez-vous avec un investisseur",
    answer:
      "Oui, Forstek permet de prendre directement rendez-vous avec des investisseurs, sous certaines conditions. Vous devez d'abord soumettre votre idée ou projet sur la plateforme. Si elle est validée, Forstek facilite la mise en relation avec des investisseurs intéressés. Il est recommandé de préparer un dossier solide pour maximiser vos chances lors du rendez-vous.",
  },
  {
    question: "est-ce que vous pouvez me guider",
    answer:
      "Absolument, Forstek offre un accompagnement personnalisé pour guider les utilisateurs à chaque étape. Que vous soyez un porteur de projet, un stagiaire ou un investisseur, des responsables sont disponibles pour vous orienter. Vous pouvez commencer par vous inscrire sur la plateforme, soumettre votre idée ou candidature, et demander un suivi avec un conseiller dédié pour clarifier vos objectifs et les prochaines étapes.",
  },
];

const Chat = () => {
  const [newQuestion, setNewQuestion] = useState("");
  const [storedValues, setStoredValues] = useState([]);
  const [loader, setLoader] = useState(false);
  const [isChatMinimized, setIsChatMinimized] = useState(true);

  const askGPT = async (prompt) => {
    return `Mock response for: ${prompt}`;
  };

  const handleSubmit = async () => {
    if (!newQuestion.trim()) return;
    setLoader(true);

    const normalizedQuestion = newQuestion.trim().toLowerCase().replace(/\s+/g, ' ').replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
    const matchedQA = predefinedQAs.find(
      (qa) => qa.question === normalizedQuestion
    );

    let response;
    if (matchedQA) {
      response = matchedQA.answer;
    } else {
      response = await askGPT(newQuestion);
    }

    setStoredValues((prevValues) => [
      {
        question: newQuestion,
        answer: response,
      },
      ...prevValues,
    ]);
    setLoader(false);
    setNewQuestion("");
  };

  const enterHandle = (e) => {
    if (e.key === "Enter" && !loader) {
      handleSubmit();
    }
  };

  const toggleChat = () => {
    setIsChatMinimized(!isChatMinimized);
  };

  const QuesAnswer = ({ ques, answer }) => {
    const [text, setText] = useState("");
    const [index, setIndex] = useState(0);

    useEffect(() => {
      if (index < answer.length) {
        const timer = setTimeout(() => {
          setText((prev) => prev + answer[index]);
          setIndex((prevIndex) => prevIndex + 1);
        }, 20);
        return () => clearTimeout(timer);
      }
    }, [index, answer]);

    useEffect(() => {
      setText("");
      setIndex(0);
    }, [answer]);

    return (
      <>
        <div className="media media-chat media-chat-reverse">
          <div className="media-body">
            <p>{ques}</p>
          </div>
        </div>
        <div className="media media-chat">
          <img
            className="avatar"
            src="https://img.icons8.com/color/36/000000/administrator-male.png"
            alt="..."
          />
          <div className="media-body">
            <p>{text}</p>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      {/* Bulle de chat bleue */}
      {isChatMinimized && (
        <div 
          onClick={toggleChat}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: '#3b82f6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
            zIndex: 1000,
            animation: 'bounce 2s infinite'
          }}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="white"
          >
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
          </svg>
        </div>
      )}

      {/* Interface de chat */}
      {!isChatMinimized && (
        <div 
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: '350px',
            height: '500px',
            backgroundColor: 'white',
            borderRadius: '10px',
            boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* En-tête bleu */}
          <div 
            style={{
              padding: '15px',
              backgroundColor: '#3b82f6',
              color: 'white',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderRadius: '10px 10px 0 0'
            }}
          >
            <h3 style={{margin: 0}}>Chat Forstek</h3>
            <button 
              onClick={toggleChat}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '20px',
                cursor: 'pointer'
              }}
            >
              ×
            </button>
          </div>
          
          {/* Contenu du chat existant */}
          <div style={{flex: 1, overflowY: 'auto'}}>
            <div className="page-content page-container bg-color-lite" id="page-content">
              <div className="ps-container ps-theme-default ps-active-y" id="chat-content">
                {storedValues.map((value, i) => (
                  <QuesAnswer key={i} ques={value.question} answer={value.answer} />
                ))}
              </div>
            </div>
          </div>
          
          {/* Zone de saisie */}
          <div className="publisher" style={{borderTop: '1px solid #eee'}}>
            <img
              className="avatar avatar-xs"
              src="https://img.icons8.com/color/36/000000/administrator-male.png"
              alt="..."
            />
            <input
              className="publisher-input"
              type="text"
              placeholder="Ask Me Anything"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              onKeyPress={enterHandle}
              disabled={loader}
            />
            {loader && (
              <Bars
                height="36"
                width="36"
                color="#4fa94d"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;
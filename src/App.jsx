import { useEffect, useState } from "react";
import {
  Cover,
  Helmet,
  Potion,
  Ring,
  Scroll,
  Sheild,
  Sword,
} from "./img/export";
import "./App.css";
import Card from "./Card";

const cardImages = [
  { src: Helmet, matched: false },
  { src: Potion, matched: false },
  { src: Ring, matched: false },
  { src: Scroll, matched: false },
  { src: Sheild, matched: false },
  { src: Sword, matched: false },
];

const App = () => {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);


  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setCards(shuffledCards);
    setTurns(0)
  };

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);

    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => 
          prevCards.map((card) => {
            if(card.src === choiceOne.src){
              return {...card, matched:true}
            }else {
              return card
            }
          })
        )
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo]);

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="cards-grid">
        {cards.map((card) => {
          return (
            <Card
              card={card}
              key={card.id}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled={disabled}
            />
          );
        })}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
};
export default App;

import { Cover } from "./img/export";

const Card = ({card, handleChoice, flipped, disabled}) => {
  const handleClick = () => {
    if(!disabled){
      handleChoice(card)
    }
  }

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img src={card.src} alt="card front" className="front" />
        <img src={Cover} onClick={handleClick} className="back" alt="card back" />
      </div>
    </div>
  );
}
export default Card
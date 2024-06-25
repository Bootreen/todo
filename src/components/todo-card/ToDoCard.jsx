import "./ToDoCard.css";
import { useToDoActions } from "../../store/store";

export const ToDoCard = ({ id, title, desc, isFinished }) => {
  const { onCheckClick, onCloseClick } = useToDoActions();
  return (
    <div className='task-card'>
      <div className='header-container'>
        <h3>{title}</h3>
        <div className='control-container'>
          <div className='control-button' onClick={() => onCheckClick(id)}>
            {isFinished ? (
              <span className='finished'>{"\u2714"}</span>
            ) : (
              <span className='unfinished'>{"\u26F6"}</span>
            )}
          </div>
          <div className='control-button' onClick={() => onCloseClick(id)}>
            <span className='close'>{"\u2716"}</span>
          </div>
        </div>
      </div>
      {desc.split("\n").map((line, id) => (
        <p key={id}>{line}</p>
      ))}
    </div>
  );
};

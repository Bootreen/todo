import "./NewTaskForm.css";
import { useToDoStore, useToDoActions } from "../../store/store";

export const NewTaskForm = () => {
  const { title, desc, isStarted, isEmpty } = useToDoStore(
    (state) => state.newTask
  );
  const {
    onTaskStart,
    onTitleChange,
    onDescChange,
    createNewTask,
    resetNewTask,
  } = useToDoActions();

  const textAreaAdjustHeight = (event) => {
    event.target.setAttribute("style", "height: auto");
    event.target.setAttribute(
      "style",
      "height:" + event.target.scrollHeight + "px"
    );
  };

  return isStarted ? (
    <form onSubmit={(event) => createNewTask(event)} className='new-task-form'>
      <label htmlFor='title'>New reminder</label>
      <input
        id='title'
        type='text'
        value={title}
        autoFocus
        onChange={(event) => onTitleChange(event)}
      />
      <label>Expanded description, if needed</label>
      <textarea
        id='desc'
        type='text'
        value={desc}
        onChange={(event) => onDescChange(event)}
        onKeyUp={(event) => textAreaAdjustHeight(event)}
      />
      <div className='buttons-container'>
        <button type='submit' disabled={isEmpty}>
          Save
        </button>
        <button onClick={(event) => resetNewTask(event)}>Cancel</button>
      </div>
    </form>
  ) : (
    <div className='new-task-form waiting' onClick={onTaskStart}>
      <h3>Add a new reminder</h3>
    </div>
  );
};

import "./App.css";
import { ToDoList } from "./components/todo-list/ToDoList";

const App = () => {
  return (
    <div className='app-container'>
      <h2>Marvelous Reminder</h2>
      <ToDoList />
    </div>
  );
};

export default App;

import { useToDoStore } from "../../store/store";
import { ToDoCard } from "../todo-card/ToDoCard";
import { NewTaskForm } from "../new-task-form/NewTaskForm";

export const ToDoList = () => {
  const toDoList = useToDoStore((store) => store.toDoList);

  return (
    <>
      <NewTaskForm />
      {Object.entries(toDoList).map(([id, { title, desc, isFinished }]) => (
        <ToDoCard
          key={id}
          id={id}
          title={title}
          desc={desc}
          isFinished={isFinished}
        />
      ))}
    </>
  );
};

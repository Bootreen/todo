import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export const useToDoStore = create(
  immer((set, get) => ({
    toDoList: {},

    newTask: {
      isStarted: false,
      title: "",
      desc: "",
    },

    actions: {
      onCloseClick: (id) =>
        set((state) => {
          delete state.toDoList[id];
          return state;
        }),

      onCheckClick: (id) =>
        set((state) => {
          state.toDoList[id].isFinished = !state.toDoList[id].isFinished;
        }),

      onTaskStart: () => set((state) => void (state.newTask.isStarted = true)),

      onTitleChange: (event) =>
        set((state) => {
          state.newTask.title = event.target.value;
        }),

      onDescChange: (event) =>
        set((state) => {
          state.newTask.desc = event.target.value;
        }),

      resetNewTask: () =>
        set((state) => {
          state.newTask = { title: "", desc: "", isStarted: false };
        }),

      createNewTask: () => {
        // trim title and desc to prevent create 'spaces-only' kind of task
        set((state) => {
          state.newTask = {
            title: state.newTask.title.trim(),
            desc: state.newTask.desc.trim(),
            isStarted: state.newTask.isStarted,
          };
        });
        if (get().newTask.title === "" && get().newTask.desc === "") {
          alert("You can't create an empty task");
        } else {
          set((state) => {
            Object.assign(state.toDoList, {
              [uuidv4()]: {
                title: state.newTask.title,
                desc: state.newTask.desc,
                isFinished: false,
              },
            });
          });
          console.log(get().toDoList);
          get().actions.resetNewTask();
        }
      },
    },
  }))
);

export const useToDoActions = () => useToDoStore((state) => state.actions);

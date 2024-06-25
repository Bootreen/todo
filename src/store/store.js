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
      isEmpty: true,
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

      onTitleChange: (event) => {
        set((state) => {
          state.newTask.title = event.target.value;
        });
        get().actions.checkEmptyTask();
      },

      onDescChange: (event) => {
        set((state) => {
          state.newTask.desc = event.target.value;
        });
        get().actions.checkEmptyTask();
      },

      checkEmptyTask: () =>
        set((state) => {
          state.newTask.isEmpty =
            get().newTask.title.trim() === "" &&
            get().newTask.desc.trim() === ""
              ? true
              : false;
        }),

      trimTaskText: () =>
        set((state) => {
          state.newTask = {
            title: state.newTask.title.trim(),
            desc: state.newTask.desc.trim(),
            isStarted: state.newTask.isStarted,
            isEmpty: state.newTask.isEmpty,
          };
        }),

      resetNewTask: () =>
        set((state) => {
          state.newTask = {
            title: "",
            desc: "",
            isStarted: false,
            isEmpty: true,
          };
        }),

      createNewTask: (event) => {
        event.preventDefault();
        get().actions.trimTaskText();
        set((state) => {
          Object.assign(state.toDoList, {
            [uuidv4()]: {
              title: state.newTask.title,
              desc: state.newTask.desc,
              isFinished: false,
            },
          });
        });
        get().actions.resetNewTask();
      },
    },
  }))
);

export const useToDoActions = () => useToDoStore((state) => state.actions);

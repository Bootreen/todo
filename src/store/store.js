import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export const useStore = create(
  immer((set, get) => ({
    toDoList: {},

    actions: {
      placeholder: () => set({ toDoList: get() }),
    },
  }))
);

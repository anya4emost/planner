import { create } from "zustand";
import { tasksRequest } from "../api/requests";
import { devtools } from "zustand/middleware";

export const useTaskStore = create(devtools((set) => ({
  tasks: [],
  loading: false,
  error: null,

  // actions
  fetchAllTasks: async () => {
    set({ loading: true });

    try {
      let requestResult = await tasksRequest();
      if (requestResult.error) {
        throw new Error(requestResult.error.message);
      }
      set({ tasks: requestResult.data });
      set({ loading: false });
    } catch (error) {
      console.error(error);
    }
  },
  // examples
  // bears: 0,
  // increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  // removeAllBears: () => set({ bears: 0 }),
  // updateBears: (newBears) => set({ bears: newBears }),
})));

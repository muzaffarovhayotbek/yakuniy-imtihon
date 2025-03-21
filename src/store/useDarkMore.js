import { create } from "zustand";

const useDarkModeStore = create((set) => ({
  theme: localStorage.getItem("theme") || "light",
  toggle: () =>
    set((state) => {
      const blackTheme = state.theme == "light" ? "dark" : "light";
      localStorage.setItem("theme", blackTheme);
      return { theme: blackTheme };
    }),
}));

export default useDarkModeStore;    
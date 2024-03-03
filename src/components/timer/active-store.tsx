import { create } from "zustand";

export const useActiveStore = create<boolean>()(() => true);

let timer: number;
const onMouseMove = () => {
  useActiveStore.setState(true);
  clearTimeout(timer);
  timer = setTimeout(() => {
    useActiveStore.setState(false);
  }, 2000);
};

window.addEventListener("mousemove", onMouseMove);

/**
 * ActiveProvider.tsx
 * This file is the context provider for identifying weather the mouse is active or not.
 * If the mouse is out of the window for 3 seconds, the mouse is considered inactive.
 * If the mouse is is inside of the window but not moving for 3 seconds, the mouse is considered inactive.
 * Otherwise, the mouse is considered active.
 */

import { createContext, useContext, useEffect, useState } from "react";

export const ActiveContext = createContext<boolean>(true);

export const useActiveContext = () => useContext(ActiveContext);

export const ActiveProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let timer: number;

    const onMouseMove = () => {
      setIsActive(true);
      clearTimeout(timer);
      timer = setTimeout(() => {
        setIsActive(false);
      }, 2000);
    };

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      clearTimeout(timer);
    };
  }, []);

  return (
    <ActiveContext.Provider value={isActive}>{children}</ActiveContext.Provider>
  );
};

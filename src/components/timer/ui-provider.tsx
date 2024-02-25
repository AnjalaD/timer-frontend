import { createContext, useContext, useState } from "react";

export type UiContextType = {
  isClockVisible: boolean;
  showClock: () => void;
  hideClock: () => void;
};

const UiContext = createContext<UiContextType>({
  isClockVisible: true,
  showClock: () => {},
  hideClock: () => {},
});

export const useUiContext = () => useContext(UiContext);

export const UiProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isClockVisible, setIsClockVisible] = useState(true);

  const showClock = () => {
    setIsClockVisible(true);
  };

  const hideClock = () => {
    setIsClockVisible(false);
  };

  return (
    <UiContext.Provider
      value={{
        isClockVisible,
        showClock,
        hideClock,
      }}
    >
      {children}
    </UiContext.Provider>
  );
};

import { Link } from "react-router-dom";
import { TimerProvider } from "../components/timer/timer-provider";
import { ControlPanel } from "../components/timer/control-panel";
import { Display } from "../components/timer/display";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { cn } from "../util/cn";
import { DoubleArrowDownIcon, DoubleArrowUpIcon } from "@radix-ui/react-icons";
import { useActiveContext } from "../components/timer/active-provider";
import { UiProvider } from "../components/timer/ui-provider";

export const TimerPage = () => {
  const isActive = useActiveContext();

  const [showPanel, setShowPanel] = useState(true);

  return (
    <TimerProvider>
      <UiProvider>
        <div className="bg-gray-900 text-white">
          <div className="min-h-screen flex items-stretch">
            <div
              className={cn(
                "relative flex-1 flex flex-col justify-center items-center",
                !showPanel && "flex-none"
              )}
            >
              {showPanel && (
                <>
                  <div className="mb-8">
                    <h1>Timer</h1>
                    <Link to="/">Home</Link>
                  </div>

                  <ControlPanel />

                  <div className="absolute -right-px top-1/2 transform -translate-y-1/2 w-px h-4/5 bg-white" />
                </>
              )}

              <Button
                className={cn(
                  "absolute right-0 top-1/2",
                  "transform  rotate-90 origin-bottom-right",
                  "border-b-0 rounded-b-none h-auto pb-3",
                  "transition-opacity duration-300 opacity-100",
                  !isActive && !showPanel && " opacity-0"
                )}
                variant="outline"
                onClick={() => setShowPanel(!showPanel)}
              >
                {showPanel ? (
                  <DoubleArrowDownIcon className="mr-2 h-4 w-4" />
                ) : (
                  <DoubleArrowUpIcon className="mr-2 h-4 w-4" />
                )}
                {showPanel ? "Hide" : "Show"} Control Panel
              </Button>
            </div>

            <div className="w-0.5"></div>

            <Display />
          </div>
        </div>
      </UiProvider>
    </TimerProvider>
  );
};

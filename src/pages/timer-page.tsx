import { ControlPanel } from "../components/timer/control-panel";
import { Display } from "../components/timer/display";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { cn } from "../util/cn";
import { DoubleArrowDownIcon, DoubleArrowUpIcon } from "@radix-ui/react-icons";
import { useActiveStore } from "../components/timer/active-store";

export const TimerPage = () => {
  const isActive = useActiveStore();

  const [showPanel, setShowPanel] = useState(true);

  return (
    <div className="bg-gray-900 text-white">
      <div className="min-h-screen flex items-stretch">
        <div
          className={cn(
            "relative flex-1 flex flex-col justify-center items-center",
            !showPanel && "flex-none"
          )}
        >
          {showPanel && (
            <div className="px-8">
              <div className="mb-8">
                <h1 className="text-4xl font-bold">
                  Timer
                  <span className="text-sm font-semibold">
                    &nbsp;with&nbsp;
                  </span>
                  Remote
                </h1>
              </div>

              <ControlPanel />

              <div className="absolute -right-px top-1/2 transform -translate-y-1/2 w-px h-4/5 bg-white" />
            </div>
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
  );
};

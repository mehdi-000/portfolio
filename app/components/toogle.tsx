"use client";

import { CSSProperties, useState } from "react";

type ToggleProps = {
  isOn?: boolean;
  labelOn?: string;
  labelOff?: string;
  onChange?: (isOn: boolean) => void;
};

export const Toggle = (props: ToggleProps): React.ReactElement => {
  const { isOn: isOnDefault = false, onChange } = props;

  const [isOn, setIsOn] = useState(isOnDefault);

  const onToggle = (): void => {
    const newState = !isOn;
    setIsOn(newState);
    if (onChange) {
      onChange(newState);
    }
  };

  const toggleRandomId = `toggle-${Math.random().toString(36).substring(2)}`;

  const toggleDotStyles: CSSProperties = {
    transform: isOn ? "translateX(100%)" : "translateX(0)",
    transition: "transform 0.3s ease-in-out",
  };

  const toggleLineStyles: CSSProperties = {
    backgroundColor: isOn ? "#046c6e" : "#3d2fd4",
    transition: "background-color 0.3s ease-in-out",
  };

  if (!isOn)
    return (
      <div className="md:hidden font-heebo absolute inset-0 flex items-center justify-center w-full h-full z-50 backdrop-blur-2xl bg-zinc-800/30">
        <div className="text-center">
          <p className="text-lg font-medium text-white mb-4">
            Please activate the gyro sensors <br></br> to continue
          </p>
          <label
            htmlFor={toggleRandomId}
            className="flex items-center justify-center cursor-pointer"
          >
            <div className="relative">
              <input
                id={toggleRandomId}
                type="checkbox"
                className="hidden"
                onChange={onToggle}
                checked={isOn}
              />
              <div
                style={toggleLineStyles}
                className="toggle__line w-14 h-8 rounded-full shadow-inner"
              />
              <div
                style={toggleDotStyles}
                className="toggle__dot absolute w-6 h-6 bg-white rounded-full shadow top-1 left-1"
              />
            </div>
          </label>
        </div>
      </div>
    );
  else return <></>;
};

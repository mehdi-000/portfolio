"use client";

import { useState, useEffect } from "react";
import { useDeviceOrientationContext } from "@/app/components/hooks/DeviceOrientationContext";

type ToggleProps = {
  isOn?: boolean;
  onChange?: (isOn: boolean) => void;
};

export const Toggle = ({
  isOn: isOnDefault = false,
  onChange,
}: ToggleProps) => {
  const [isOn, setIsOn] = useState(isOnDefault);
  const [isVisible, setIsVisible] = useState(true);

  const onToggle = () => {
    setIsOn((prev) => !prev);
    onChange?.(!isOn);
  };

  useEffect(() => {
    if (isOn) {
      setTimeout(() => setIsVisible(false), 400);
    }
  }, [isOn]);

  if (!isVisible) return null;

  return (
    <div className="md:hidden font-heebo fixed inset-0 flex items-center justify-center z-50 backdrop-blur-2xl bg-zinc-800/30 transition-opacity duration-300">
      <div className="text-center">
        <p className="text-lg font-medium text-white mb-4">
          Please activate the gyro sensors <br /> to continue
        </p>
        <label className="flex items-center justify-center cursor-pointer">
          <div className="relative">
            <input
              type="checkbox"
              className="hidden"
              onChange={onToggle}
              checked={isOn}
            />
            <div
              className={`w-14 h-8 rounded-full shadow-inner transition-colors duration-300 ${
                isOn ? "bg-[#c23e91]" : "bg-[#3d2fd4]"
              }`}
            />
            <div
              className={`absolute w-6 h-6 bg-white rounded-full shadow top-1 left-1 transition-transform duration-300 ${
                isOn ? "translate-x-full" : ""
              }`}
            />
          </div>
        </label>
      </div>
    </div>
  );
};

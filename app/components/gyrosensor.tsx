"use client";

import { useDeviceOrientation } from "@/app/components/useDeviceOrientation";
import { Toggle } from "./toogle";

export const Gyro = () => {
  const { orientation, requestAccess, revokeAccess, error } =
    useDeviceOrientation();

  const onChange = (toggleState: boolean): void => {
    const result = toggleState ? requestAccess() : revokeAccess();
  };

  const orientationInfo = orientation && (
    <ul>
      <li>
        ɑ: <code>{orientation.alpha}</code>
      </li>
      <li>
        β: <code>{orientation.beta}</code>
      </li>
      <li>
        γ: <code>{orientation.gamma}</code>
      </li>
    </ul>
  );

  const errorElement = error ? (
    <div className="error">{error.message}</div>
  ) : null;

  return (
    <>
      <Toggle onChange={onChange} />
      {orientationInfo}
      {errorElement}
    </>
  );
};

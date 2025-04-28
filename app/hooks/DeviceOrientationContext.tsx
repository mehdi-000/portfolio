"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from "react";

type DeviceOrientation = {
  alpha: number | null;
  beta: number | null;
  gamma: number | null;
  absolute: boolean | null;
};

type ContextType = {
  orientation: DeviceOrientation | null;
  error: Error | null;
  requestAccess: () => Promise<boolean>;
  revokeAccess: () => Promise<void>;
};

const DeviceOrientationContext = createContext<ContextType | undefined>(
  undefined
);

export const DeviceOrientationProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [orientation, setOrientation] = useState<DeviceOrientation | null>(
    null
  );
  const [error, setError] = useState<Error | null>(null);

  const onDeviceOrientation = (event: DeviceOrientationEvent): void => {
    setOrientation({
      alpha: event.alpha,
      beta: event.beta,
      gamma: event.gamma,
      absolute: event.absolute,
    });
  };

  const revokeAccess = useCallback(async (): Promise<void> => {
    window.removeEventListener("deviceorientation", onDeviceOrientation);
    setOrientation(null);
  }, []);

  const requestAccess = useCallback(async (): Promise<boolean> => {
    if (typeof DeviceOrientationEvent === "undefined") {
      setError(new Error("Device orientation not supported"));
      return false;
    }

    if (
      typeof (DeviceOrientationEvent as any).requestPermission === "function"
    ) {
      try {
        const permission = await (
          DeviceOrientationEvent as any
        ).requestPermission();
        if (permission !== "granted") {
          setError(new Error("Permission denied"));
          return false;
        }
      } catch (err) {
        setError(err as Error);
        return false;
      }
    }

    window.addEventListener("deviceorientation", onDeviceOrientation);
    return true;
  }, []);

  useEffect(() => {
    return () => {
      revokeAccess();
    };
  }, [revokeAccess]);

  return (
    <DeviceOrientationContext.Provider
      value={{ orientation, error, requestAccess, revokeAccess }}
    >
      {children}
    </DeviceOrientationContext.Provider>
  );
};

export const useDeviceOrientationContext = () => {
  const context = useContext(DeviceOrientationContext);
  if (!context) {
    throw new Error(
      "useDeviceOrientationContext must be used within DeviceOrientationProvider"
    );
  }
  return context;
};

"use client";

import { useCallback, useEffect, useState } from "react";

type DeviceOrientation = {
  alpha: number | null;
  beta: number | null;
  gamma: number | null;
  absolute: boolean | null;
};

type UseDeviceOrientationData = {
  orientation: DeviceOrientation | null;
  error: Error | null;
  requestAccess: () => Promise<boolean>;
  revokeAccess: () => void;
};

declare global {
  interface DeviceOrientationEvent {
    requestPermission?: () => Promise<"granted" | "denied">;
  }
}

export const useDeviceOrientation = (): UseDeviceOrientationData => {
  const [error, setError] = useState<Error | null>(null);
  const [orientation, setOrientation] = useState<DeviceOrientation | null>(
    null
  );

  const onDeviceOrientation = (event: DeviceOrientationEvent): void => {
    setOrientation({
      alpha: event.alpha,
      beta: event.beta,
      gamma: event.gamma,
      absolute: event.absolute,
    });
  };

  const revokeAccess = useCallback((): void => {
    window.removeEventListener("deviceorientation", onDeviceOrientation);
    setOrientation(null);
    localStorage.removeItem("gyroPermission");
  }, []);

  const requestAccess = useCallback(async (): Promise<boolean> => {
    if (typeof DeviceOrientationEvent === "undefined") {
      setError(
        new Error("Device orientation event is not supported by your browser")
      );
      return false;
    }

    // Handle permission request if required
    if (
      typeof DeviceOrientationEvent.prototype.requestPermission === "function"
    ) {
      try {
        const permission =
          await DeviceOrientationEvent.prototype.requestPermission();
        if (permission !== "granted") {
          throw new Error("Request to access device orientation was denied");
        }
        localStorage.setItem("gyroPermission", "granted");
      } catch (err) {
        setError(err as Error);
        return false;
      }
    }

    window.addEventListener("deviceorientation", onDeviceOrientation);
    return true;
  }, []);

  useEffect(() => {
    // Automatically enable orientation if permission is stored
    if (localStorage.getItem("gyroPermission") === "granted") {
      window.addEventListener("deviceorientation", onDeviceOrientation);
    }

    return () => {
      revokeAccess();
    };
  }, [revokeAccess]);

  return {
    orientation,
    error,
    requestAccess,
    revokeAccess,
  };
};

import "react";

declare module "react" {
  interface CSSProperties {
    "--glow-color"?: string;
  }
}
declare module "troika-three-text" {
  export const Text: any;
}

// Inside global.d.ts
console.log("Troika module types loaded");

import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./main";
import { onCLS, onFCP, onFID, onINP, onLCP, onTTFB } from "web-vitals";

const container = document.getElementById("root");
const root = createRoot(container as Element);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

onCLS(console.log, { reportAllChanges: true });
onFID(console.log, { reportAllChanges: true });
onLCP(console.log, { reportAllChanges: true });
onTTFB(console.log, { reportAllChanges: true });
onFCP(console.log, { reportAllChanges: true });
onINP(console.log, { reportAllChanges: true });

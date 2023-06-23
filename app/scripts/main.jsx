import React from "react";
import { createRoot } from "react-dom/client";

import { Menu } from "./components/menu";
import { Home } from "./components/home";

function App() {
  return (
    <div className="App box">
      <div className="Content box">
        <Menu />
        <Home />
      </div>
    </div>
  );
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);

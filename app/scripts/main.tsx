import React from "react";
import { IntlProvider } from "react-intl";
import messages from "../intl/en_US.json";
import { Menu } from "./components/menu";
import { Home } from "./components/home";

export function App() {
  return (
    <IntlProvider locale={navigator.language} messages={messages}>
      <div className="App box">
        <div className="Content box">
          <Menu />
          <Home />
        </div>
      </div>
    </IntlProvider>
  );
}

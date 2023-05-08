import React from "react";
import {createRoot} from "react-dom/client";
import App from "./App";

const appRoot = createRoot(document.getElementById("app-root") as Element);

appRoot.render(<App/>);
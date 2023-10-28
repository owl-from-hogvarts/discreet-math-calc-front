
import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app/App";
import "./main.scss"


const root = createRoot(document.querySelector('react-root')!);
root.render(<App/>)

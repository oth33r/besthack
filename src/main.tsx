import { createRoot } from "react-dom/client";

import App from "./app/App";

import "./app/styles/globals.scss";

createRoot(document.getElementById("root")!).render(<App />);

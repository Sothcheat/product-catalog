import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

const rootEl = document.getElementById("root");

if (rootEl === null) {
	throw new Error("Root element is not defined.");
}

createRoot(rootEl).render(
	<StrictMode>
		<App />
	</StrictMode>,
);

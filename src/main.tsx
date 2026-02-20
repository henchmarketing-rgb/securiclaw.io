import { createRoot } from "react-dom/client";
import { loader } from "@monaco-editor/react";
import App from "./App.tsx";
import { ErrorBoundary } from "./components/ErrorBoundary.tsx";
import "./index.css";

// Load Monaco from CDN instead of bundling it (~500KB savings)
loader.config({
  paths: { vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs" },
});

const root = document.getElementById("root");
if (!root) throw new Error("Root element not found");

createRoot(root).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);

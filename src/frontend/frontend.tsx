import { createRoot } from "react-dom/client";

function App() {
  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>E-Commerce</h1>
      <p>Products coming soon...</p>
    </div>
  );
}

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
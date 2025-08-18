import { RouterProvider } from "react-router-dom";
import "./App.css";
import Router from "./routes/Router";
import UseLenis from "./hooks/useLenis";

function App() {
  UseLenis();
  return <RouterProvider router={Router} />;
}

export default App;

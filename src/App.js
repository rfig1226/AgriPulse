import logo from "./logo.svg";
import "./App.css";
import Dashboard from "./components/dashboard";
import Weather from "./components/weather";

function App() {
  return (
    <div className="App">
      <Weather />
      <Dashboard />
    </div>
  );
}

export default App;

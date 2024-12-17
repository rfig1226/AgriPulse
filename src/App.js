import logo from "./logo.svg";
import "./App.css";
import Dashboard from "./components/dashboard";
import Weather from "./components/weather";
import CropForm from "./components/cropform";

function App() {
  return (
    <div className="App">
      <div>AgriPulse</div>
      <Weather />
      <Dashboard />
      <CropForm />
    </div>
  );
}

export default App;

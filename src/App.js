import logo from "./logo.svg";
import "./App.css";
import Weather from "./components/weather";
import CropForm from "./components/cropform";

function App() {
  return (
    <div className="App">
      <div className="title">AgriPulse</div>
      <Weather />
      <CropForm />
    </div>
  );
}

export default App;

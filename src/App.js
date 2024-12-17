import logo from "./logo.svg";
import "./App.css";
import Weather from "./components/weather";
import CropForm from "./components/cropform";

function App() {
  return (
    <div className="App">
      <div className="title">AgriPulse</div>
      <div className="intro">
        This proof of concept demonstrates how AgriPulse empowers farm owners to
        optimize operations and maximize crop yield. By integrating real-time
        local environmental data, sensor readings, and advanced AI models
        trained on agricultural insights and data, AgriPulse delivers actionable
        recommendations tailored to a farm's unique needs. The crop information
        form simulates sensor data collected from IoT devices purchased from
        AgriPulse and installed on the farm. To visualize the final
        farmer-facing dashboard of insights and sensor data, please refer to{" "}
        <a href="https://www.canva.com/design/DAGVj0fNF40/Mv5v9EauWH9C1bqOLjkB2A/view?utm_content=DAGVj0fNF40&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h39e1881306">
          this slide deck
        </a>
        .
      </div>
      <Weather />
      <CropForm />
    </div>
  );
}

export default App;

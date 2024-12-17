import React, { useState } from "react";
import { useLocation } from "../locationContext.js";
import "../App.css";

function CropForm() {
  const { location } = useLocation(); // Access location state
  const [formData, setFormData] = useState({
    cropType: "",
    fieldSize: "",
    soilType: "",
    soilMoisture: "",
    temperature: "",
    humidity: "",
    lightExposure: "",
    waterTankLevel: "",
    windSpeed: "",
    growthStage: "",
    plantingDate: "",
    irrigationType: "",
  });

  const [errors, setErrors] = useState({});
  const [insights, setInsights] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.cropType) {
      setErrors("Crop Type is required!");
      return;
    }

    try {
      const response = await fetch(
        "https://agripulse-backend.onrender.com/generate_insights",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            crop_data: formData,
            lat: location.lat,
            lon: location.lon,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to generate insights");

      const data = await response.json();
      setInsights(data.insights);
    } catch (err) {
      setErrors("Error generating insights: " + err.message);
    }
  };

  return (
    <div>
      <div className="header">Crop Information Form</div>
      <form onSubmit={handleSubmit}>
        {/* Crop Type */}
        <div>
          <label>
            Crop Type (Required):
            <input
              type="text"
              name="cropType"
              value={formData.cropType}
              onChange={handleChange}
              required
            />
          </label>
          {errors.cropType && <p style={{ color: "red" }}>{errors.cropType}</p>}

          {/* Field Size */}
          <label>
            Field Size (e.g., acres):
            <input
              type="number"
              name="fieldSize"
              value={formData.fieldSize}
              onChange={handleChange}
              placeholder="e.g., 2"
            />
          </label>

          {/* Soil Type */}
          <label>
            Soil Type:
            <select
              name="soilType"
              value={formData.soilType}
              onChange={handleChange}
            >
              <option value="">Select...</option>
              <option value="Sandy">Sandy</option>
              <option value="Loamy">Loamy</option>
              <option value="Clay">Clay</option>
              <option value="Silty">Silty</option>
              <option value="Peaty">Peaty</option>
              <option value="Chalky">Chalky</option>
            </select>
          </label>
        </div>

        <div>
          {/* Soil Moisture */}
          <label>
            Soil Moisture (%):
            <input
              type="number"
              name="soilMoisture"
              value={formData.soilMoisture}
              onChange={handleChange}
              placeholder="e.g., 45"
            />
          </label>

          {/* Temperature */}
          <label>
            Temperature (°F):
            <input
              type="number"
              name="temperature"
              value={formData.temperature}
              onChange={handleChange}
              placeholder="e.g., 75"
            />
          </label>

          {/* Humidity */}
          <label>
            Humidity (%):
            <input
              type="number"
              name="humidity"
              value={formData.humidity}
              onChange={handleChange}
              placeholder="e.g., 60"
            />
          </label>
        </div>
        <div>
          {/* Light Exposure */}
          <label>
            Light Exposure (Hours/Day):
            <input
              type="number"
              name="lightExposure"
              value={formData.lightExposure}
              onChange={handleChange}
              placeholder="e.g., 6"
            />
          </label>

          {/* Water Tank Level */}
          <label>
            Water Tank Level (%):
            <input
              type="number"
              name="waterTankLevel"
              value={formData.waterTankLevel}
              onChange={handleChange}
              placeholder="e.g., 75"
            />
          </label>

          {/* Wind Speed */}
          <label>
            Wind Speed (mph):
            <input
              type="number"
              name="windSpeed"
              value={formData.windSpeed}
              onChange={handleChange}
              placeholder="e.g., 10"
            />
          </label>
        </div>

        <div>
          {/* Growth Stage */}
          <label>
            Growth Stage:
            <select
              name="growthStage"
              value={formData.growthStage}
              onChange={handleChange}
            >
              <option value="">Select...</option>
              <option value="Germination">Germination</option>
              <option value="Vegetative">Vegetative</option>
              <option value="Flowering">Flowering</option>
              <option value="Fruiting">Fruiting</option>
              <option value="Maturity">Maturity</option>
            </select>
          </label>

          {/* Planting Date */}
          <label>
            Planting Date:
            <input
              type="date"
              name="plantingDate"
              value={formData.plantingDate}
              onChange={handleChange}
            />
          </label>

          {/* Irrigation Type */}
          <label>
            Irrigation Type:
            <select
              name="irrigationType"
              value={formData.irrigationType}
              onChange={handleChange}
            >
              <option value="">Select...</option>
              <option value="Drip">Drip</option>
              <option value="Sprinkler">Sprinkler</option>
              <option value="Flood">Flood</option>
              <option value="Manual">Manual</option>
            </select>
          </label>
        </div>

        {/* Submit Button */}
        <button type="submit">Get Insights</button>
      </form>
      {insights && (
        <div className="insights">
          <h3>Insights for {formData.cropType} Crop</h3>
          {/* Format response into sections */}
          {insights.split("\n").map((line, index) => {
            // Check for Subheadings like "* **Temperature:**"
            if (line.match(/^\*\s\*\*(.*?)\*\*/)) {
              const match = line.match(/^\*\s\*\*(.*?)\*\*\s*(.*)/); // Capture subheading and content
              const subheading = match[1]; // The subheading text
              const content = match[2]; // The remaining content after subheading

              return (
                <div key={index} style={{ marginBottom: "10px" }}>
                  <strong style={{ fontSize: "16px", color: "#4A4A4A" }}>
                    {subheading}
                  </strong>{" "}
                  <span style={{ fontSize: "14px", color: "#333" }}>
                    {content}
                  </span>
                </div>
              );
            } else if (line.startsWith("**")) {
              // Major headings
              return (
                <h4 key={index} style={{ marginTop: "15px", color: "#2C3E50" }}>
                  {line.replace(/\*\*/g, "").trim()}
                </h4>
              );
            } else if (line.startsWith("-")) {
              // Bullet points
              return (
                <li key={index} style={{ marginLeft: "20px" }}>
                  {line.replace(/^-/, "").trim()}
                </li>
              );
            } else if (line.trim() !== "") {
              // Regular paragraph content
              return (
                <p key={index} style={{ marginLeft: "10px" }}>
                  {line.trim()}
                </p>
              );
            }
            return null; // Ignore empty lines
          })}
        </div>
      )}
    </div>
  );
}

export default CropForm;

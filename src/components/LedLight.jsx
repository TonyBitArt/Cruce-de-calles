import React from "react";

const LedLight = ({ color, isOn }) => {
  const baseColors = {
    red: "#ff3b30",
    yellow: "#ffcc00",
    green: "#34c759",
  };

  const activeColor = baseColors[color];

  const ledStyle = {
    width: "55px",
    height: "55px",
    borderRadius: "50%",
    backgroundColor: isOn ? activeColor : "#2a2a2a",
    boxShadow: isOn
      ? `0 0 20px 8px ${activeColor}, inset 0 0 10px rgba(255,255,255,0.6)`
      : "inset 0 4px 8px rgba(0,0,0,0.8)",
    margin: "12px auto",
    transition: "all 0.3s ease-in-out",
    border: "2px solid #111",
  };

  return <div style={ledStyle}></div>;
};

export default LedLight;

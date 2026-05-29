import { Box } from "@mui/material";
import LedLight from "./LedLight";

export default function TrafficLight({ color }) {
  const containerStyle = {
    backgroundColor: "#1c1c1c",
    backgroundImage: "linear-gradient(145deg, #2a2a2a, #111111)",
    padding: "20px 15px",
    borderRadius: "20px",
    width: "fit-content",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow:
      "0 15px 30px rgba(0,0,0,0.6), inset 0 2px 2px rgba(255,255,255,0.1)",
    border: "2px solid #0a0a0a",
  };

  return (
    <Box>
      <div style={containerStyle}>
        <LedLight color="red" isOn={color === "red"} />
        <LedLight color="yellow" isOn={color === "yellow"} />
        <LedLight color="green" isOn={color === "green"} />
      </div>
    </Box>
  );
}

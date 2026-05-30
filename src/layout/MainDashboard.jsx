import { useState, useEffect, useRef } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import TrafficLight from "../components/TrafficLight";
import PositiveNumberField from "../components/common/PositiveNumeberField";

export default function MainDashboard() {
  const [times, setTimes] = useState({ green: 1, yellow: 1, red: 1 });
  const [inputs, setInputs] = useState({ ...times });
  const [currentPhase, setCurrentPhase] = useState(1);
  const timerRef = useRef(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    const isGreenPhase = currentPhase % 2 !== 0;
    const waitTime = isGreenPhase ? times.green : times.yellow;

    timerRef.current = setTimeout(() => {
      setCurrentPhase((previousPhase) => {
        return previousPhase === 8 ? 1 : previousPhase + 1;
      });
    }, waitTime * 1000);

    return () => clearTimeout(timerRef.current);
  }, [currentPhase, times]);

  const colorNorth =
    currentPhase === 1 ? "green" : currentPhase === 2 ? "yellow" : "red";
  const colorEast =
    currentPhase === 3 ? "green" : currentPhase === 4 ? "yellow" : "red";
  const colorSouth =
    currentPhase === 5 ? "green" : currentPhase === 6 ? "yellow" : "red";
  const colorWest =
    currentPhase === 7 ? "green" : currentPhase === 8 ? "yellow" : "red";

  const handleApplyConfiguration = () => {
    setTimes(inputs);
    setCurrentPhase(1);
  };

  return (
    <Box sx={{ display: "flex", gap: 4, p: 4 }}>
      <Box
        sx={{ width: "300px", p: 3, border: "1px solid #ccc", borderRadius: 2 }}
      >
        <Typography variant="h5" gutterBottom>
          Panel de configuracion
        </Typography>

        <PositiveNumberField
          label="Tiempo de la luz verde (segundos)"
          value={inputs.green}
          onChange={(newValue) => setInputs({ ...inputs, green: newValue })}
          isDisabled={false}
        />

        <PositiveNumberField
          label="Tiempo de la luz amarilla (segundos)"
          value={inputs.yellow}
          onChange={(newValue) => setInputs({ ...inputs, yellow: newValue })}
          isDisabled={false}
        />

        <PositiveNumberField
          label="Tiempo de la luz roja (segundos)"
          value={inputs.red}
          onChange={(newValue) => setInputs({ ...inputs, red: newValue })}
          isDisabled={false}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleApplyConfiguration}
        >
          Aplicar
        </Button>
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "1000px",
            height: "800px",
            backgroundImage: "url('/InterseccionCalle.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
            border: "2px solid #555",
            borderRadius: "8px",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "2%",
              left: "25%",
              transform: "scale(0.5)",
            }}
          >
            <TrafficLight color={colorNorth} />
          </Box>

          <Box
            sx={{
              position: "absolute",
              bottom: "2%",
              right: "25%",
              transform: "scale(0.5)",
            }}
          >
            <TrafficLight color={colorSouth} />
          </Box>

          <Box
            sx={{
              position: "absolute",
              top: "8%",
              right: "19%",
              transform: "rotate(90deg) scale(0.5)",
            }}
          >
            <TrafficLight color={colorEast} />
          </Box>

          <Box
            sx={{
              position: "absolute",
              bottom: "9%",
              left: "20%",
              transform: "rotate(-90deg) scale(0.5)",
            }}
          >
            <TrafficLight color={colorWest} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

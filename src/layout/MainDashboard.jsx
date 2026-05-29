import { useState, useEffect, useRef } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import TrafficLight from "../components/TrafficLight";

export default function MainDashboard() {
  const [times, setTimes] = useState({ green: 6000, yellow: 2000, red: 4000 });
  const [inputs, setInputs] = useState({ ...times });
  const [currentPhase, setCurrentPhase] = useState(1);
  const timerRef = useRef(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    let waitTime = 0;
    if (currentPhase === 1 || currentPhase === 3) waitTime = times.green;
    if (currentPhase === 2 || currentPhase === 4) waitTime = times.yellow;

    timerRef.current = setTimeout(() => {
      setCurrentPhase((previousPhase) => {
        return previousPhase === 4 ? 1 : previousPhase + 1;
      });
    }, waitTime);

    return () => clearTimeout(timerRef.current);
  }, [currentPhase, times]);

  const colorNorthSouth =
    currentPhase === 1 ? "green" : currentPhase === 2 ? "yellow" : "red";
  const colorEastWest =
    currentPhase === 3 ? "green" : currentPhase === 4 ? "yellow" : "red";

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

        <TextField
          label="Tiempo de la luz verde (ms)"
          type="number"
          fullWidth
          margin="normal"
          value={inputs.green}
          onChange={(e) =>
            setInputs({
              ...inputs,
              green: Number(e.target.value),
            })
          }
        />

        <TextField
          label="Tiempo de la luz amarilla (ms)"
          type="number"
          fullWidth
          margin="normal"
          value={inputs.yellow}
          onChange={(e) =>
            setInputs({
              ...inputs,
              yellow: Number(e.target.value),
            })
          }
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
        <Typography variant="h4" gutterBottom>
          Numero de fase: {currentPhase}
        </Typography>

        <Box
          sx={{
            width: "1735px",
            height: "1777px",
            backgroundImage: "url('/InerseccionCalle.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
            border: "2px solid #555",
            borderRadius: "8px",
          }}
        >
          <Box sx={{ position: "absolute", top: "10%", left: "30%" }}>
            <TrafficLight color={colorNorthSouth} />
          </Box>

          <Box sx={{ position: "absolute", bottom: "10%", right: "30%" }}>
            <TrafficLight color={colorNorthSouth} />
          </Box>

          <Box
            sx={{
              position: "absolute",
              top: "30%",
              right: "10%",
              transform: "rotate(90deg)",
            }}
          >
            <TrafficLight color={colorEastWest} />
          </Box>

          <Box
            sx={{
              position: "absolute",
              bottom: "30%",
              left: "10%",
              transform: "rotate(-90deg)",
            }}
          >
            <TrafficLight color={colorEastWest} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

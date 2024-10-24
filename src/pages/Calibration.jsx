// src/pages/Calibration.js
import React, { useState } from 'react';
import { Button, TextField, Box, Typography, Paper } from '@mui/material';

function Calibration() {
  const [calibrationValue, setCalibrationValue] = useState('');

  const handleCalibration = () => {
    console.log('Calibração realizada com o valor:', calibrationValue);
  };

  return (
    <Box>
      <Paper elevation={3} style={{ padding: 16 }}>
        <Typography variant="h5">Calibração e Leitura</Typography>
        <TextField
          label="Valor de Calibração"
          variant="outlined"
          value={calibrationValue}
          onChange={(e) => setCalibrationValue(e.target.value)}
          fullWidth
          style={{ marginBottom: 16 }}
        />
        <Button variant="contained" color="primary" onClick={handleCalibration}>
          Calibrar
        </Button>
      </Paper>
    </Box>
  );
}

export default Calibration;

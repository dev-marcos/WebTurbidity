// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import { Typography, Box, Paper } from '@mui/material';

function Home() {
  const [status, setStatus] = useState('Conectado');
  const [value, setValue] = useState(0);

  // Simula leitura de valores da sonda
  useEffect(() => {
    const interval = setInterval(() => {
      const randomValue = (Math.random() * 100).toFixed(2); // Simulação de leitura
      setValue(randomValue);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box>
      <Paper elevation={3} style={{ padding: 16 }}>
        <Typography variant="h5">Status do Sistema</Typography>
        <Typography variant="subtitle1">Status: {status}</Typography>
        <Typography variant="subtitle1">Valor Atual da Leitura: {value}</Typography>
      </Paper>
    </Box>
  );
}

export default Home;

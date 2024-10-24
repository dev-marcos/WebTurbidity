// src/pages/Communication.js
import React, { useState } from 'react';
import { Button, TextField, Box, Typography, Paper } from '@mui/material';

function Communication() {
  const [wifiSSID, setWifiSSID] = useState('');
  const [wifiPassword, setWifiPassword] = useState('');
  const [lorawanKey, setLorawanKey] = useState('');

  const handleSaveCommunication = () => {
    console.log('Configuração salva:', { wifiSSID, wifiPassword, lorawanKey });
  };

  return (
    <Box>
      <Paper elevation={3} style={{ padding: 16 }}>
        <Typography variant="h5">Dados e Comunicação</Typography>
        <TextField
          label="WiFi SSID"
          variant="outlined"
          value={wifiSSID}
          onChange={(e) => setWifiSSID(e.target.value)}
          fullWidth
          style={{ marginBottom: 16 }}
        />
        <TextField
          label="WiFi Password"
          variant="outlined"
          type="password"
          value={wifiPassword}
          onChange={(e) => setWifiPassword(e.target.value)}
          fullWidth
          style={{ marginBottom: 16 }}
        />
        <TextField
          label="LoRaWAN Key"
          variant="outlined"
          value={lorawanKey}
          onChange={(e) => setLorawanKey(e.target.value)}
          fullWidth
          style={{ marginBottom: 16 }}
        />
        <Button variant="contained" color="primary" onClick={handleSaveCommunication}>
          Salvar Configurações
        </Button>
      </Paper>
    </Box>
  );
}

export default Communication;

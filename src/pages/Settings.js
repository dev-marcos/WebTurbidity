// src/pages/Settings.js
import React, { useState } from 'react';
import { Button, TextField, Box, Typography, Paper } from '@mui/material';

function Settings() {
  const [firmwareVersion, setFirmwareVersion] = useState('');
  const [parameter, setParameter] = useState('');

  const handleSaveSettings = () => {
    console.log('Configurações salvas:', { firmwareVersion, parameter });
  };

  const handleFirmwareUpdate = () => {
    console.log('Atualizando Firmware para versão:', firmwareVersion);
  };

  return (
    <Box>
      <Paper elevation={3} style={{ padding: 16 }}>
        <Typography variant="h5">Configurações Gerais</Typography>
        <TextField
          label="Versão do Firmware"
          variant="outlined"
          value={firmwareVersion}
          onChange={(e) => setFirmwareVersion(e.target.value)}
          fullWidth
          style={{ marginBottom: 16 }}
        />
        <TextField
          label="Parâmetros da Sonda"
          variant="outlined"
          value={parameter}
          onChange={(e) => setParameter(e.target.value)}
          fullWidth
          style={{ marginBottom: 16 }}
        />
        <Button variant="contained" color="primary" onClick={handleSaveSettings} style={{ marginRight: 16 }}>
          Salvar Configurações
        </Button>
        <Button variant="contained" color="secondary" onClick={handleFirmwareUpdate}>
          Atualizar Firmware
        </Button>
      </Paper>
    </Box>
  );
}

export default Settings;

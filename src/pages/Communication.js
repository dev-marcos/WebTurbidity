// src/pages/Communication.js
import React, { useState } from 'react';
import { Button, TextField, Box, Typography, Paper } from '@mui/material';

function Communication() {
  const [wifiSSID, setWifiSSID] = useState('');
  const [wifiPassword, setWifiPassword] = useState('');
  const [lorawanKey, setLorawanKey] = useState('');

  const [port, setPort] = useState(null);
  const [connected, setConnected] = useState(false);
  const [imageMatrix, setImageMatrix] = useState(null);


  // Conecta ao dispositivo serial
  const connectSerial = async () => {
    try {
      const selectedPort = await navigator.serial.requestPort();
      console.log("selectedPort", selectedPort);
      await selectedPort.open({ baudRate: 115200 });
      setPort(selectedPort);
      setConnected(true);
    } catch (error) {
      console.error('Erro ao conectar:', error);
    }
  };

  // Desconecta do dispositivo
  const disconnectSerial = async () => {
    if (port) {
      await port.close();
      setPort(null);
      setConnected(false);
      setImageMatrix(null);
    }
  };


  const requestImage = async () => {
    if (port) {
      const writer = port.writable.getWriter();
      await writer.write(new TextEncoder().encode("CAPTURE\n"));
      writer.releaseLock();

      const reader = port.readable.getReader();
      let matrixData = '';

      try {
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          matrixData += new TextDecoder().decode(value);
        }

        // Converte a string em uma matriz de números
        const parsedMatrix = eval(matrixData);  // Converte a string em array de arrays
        setImageMatrix(parsedMatrix);
      } catch (error) {
        console.error('Erro ao receber imagem:', error);
      } finally {
        reader.releaseLock();
      }
    }
  };

  const renderImage = () => {
    if (!imageMatrix) return null;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = imageMatrix[0].length;
    canvas.height = imageMatrix.length;

    const imageData = context.createImageData(canvas.width, canvas.height);

    // Preenche o ImageData com valores da matriz
    imageMatrix.flat().forEach((value, i) => {
      imageData.data[i * 4] = value;        // Vermelho
      imageData.data[i * 4 + 1] = value;    // Verde
      imageData.data[i * 4 + 2] = value;    // Azul
      imageData.data[i * 4 + 3] = 255;      // Alpha
    });

    context.putImageData(imageData, 0, 0);
    return <img src={canvas.toDataURL()} alt="Imagem recebida" />;
  };



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

        <div>
          <h2>Receber Imagem da Câmera</h2>
          {connected ? (
            <div>
              <button onClick={disconnectSerial}>Desconectar</button>
              <button onClick={requestImage}>Receber Imagem</button>
              <div>
                <h3>Imagem Recebida:</h3>
                {renderImage()}
              </div>
            </div>
          ) : (
            <button onClick={connectSerial}>Conectar</button>
          )}
        </div>

      </Paper>
    </Box>
  );
}

export default Communication;

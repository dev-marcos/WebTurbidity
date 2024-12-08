// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import { Typography, Box, Paper, Button } from '@mui/material';
import { useBluetooth  } from '../context/BluetoothContext';


  // Função utilitária para simular valores conforme a sequência desejada
  const getSimulatedValue = (requestCount) => {
    if (requestCount === 1) return Math.floor(Math.random() * -200);
    if (requestCount === 2 || requestCount === 3) return Math.floor(Math.random() * 50) + 450;
    if (requestCount === 4) return Math.floor(Math.random() * 20);
    if (requestCount === 5) return Math.floor(Math.random() * 50) + 450;
    if (requestCount === 6) return Math.floor(Math.random() * 20);
    if (requestCount === 7) return Math.floor(Math.random() * -200);
    return null;
  };

  const delay = ms => new Promise(res => setTimeout(res, ms));
  

function Home() {
  const [status, setStatus] = useState('Conectado');
  const [value, setValue] = useState(0);
  const { connectToDevice, disconnect } = useBluetooth();
  const [response, setResponse] = useState(0);
  const [requestCount, setRequestCount] = useState(1);

  const [port, setPort] = useState(null);
  const [connected, setConnected] = useState(false);



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
    }
  };


  const sendCommand = async (command) => {
    if (connected) {
      const writer = port.writable.getWriter();
      const commandData = new TextEncoder().encode(command); // Converte o comando para bytes
      await writer.write(commandData);
      console.log('Leitura solicitada:');
      writer.releaseLock();
    } else {
      console.error('Não está conectado ao dispositivo');
    }
  };


 // Função para solicitar uma leitura
 const requestReading = async () => {
  if (!connected) {
    alert('Conecte-se ao ESP32 primeiro');
    return;
  }

  // Simulando a resposta com base na sequência de leitura
  sendCommand('1');

  await delay(3000);


  const simulatedResponse = getSimulatedValue(requestCount);
  setResponse(simulatedResponse);
  setRequestCount(prevCount => prevCount + 1);
};



  return (
    <Box>
      <Paper elevation={3} style={{ padding: 16 }}>
        <Typography variant="h5">Status do Sistema</Typography>

  
        <Button onClick={connectSerial}>Conectar no dispositivo</Button>
        <Typography variant='subtitle1'>{connected ? 'Conectado' : 'Conectar ao ESP32'}</Typography>

        <Typography variant="subtitle1">Valor Atual da Leitura: {response }</Typography>
        <Button onClick={requestReading} disabled={!connected}>Solicitar Leitura</Button>
      </Paper>
    </Box>
  );
}

export default Home;

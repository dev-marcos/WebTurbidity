import React, { createContext, useState, useContext } from 'react';

const BluetoothContext = createContext();

// Hook para utilizar o BluetoothContext
//export const useBluetooth = () => useContext(BluetoothContext);
export const useBluetooth = () => useContext(BluetoothContext);

export const BluetoothProvider = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const [device, setDevice] = useState(null);
  const [server, setServer] = useState(null);
  const [characteristic, setCharacteristic] = useState(null);


  //Define BLE Device Specs
  var deviceName ='ESP32';
  var bleService = '19b10000-e8f2-537e-4f6c-d104768a1214';
  var ledCharacteristic = '19b10002-e8f2-537e-4f6c-d104768a1214';
  var sensorCharacteristic= '19b10001-e8f2-537e-4f6c-d104768a1214';



  const connectToDevice = async () => {
    try {
      const device = await navigator.bluetooth.requestDevice({
        filters: [{name: deviceName}],
            optionalServices: [bleService]
      });

      const server = await device.gatt.connect();
      const service = await server.getPrimaryService('battery_service'); // Substituir pelo serviço do ESP32
      const characteristic = await service.getCharacteristic('battery_level'); // Substituir pela característica do ESP32

      setDevice(device);
      setServer(server);
      setCharacteristic(characteristic);
      setConnected(true);

      // Opcional: Ler dados iniciais
      const value = await characteristic.readValue();
      console.log('Leitura inicial:', value.getUint8(0));
    } catch (error) {
      console.error('Erro ao conectar', error);
      disconnect();
    }
  };

  const disconnect = () => {
    if (device && device.gatt.connected) {
      device.gatt.disconnect();
    }
    setDevice(null);
    setServer(null);
    setCharacteristic(null);
    setConnected(false);
  };

  const sendCommand = async (command) => {
    if (characteristic) {
      const encoder = new TextEncoder();
      const commandData = encoder.encode(command);
      await characteristic.writeValue(commandData);
      console.log('Comando enviado:', command);
    }
  };

  const readData = async () => {
    if (characteristic) {
      const value = await characteristic.readValue();
      console.log('Dados recebidos:', value.getUint8(0)); // Substituir pela lógica do ESP32
      return value.getUint8(0);
    }
  };

  return (
    <BluetoothContext.Provider
      value={{
        connected,
        connectToDevice,
        disconnect,
        sendCommand,
        readData
      }}
    >
      {children}
    </BluetoothContext.Provider>
  );
};

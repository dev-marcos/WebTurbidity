import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BluetoothProvider } from './context/BluetoothContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BluetoothProvider>
    <App />
    </BluetoothProvider>
  </StrictMode>,
)

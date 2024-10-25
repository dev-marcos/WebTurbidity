import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import BuildIcon from '@mui/icons-material/Build';
import WifiIcon from '@mui/icons-material/Wifi';
import SettingsIcon from '@mui/icons-material/Settings';
import CssBaseline from '@mui/material/CssBaseline';
import Home from './pages/Home';
import Calibration from './pages/Calibration';
import Communication from './pages/Communication';
import Settings from './pages/Settings';
import {BluetoothProvider} from './context/BluetoothContext';
import Navigation from './components/Navigation';
import DashboardLayout from './components/DashboardLayout';
import useMediaQuery from '@mui/material/useMediaQuery';

const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

const NAV_ITEMS = [
  { path: '/home', title: 'Home', icon: <HomeIcon /> },
  { path: '/calibration', title: 'Calibração e Leitura', icon: <BuildIcon /> },
  { path: '/communication', title: 'Dados e Comunicação', icon: <WifiIcon /> },
  { path: '/settings', title: 'Configurações', icon: <SettingsIcon /> },
];

function App() {
  const [currentPath, setCurrentPath] = useState('/home');
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Detecta se a tela é pequena

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const renderPage = () => {
    switch (currentPath) {
      case '/home':
        return <Home />;
      case '/calibration':
        return <Calibration />;
      case '/communication':
        return <Communication />;
      case '/settings':
        return <Settings />;
      default:
        return <Home />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BluetoothProvider>
        <DashboardLayout
          navigationItems={NAV_ITEMS}
          onNavigate={setCurrentPath}
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
          isMobile={isMobile}
        >
          {renderPage()}
        </DashboardLayout>
      </BluetoothProvider>
    </ThemeProvider>
  );
}

export default App;

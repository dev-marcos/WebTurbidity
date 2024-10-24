import React, { useContext, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, CssBaseline, Box, Button, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import BuildIcon from '@mui/icons-material/Build';
import WifiIcon from '@mui/icons-material/Wifi';
import SettingsIcon from '@mui/icons-material/Settings';
import BluetoothConnectedIcon from '@mui/icons-material/BluetoothConnected';
import BluetoothDisabledIcon from '@mui/icons-material/BluetoothDisabled';
import { useBluetooth  } from './context/BluetoothContext';
import Home from './pages/Home';
import Calibration from './pages/Calibration';
import Communication from './pages/Communication';
import Settings from './pages/Settings';

const drawerWidth = 240;

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  //const { connected, connectToDevice, disconnect } = useContext(BluetoothContext); // Usando BluetoothContext
  const { connected, connectToDevice, disconnect } = useBluetooth(); // Usando BluetoothContext

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleConnectionToggle = () => {
    if (connected) {
      disconnect();
    } else {
      connectToDevice();
    }
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem button component={Link} to="/" onClick={handleDrawerToggle}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/calibration" disabled={!connected} onClick={handleDrawerToggle}>
          <ListItemIcon>
            <BuildIcon />
          </ListItemIcon>
          <ListItemText primary="Calibração e Leitura" />
        </ListItem>
        <ListItem button component={Link} to="/communication" disabled={!connected} onClick={handleDrawerToggle}>
          <ListItemIcon>
            <WifiIcon />
          </ListItemIcon>
          <ListItemText primary="Dados e Comunicação" />
        </ListItem>
        <ListItem button component={Link} to="/settings" onClick={handleDrawerToggle}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Configurações" />
        </ListItem>
      </List>
    </div>
  );

  return (
    
      <Router>
        <CssBaseline />
        <Box sx={{ display: 'flex' }}>
          <AppBar position="fixed" sx={{ zIndex: 1300 }}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                Painel de Controle
              </Typography>
              <Button color="inherit" onClick={handleConnectionToggle} sx={{ display: 'flex', alignItems: 'center' }}>
                {connected ? (
                  <>
                    <BluetoothConnectedIcon sx={{ mr: 1 }} />
                    Conectado
                  </>
                ) : (
                  <>
                    <BluetoothDisabledIcon sx={{ mr: 1 }} />
                    Conectar
                  </>
                )}
              </Button>
            </Toolbar>
          </AppBar>

          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>

          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              marginTop: '64px',
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/calibration" element={<Calibration />} />
              <Route path="/communication" element={<Communication />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Box>
        </Box>
      </Router>
  );
}

export default App;

import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Tooltip, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import BluetoothIcon from '@mui/icons-material/Bluetooth';
import BluetoothDisabledIcon from '@mui/icons-material/BluetoothDisabled';
import { useBluetooth } from '../context/BluetoothContext';

function Header({ handleDrawerToggle, isMobile }) {
    const { connected, connectToDevice, disconnect } = useBluetooth();
    

    // Função para alternar a conexão Bluetooth
    const handleBluetoothClick = () => {
        if (connected) {
            disconnect();
        } else {
            connectToDevice();
        }
    };


    

    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
                {isMobile && (
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                )}
                <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                    Web Turbidity
                </Typography>

                {/* Botão de Conexão Bluetooth */}
                <Tooltip title={connected ? "Desconectar Bluetooth" : "Conectar Bluetooth"}>
                    <Box
                        display="flex"
                        alignItems="center"
                        onClick={handleBluetoothClick}
                        sx={{ cursor: 'pointer' }}
                    >
                        <IconButton color="inherit">
                            {connected ? (
                                <BluetoothIcon color="primary" /> // Ícone ativo quando conectado
                            ) : (
                                <BluetoothDisabledIcon color="inherit" /> // Ícone neutro quando desconectado
                            )}
                        </IconButton>
                        <Typography variant="body1" color="inherit">
                            {connected ? "Conectado" : "Desconectado"}
                        </Typography>
                    </Box>
                </Tooltip>
            </Toolbar>
        </AppBar>
    );
}

export default Header;

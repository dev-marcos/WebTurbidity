import React from 'react';
import { Drawer, Box, Toolbar } from '@mui/material';
import Navigation from './Navigation';
import Header from './Header'; // Importando o novo componente Header

const drawerWidth = 240;

function DashboardLayout({ children, navigationItems, onNavigate, mobileOpen, handleDrawerToggle, isMobile }) {
  const drawer = (
    <div>
      <Toolbar />
      <Navigation
        items={navigationItems}
        onNavigate={onNavigate}
        handleDrawerToggle={handleDrawerToggle} // Passa o controle do Drawer para o Navigation
        isMobile={isMobile} // Passa a informação se é mobile ou não
      />
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Reutilizando o Header */}
      <Header handleDrawerToggle={handleDrawerToggle} isMobile={isMobile} />

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="navigation"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>

        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

export default DashboardLayout;

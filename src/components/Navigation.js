import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';

function Navigation({ items, onNavigate, handleDrawerToggle, isMobile }) {
  const handleItemClick = (path) => {
    onNavigate(path); // Muda a página
    if (isMobile) {
      handleDrawerToggle(); // Fecha o Drawer se estiver no modo mobile
    }
  };

  return (
    <List>
      {items.map((item) => (
        <ListItem button key={item.path} onClick={() => handleItemClick(item.path)}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.title} />
        </ListItem>
      ))}
    </List>
  );
}

export default Navigation;

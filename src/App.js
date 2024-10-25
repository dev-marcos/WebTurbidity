import * as React from 'react';
import { extendTheme, styled } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import BuildIcon from '@mui/icons-material/Build';
import WifiIcon from '@mui/icons-material/Wifi';
import SettingsIcon from '@mui/icons-material/Settings';
import { AppProvider, Navigation, Router } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Grid from '@mui/material/Grid2';
import Home from './pages/Home'; // Importando as páginas que você já criou
import Calibration from './pages/Calibration';
import Communication from './pages/Communication';
import Settings from './pages/Settings';
import { BluetoothProvider } from './context/BluetoothContext';

const NAVIGATION = [
  {
    kind: 'header',
    title: 'Menu Principal',
  },
  {
    segment: 'home',
    title: 'Home',
    icon: <HomeIcon />,
  },
  {
    segment: 'calibration',
    title: 'Calibração e Leitura',
    icon: <BuildIcon />,
  },
  {
    segment: 'communication',
    title: 'Dados e Comunicação',
    icon: <WifiIcon />,
  },
  {
    kind: 'divider',
  },
  {
    segment: 'settings',
    title: 'Configurações',
    icon: <SettingsIcon />,
  },
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: 'class',
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function useDemoRouter(initialPath) {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}

const Skeleton = styled('div')(({ theme, height }) => ({
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
  height,
  content: '" "',
}));

function App(props) {
  const { window } = props;

  const router = useDemoRouter('/home');

  const demoWindow = window ? window() : undefined;

  const renderPageContent = () => {
    switch (router.pathname) {
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
    <BluetoothProvider>
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
      branding={{
        //logo: <img src='' />,
        title: 'Web Turbidy'
      }}
    >
      <DashboardLayout>
        <PageContainer>
          <Grid container spacing={1}>
            <Grid size={12}>
              {renderPageContent()}
            </Grid>
          </Grid>
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
    </BluetoothProvider>
  );
}

export default App;

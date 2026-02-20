import { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import useStore from './store/useStore';
import AppRouter from './routes/AppRouter';
import './index.css';

export default function App() {
  const { theme } = useStore();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <HelmetProvider>
      <AppRouter />
    </HelmetProvider>
  );
}

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import MetricasConfig from '../MetricasConfig/MetricasConfig.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MetricasConfig />
  </StrictMode>
);

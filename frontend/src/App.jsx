import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './layout/Layout.jsx';
import Main from './pages/main.jsx';
import Devices from './pages/devices.jsx';
import Plots from './pages/plots.jsx';
import Zone from './pages/zone.jsx';
import Settings from './pages/settings.jsx';
import About from './pages/about.jsx';
import DialogProvider from './context/Dialog.jsx';
import './config/i18n.js';

function App() {
  return (
    <DialogProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="/devices" element={<Devices />} />
          <Route path="/plot" element={<Plots />} />
          <Route path="/zone" element={<Zone />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </DialogProvider>
  );
}

export default App;

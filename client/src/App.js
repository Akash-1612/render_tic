import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Offline from './pages/offline';
import Online from './pages/online';

function App() {
  return (


          <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/offline" element={<Offline />} />
            <Route path="/online" element={<Online />} />
          </Routes>
        </BrowserRouter>
  );
}

export default App;

import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { SWRConfig } from 'swr';

import './App.css';
import TopBar from './components/TopBar';
import About from './pages/About/About';
import Forecast from './pages/Forecast';
import Home from './pages/Home';
import { SearchContext } from './hooks/useSearchContext';

function App() {
  const [displayName, setDisplayName] = useState<string>('');

  return (
    <SWRConfig
      value={{
        refreshInterval: 0,
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}>
      <div className="App">
        <TopBar />
        <main>
          <SearchContext.Provider value={{ displayName, setDisplayName }}>
            <Routes>
              <Route index element={<Home />} />
              <Route path="/forecast/:lon/:lat" element={<Forecast />} />
              <Route path="about" element={<About />} />
            </Routes>
          </SearchContext.Provider>
        </main>
      </div>
    </SWRConfig>
  );
}

export default App;

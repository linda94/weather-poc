import { Route, Routes } from 'react-router-dom';
import { SWRConfig } from 'swr';

import './App.css';
import TopBar from './components/TopBar';
import About from './pages/About/About';
import Home from './pages/Home';

function App() {
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
          <Routes>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
          </Routes>
        </main>
      </div>
    </SWRConfig>
  );
}

export default App;

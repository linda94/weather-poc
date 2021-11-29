import { Route, Routes } from 'react-router-dom';

import './App.css';
import TopBar from './components/TopBar';
import About from './pages/About/About';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <TopBar />
      <main>
        <Routes>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

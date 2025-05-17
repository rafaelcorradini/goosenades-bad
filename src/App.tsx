import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GameMapList from '@/screens/GameMapList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GameMapList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

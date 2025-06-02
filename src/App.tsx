import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NadeList from '@/screens/NadeList/NadeList.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NadeList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
